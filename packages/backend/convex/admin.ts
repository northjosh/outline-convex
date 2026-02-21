import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const seedAdmin = internalMutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Guard: don't allow multiple admins from the seed script
    const existingAdmin = await ctx.db
      .query("profiles")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .first();

    if (existingAdmin) {
      throw new Error(`An admin already exists (${existingAdmin.email}). Cannot seed another.`);
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!profile) {
      throw new Error(
        `No profile found for email: ${args.email}. Sign up first, then run this script.`,
      );
    }

    if (profile.role !== "learner") {
      throw new Error(`Profile for ${args.email} already has role: ${profile.role}`);
    }

    await ctx.db.patch(profile._id, {
      role: "admin",
      updatedAt: Date.now(),
    });

    return { success: true, email: args.email };
  },
});
