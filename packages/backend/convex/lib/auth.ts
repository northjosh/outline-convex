import type { MutationCtx, QueryCtx } from "../_generated/server";
import { authComponent } from "../auth";

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
	const authUser = await authComponent.getAuthUser(ctx);
	const profile = await ctx.db
		.query("profiles")
		.withIndex("by_userId", (q) => q.eq("userId", authUser._id))
		.unique();

	if (!profile) {
		throw new Error("Profile not found");
	}

	return { authUser, profile };
}

export async function requireRole(
	ctx: QueryCtx | MutationCtx,
	roles: Array<"learner" | "team_member" | "admin">,
) {
	const { authUser, profile } = await requireAuth(ctx);

	if (!roles.includes(profile.role)) {
		throw new Error(`Access denied. Required role: ${roles.join(" or ")}`);
	}

	return { authUser, profile };
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
	return requireRole(ctx, ["admin"]);
}

export async function requireTeamMember(ctx: QueryCtx | MutationCtx) {
	return requireRole(ctx, ["team_member"]);
}
