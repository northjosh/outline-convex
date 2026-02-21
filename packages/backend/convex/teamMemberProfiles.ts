import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAuth, requireTeamMember } from "./lib/auth";

// Team member reads their own profile
export const getMyTeamProfile = query({
  args: {},
  handler: async (ctx) => {
    const { authUser } = await requireTeamMember(ctx);

    const teamProfile = await ctx.db
      .query("teamMemberProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique();

    return teamProfile;
  },
});

// Team member updates their own profile
export const updateMyTeamProfile = mutation({
  args: {
    bio: v.optional(v.string()),
    headline: v.optional(v.string()),
    qualifications: v.optional(
      v.array(
        v.object({
          title: v.string(),
          institution: v.string(),
          year: v.optional(v.string()),
        }),
      ),
    ),
    subjects: v.optional(v.array(v.string())),
    educationLevels: v.optional(v.array(v.string())),
    isRemote: v.optional(v.boolean()),
    isInPerson: v.optional(v.boolean()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireTeamMember(ctx);

    const teamProfile = await ctx.db
      .query("teamMemberProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique();

    if (!teamProfile) {
      throw new Error("Team member profile not found");
    }

    if (args.subjects && args.subjects.length === 0) {
      throw new Error("subjects must contain at least one entry");
    }
    if (args.educationLevels && args.educationLevels.length === 0) {
      throw new Error("educationLevels must contain at least one entry");
    }

    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(teamProfile._id, patch);

    return teamProfile._id;
  },
});

// Any logged-in user can view a team member's public profile
export const getTeamMemberPublicProfile = query({
  args: {
    teamMemberProfileId: v.id("teamMemberProfiles"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const teamProfile = await ctx.db.get(args.teamMemberProfileId);
    if (!teamProfile) {
      return null;
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", teamProfile.userId))
      .unique();

    if (!profile || !profile.isActive) {
      return null;
    }

    return {
      _id: teamProfile._id,
      bio: teamProfile.bio,
      headline: teamProfile.headline,
      qualifications: teamProfile.qualifications,
      subjects: teamProfile.subjects,
      educationLevels: teamProfile.educationLevels,
      isRemote: teamProfile.isRemote,
      isInPerson: teamProfile.isInPerson,
      location: teamProfile.location,
      avgRating: teamProfile.avgRating,
      totalReviews: teamProfile.totalReviews,
      totalSessions: teamProfile.totalSessions,
      fullName: profile.fullName,
      avatarUrl: profile.avatarUrl,
      city: profile.city,
    };
  },
});
