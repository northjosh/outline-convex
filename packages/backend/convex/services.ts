import { v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import { requireAdmin, requireTeamMember } from "./lib/auth";

// ─── Shared Validators ──────────────────────────────────────────────

const serviceCategoryValidator = v.union(
  v.literal("live_session"),
  v.literal("digital_product"),
  v.literal("custom_request"),
);

const sessionTypeValidator = v.optional(v.union(v.literal("one_on_one"), v.literal("group")));

const priceUnitValidator = v.union(
  v.literal("per_hour"),
  v.literal("per_session"),
  v.literal("flat"),
);

// ─── Shared Helpers ─────────────────────────────────────────────────

async function getTeamMemberProfile(ctx: MutationCtx | QueryCtx, userId: string) {
  const teamProfile = await ctx.db
    .query("teamMemberProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .unique();
  if (!teamProfile) {
    throw new Error("Team member profile not found");
  }
  return teamProfile;
}

function validateServiceFields(args: {
  serviceCategory: "live_session" | "digital_product" | "custom_request";
  sessionType?: "one_on_one" | "group";
  durationMinutes?: number;
  maxGroupSize?: number;
  price: number;
  title: string;
}) {
  if (args.title.trim().length === 0) {
    throw new Error("Title cannot be empty");
  }
  if (args.title.trim().length > 200) {
    throw new Error("Title must be 200 characters or less");
  }
  if (args.price < 0) {
    throw new Error("Price must be non-negative");
  }

  if (args.serviceCategory === "live_session") {
    if (!args.sessionType) {
      throw new Error("sessionType is required for live_session services");
    }
    if (!args.durationMinutes || args.durationMinutes <= 0) {
      throw new Error("durationMinutes must be positive for live_session services");
    }
    if (args.durationMinutes > 480) {
      throw new Error("durationMinutes cannot exceed 480 (8 hours)");
    }
    if (args.sessionType === "group" && args.maxGroupSize !== undefined && args.maxGroupSize < 2) {
      throw new Error("maxGroupSize must be at least 2 for group sessions");
    }
  }
}

// ─── Admin Mutations ────────────────────────────────────────────────

export const admin_createService = mutation({
  args: {
    ownerType: v.union(v.literal("platform"), v.literal("custom")),
    teamMemberId: v.optional(v.id("teamMemberProfiles")),
    title: v.string(),
    description: v.optional(v.string()),
    serviceCategory: serviceCategoryValidator,
    subject: v.string(),
    educationLevel: v.string(),
    sessionType: sessionTypeValidator,
    durationMinutes: v.optional(v.number()),
    maxGroupSize: v.optional(v.number()),
    price: v.number(),
    priceUnit: priceUnitValidator,
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireAdmin(ctx);

    if (args.ownerType === "custom") {
      if (!args.teamMemberId) {
        throw new Error("teamMemberId is required for custom services");
      }
      const teamMember = await ctx.db.get(args.teamMemberId);
      if (!teamMember) {
        throw new Error("Team member not found");
      }
    }

    if (args.ownerType === "platform" && args.teamMemberId) {
      throw new Error(
        "Platform services should not have a teamMemberId. Use admin_assignProvider instead.",
      );
    }

    validateServiceFields(args);

    const now = Date.now();
    const serviceId = await ctx.db.insert("services", {
      ownerType: args.ownerType,
      teamMemberId: args.ownerType === "custom" ? args.teamMemberId : undefined,
      createdByUserId: authUser._id,
      title: args.title.trim(),
      description: args.description,
      serviceCategory: args.serviceCategory,
      subject: args.subject,
      educationLevel: args.educationLevel,
      sessionType: args.serviceCategory === "live_session" ? args.sessionType : undefined,
      durationMinutes: args.serviceCategory === "live_session" ? args.durationMinutes : undefined,
      maxGroupSize:
        args.serviceCategory === "live_session" && args.sessionType === "group"
          ? args.maxGroupSize
          : undefined,
      price: args.price,
      priceUnit: args.priceUnit,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return serviceId;
  },
});

export const admin_updateService = mutation({
  args: {
    serviceId: v.id("services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    serviceCategory: v.optional(serviceCategoryValidator),
    subject: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
    sessionType: sessionTypeValidator,
    durationMinutes: v.optional(v.number()),
    maxGroupSize: v.optional(v.number()),
    price: v.optional(v.number()),
    priceUnit: v.optional(priceUnitValidator),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    const merged = {
      title: args.title ?? service.title,
      price: args.price ?? service.price,
      serviceCategory: args.serviceCategory ?? service.serviceCategory,
      sessionType: args.sessionType !== undefined ? args.sessionType : service.sessionType,
      durationMinutes:
        args.durationMinutes !== undefined ? args.durationMinutes : service.durationMinutes,
      maxGroupSize: args.maxGroupSize !== undefined ? args.maxGroupSize : service.maxGroupSize,
    };

    validateServiceFields(merged);

    const { serviceId: _serviceId, ...updateFields } = args;
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(args.serviceId, patch);
    return args.serviceId;
  },
});

export const admin_deactivateService = mutation({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    await ctx.db.patch(args.serviceId, {
      isActive: false,
      updatedAt: Date.now(),
    });

    return args.serviceId;
  },
});

// ─── Admin Provider Assignment ──────────────────────────────────────

export const admin_assignProvider = mutation({
  args: {
    serviceId: v.id("services"),
    teamMemberId: v.id("teamMemberProfiles"),
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireAdmin(ctx);

    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }
    if (service.ownerType !== "platform") {
      throw new Error("Can only assign providers to platform services");
    }

    const teamMember = await ctx.db.get(args.teamMemberId);
    if (!teamMember) {
      throw new Error("Team member not found");
    }

    const existing = await ctx.db
      .query("serviceProviders")
      .withIndex("by_serviceId_teamMemberId", (q) =>
        q.eq("serviceId", args.serviceId).eq("teamMemberId", args.teamMemberId),
      )
      .unique();

    if (existing) {
      throw new Error("Team member is already assigned to this service");
    }

    const providerId = await ctx.db.insert("serviceProviders", {
      serviceId: args.serviceId,
      teamMemberId: args.teamMemberId,
      assignedByUserId: authUser._id,
      assignedAt: Date.now(),
    });

    return providerId;
  },
});

export const admin_removeProvider = mutation({
  args: {
    serviceId: v.id("services"),
    teamMemberId: v.id("teamMemberProfiles"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const assignment = await ctx.db
      .query("serviceProviders")
      .withIndex("by_serviceId_teamMemberId", (q) =>
        q.eq("serviceId", args.serviceId).eq("teamMemberId", args.teamMemberId),
      )
      .unique();

    if (!assignment) {
      throw new Error("Provider assignment not found");
    }

    await ctx.db.delete(assignment._id);
    return assignment._id;
  },
});

export const admin_toggleCanCreateServices = mutation({
  args: {
    teamMemberId: v.id("teamMemberProfiles"),
    canCreateServices: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const teamMember = await ctx.db.get(args.teamMemberId);
    if (!teamMember) {
      throw new Error("Team member not found");
    }

    await ctx.db.patch(args.teamMemberId, {
      canCreateServices: args.canCreateServices,
    });

    return args.teamMemberId;
  },
});

// ─── Team Member Mutations ──────────────────────────────────────────

export const createCustomService = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    serviceCategory: serviceCategoryValidator,
    subject: v.string(),
    educationLevel: v.string(),
    sessionType: sessionTypeValidator,
    durationMinutes: v.optional(v.number()),
    maxGroupSize: v.optional(v.number()),
    price: v.number(),
    priceUnit: priceUnitValidator,
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireTeamMember(ctx);
    const teamProfile = await getTeamMemberProfile(ctx, authUser._id);

    if (!teamProfile.canCreateServices) {
      throw new Error("You are not authorized to create custom services. Contact an admin.");
    }

    validateServiceFields(args);

    const now = Date.now();
    const serviceId = await ctx.db.insert("services", {
      ownerType: "custom",
      teamMemberId: teamProfile._id,
      createdByUserId: authUser._id,
      title: args.title.trim(),
      description: args.description,
      serviceCategory: args.serviceCategory,
      subject: args.subject,
      educationLevel: args.educationLevel,
      sessionType: args.serviceCategory === "live_session" ? args.sessionType : undefined,
      durationMinutes: args.serviceCategory === "live_session" ? args.durationMinutes : undefined,
      maxGroupSize:
        args.serviceCategory === "live_session" && args.sessionType === "group"
          ? args.maxGroupSize
          : undefined,
      price: args.price,
      priceUnit: args.priceUnit,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return serviceId;
  },
});

export const updateMyService = mutation({
  args: {
    serviceId: v.id("services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    subject: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
    sessionType: sessionTypeValidator,
    durationMinutes: v.optional(v.number()),
    maxGroupSize: v.optional(v.number()),
    price: v.optional(v.number()),
    priceUnit: v.optional(priceUnitValidator),
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireTeamMember(ctx);
    const teamProfile = await getTeamMemberProfile(ctx, authUser._id);

    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    if (service.ownerType !== "custom" || service.teamMemberId !== teamProfile._id) {
      throw new Error("You can only update your own custom services");
    }

    const merged = {
      title: args.title ?? service.title,
      price: args.price ?? service.price,
      serviceCategory: service.serviceCategory,
      sessionType: args.sessionType !== undefined ? args.sessionType : service.sessionType,
      durationMinutes:
        args.durationMinutes !== undefined ? args.durationMinutes : service.durationMinutes,
      maxGroupSize: args.maxGroupSize !== undefined ? args.maxGroupSize : service.maxGroupSize,
    };

    validateServiceFields(merged);

    const { serviceId: _serviceId, ...updateFields } = args;
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(args.serviceId, patch);
    return args.serviceId;
  },
});

export const deactivateMyService = mutation({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireTeamMember(ctx);
    const teamProfile = await getTeamMemberProfile(ctx, authUser._id);

    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    if (service.ownerType !== "custom" || service.teamMemberId !== teamProfile._id) {
      throw new Error("You can only deactivate your own custom services");
    }

    await ctx.db.patch(args.serviceId, {
      isActive: false,
      updatedAt: Date.now(),
    });

    return args.serviceId;
  },
});

// ─── Queries ────────────────────────────────────────────────────────

export const getService = query({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.serviceId);
    if (!service || !service.isActive) {
      return null;
    }

    // For custom services, include the team member's public info
    let teamMemberInfo = null;
    if (service.teamMemberId) {
      const teamProfile = await ctx.db.get(service.teamMemberId);
      if (teamProfile) {
        const profile = await ctx.db
          .query("profiles")
          .withIndex("by_userId", (q) => q.eq("userId", teamProfile.userId))
          .unique();
        if (profile) {
          teamMemberInfo = {
            _id: teamProfile._id,
            fullName: profile.fullName,
            avatarUrl: profile.avatarUrl,
            avgRating: teamProfile.avgRating,
          };
        }
      }
    }

    // For platform services, count available providers
    let providerCount = 0;
    if (service.ownerType === "platform") {
      const providers = await ctx.db
        .query("serviceProviders")
        .withIndex("by_serviceId", (q) => q.eq("serviceId", args.serviceId))
        .collect();
      providerCount = providers.length;
    }

    return {
      ...service,
      teamMemberInfo,
      providerCount,
    };
  },
});

export const listMyServices = query({
  args: {},
  handler: async (ctx) => {
    const { authUser } = await requireTeamMember(ctx);
    const teamProfile = await getTeamMemberProfile(ctx, authUser._id);

    // Custom services owned by this team member
    const customServices = await ctx.db
      .query("services")
      .withIndex("by_teamMemberId", (q) => q.eq("teamMemberId", teamProfile._id))
      .collect();

    // Platform services assigned to this team member
    const assignments = await ctx.db
      .query("serviceProviders")
      .withIndex("by_teamMemberId", (q) => q.eq("teamMemberId", teamProfile._id))
      .collect();

    const assignedServices = await Promise.all(
      assignments.map(async (a) => {
        const service = await ctx.db.get(a.serviceId);
        return service;
      }),
    );

    return {
      customServices,
      assignedPlatformServices: assignedServices.filter(
        (s): s is NonNullable<typeof s> => s !== null,
      ),
    };
  },
});

export const listActiveServices = query({
  args: {
    subject: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
    serviceCategory: v.optional(serviceCategoryValidator),
  },
  handler: async (ctx, args) => {
    let servicesQuery;

    // Pick the best index based on which filter is provided
    if (args.subject) {
      servicesQuery = ctx.db
        .query("services")
        .withIndex("by_subject", (q) => q.eq("subject", args.subject!));
    } else if (args.educationLevel) {
      servicesQuery = ctx.db
        .query("services")
        .withIndex("by_educationLevel", (q) => q.eq("educationLevel", args.educationLevel!));
    } else {
      servicesQuery = ctx.db
        .query("services")
        .withIndex("by_isActive", (q) => q.eq("isActive", true));
    }

    let services = await servicesQuery.collect();

    // Apply remaining filters in-memory
    services = services.filter((s) => s.isActive);

    if (args.subject && args.educationLevel) {
      services = services.filter((s) => s.educationLevel === args.educationLevel);
    }

    if (args.serviceCategory) {
      services = services.filter((s) => s.serviceCategory === args.serviceCategory);
    }

    // Enrich with team member info and provider count
    const enriched = await Promise.all(
      services.map(async (service) => {
        let teamMemberInfo = null;
        if (service.teamMemberId) {
          const teamProfile = await ctx.db.get(service.teamMemberId);
          if (teamProfile) {
            const profile = await ctx.db
              .query("profiles")
              .withIndex("by_userId", (q) => q.eq("userId", teamProfile.userId))
              .unique();
            if (profile) {
              teamMemberInfo = {
                _id: teamProfile._id,
                fullName: profile.fullName,
                avatarUrl: profile.avatarUrl,
                avgRating: teamProfile.avgRating,
              };
            }
          }
        }

        let providerCount = 0;
        if (service.ownerType === "platform") {
          const providers = await ctx.db
            .query("serviceProviders")
            .withIndex("by_serviceId", (q) => q.eq("serviceId", service._id))
            .collect();
          providerCount = providers.length;
        }

        return { ...service, teamMemberInfo, providerCount };
      }),
    );

    return enriched;
  },
});

export const listAllServices = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    return await ctx.db.query("services").order("desc").collect();
  },
});

export const listServiceProviders = query({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      return [];
    }

    // Custom service — return the single owner
    if (service.ownerType !== "platform") {
      if (service.teamMemberId) {
        const teamProfile = await ctx.db.get(service.teamMemberId);
        if (!teamProfile) return [];
        const profile = await ctx.db
          .query("profiles")
          .withIndex("by_userId", (q) => q.eq("userId", teamProfile.userId))
          .unique();
        return [
          {
            teamMemberProfileId: teamProfile._id,
            fullName: profile?.fullName ?? "",
            avatarUrl: profile?.avatarUrl,
            avgRating: teamProfile.avgRating,
            totalSessions: teamProfile.totalSessions,
            assignedAt: null,
          },
        ];
      }
      return [];
    }

    // Platform service — return all assigned providers
    const assignments = await ctx.db
      .query("serviceProviders")
      .withIndex("by_serviceId", (q) => q.eq("serviceId", args.serviceId))
      .collect();

    const providers = await Promise.all(
      assignments.map(async (a) => {
        const teamProfile = await ctx.db.get(a.teamMemberId);
        if (!teamProfile) return null;
        const profile = await ctx.db
          .query("profiles")
          .withIndex("by_userId", (q) => q.eq("userId", teamProfile.userId))
          .unique();
        return {
          teamMemberProfileId: teamProfile._id,
          fullName: profile?.fullName ?? "",
          avatarUrl: profile?.avatarUrl,
          avgRating: teamProfile.avgRating,
          totalSessions: teamProfile.totalSessions,
          assignedAt: a.assignedAt,
        };
      }),
    );

    return providers.filter((p): p is NonNullable<typeof p> => p !== null);
  },
});
