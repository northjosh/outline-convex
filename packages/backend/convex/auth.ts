import { type AuthFunctions, createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";

import type { DataModel } from "./_generated/dataModel";
import { components, internal } from "./_generated/api";
import { query } from "./_generated/server";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;

const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(components.betterAuth, {
	authFunctions,
	triggers: {
		user: {
			onCreate: async (ctx, authUser) => {
				// Check if there's a pending invite for this email
				const invite = await ctx.db
					.query("invites")
					.withIndex("by_email", (q) => q.eq("email", authUser.email))
					.filter((q) => q.eq(q.field("status"), "pending"))
					.first();

				let role: "learner" | "team_member" = "learner";

				if (invite && invite.expiresAt > Date.now()) {
					role = "team_member";
					await ctx.db.patch(invite._id, { status: "used" as const });
				}

				const now = Date.now();

				await ctx.db.insert("profiles", {
					userId: authUser._id,
					role,
					fullName: authUser.name || "",
					email: authUser.email,
					isActive: true,
					createdAt: now,
					updatedAt: now,
				});

				if (role === "team_member") {
					await ctx.db.insert("teamMemberProfiles", {
						userId: authUser._id,
						subjects: [],
						educationLevels: [],
						isRemote: true,
						isInPerson: false,
						avgRating: 0,
						totalReviews: 0,
						totalSessions: 0,
					});
				}
			},
			onDelete: async (ctx, authUser) => {
				const profile = await ctx.db
					.query("profiles")
					.withIndex("by_userId", (q) => q.eq("userId", authUser._id))
					.unique();
				if (profile) {
					await ctx.db.delete(profile._id);
				}
			},
		},
	},
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

function createAuth(ctx: GenericCtx<DataModel>) {
	return betterAuth({
		trustedOrigins: [siteUrl],
		database: authComponent.adapter(ctx),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
		plugins: [
			crossDomain({ siteUrl }),
			convex({
				authConfig,
				jwksRotateOnTokenGenerationError: true,
			}),
		],
	});
}

export { createAuth };

export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		return await authComponent.safeGetAuthUser(ctx);
	},
});
