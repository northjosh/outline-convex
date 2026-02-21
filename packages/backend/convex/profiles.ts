import { query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCurrentProfile = query({
	args: {},
	handler: async (ctx) => {
		const authUser = await authComponent.safeGetAuthUser(ctx);
		if (!authUser) {
			return null;
		}

		const profile = await ctx.db
			.query("profiles")
			.withIndex("by_userId", (q) => q.eq("userId", authUser._id))
			.unique();

		return profile;
	},
});
