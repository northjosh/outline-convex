import { api } from "@outline-convex/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export function useCurrentProfile() {
	const profile = useQuery(api.profiles.getCurrentProfile);
	return {
		profile,
		isLoading: profile === undefined,
		isAuthenticated: profile !== null && profile !== undefined,
		role: profile?.role ?? null,
		isAdmin: profile?.role === "admin",
		isTeamMember: profile?.role === "team_member",
		isLearner: profile?.role === "learner",
	};
}
