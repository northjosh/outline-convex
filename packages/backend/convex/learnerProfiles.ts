import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { requireRole } from "./lib/auth";

export const getLearnerProfile = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) return null;

    return ctx.db
      .query("learnerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique();
  },
});

export const completeOnboarding = mutation({
  args: {
    isMinor: v.boolean(),
    guardianName: v.optional(v.string()),
    guardianPhone: v.optional(v.string()),
    educationLevel: v.union(v.literal("wassce"), v.literal("igcse"), v.literal("alevel")),
    subjects: v.array(v.string()),
    examDate: v.union(v.literal("jun2026"), v.literal("nov2026"), v.literal("exploring")),
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireRole(ctx, ["learner"]);

    // Idempotent — don't create duplicate profiles
    const existing = await ctx.db
      .query("learnerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique();

    if (existing) return existing._id;

    return ctx.db.insert("learnerProfiles", {
      userId: authUser._id,
      isMinor: args.isMinor,
      guardianName: args.guardianName,
      guardianPhone: args.guardianPhone,
      educationLevel: args.educationLevel,
      subjects: args.subjects,
      examDate: args.examDate,
      onboardingCompletedAt: Date.now(),
    });
  },
});
