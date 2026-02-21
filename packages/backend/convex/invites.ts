import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// Admin creates an invite for a team member
export const createInvite = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const { profile } = await requireAdmin(ctx);

    // Check if email already has an account
    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingProfile) {
      throw new Error("A user with this email already exists");
    }

    // Check for existing pending invite
    const existingInvite = await ctx.db
      .query("invites")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .first();

    if (existingInvite) {
      throw new Error("A pending invite already exists for this email");
    }

    const token = crypto.randomUUID();
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    const inviteId = await ctx.db.insert("invites", {
      email: args.email,
      token,
      status: "pending",
      invitedBy: profile.userId,
      expiresAt: now + sevenDays,
      createdAt: now,
    });

    return { inviteId, token };
  },
});

// Validate an invite token (used by the signup page)
export const getInviteByToken = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const invite = await ctx.db
      .query("invites")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!invite) {
      return null;
    }

    if (invite.status !== "pending") {
      return { ...invite, valid: false, reason: "Invite already used" };
    }

    if (invite.expiresAt < Date.now()) {
      return { ...invite, valid: false, reason: "Invite has expired" };
    }

    return { ...invite, valid: true };
  },
});

// Admin lists all invites
export const listInvites = query({
  args: {},
  handler: async (ctx) => {
    try {
      await requireAdmin(ctx);
    } catch {
      return [];
    }

    return await ctx.db.query("invites").order("desc").collect();
  },
});
