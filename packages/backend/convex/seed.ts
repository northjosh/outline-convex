import { internalMutation } from "./_generated/server";

/**
 * Seeds the database with sample educators and ~10 services
 * for development/testing. Run via:
 *   cd packages/backend && npx convex run seed:seedServices
 *
 * Self-contained: creates its own educator profiles and uses a
 * placeholder admin userId if no admin profile exists yet.
 */
export const seedServices = internalMutation({
  args: {},
  handler: async (ctx) => {
    // ── Guard: prevent double-seeding ──────────────────────────────────
    const existingServices = await ctx.db.query("services").first();
    if (existingServices) {
      throw new Error("Services already exist. Clear the table first or skip seeding.");
    }

    // ── Find admin or use placeholder ─────────────────────────────────
    const admin = await ctx.db
      .query("profiles")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .first();

    const creatorUserId = admin?.userId ?? "seed_admin_placeholder";

    const now = Date.now();

    // ── Create educator profiles ──────────────────────────────────────
    const educators = [
      {
        fullName: "Kwame Mensah",
        email: "kwame.mensah@outline.edu",
        bio: "Experienced mathematics educator with 8 years of teaching WASSCE and Cambridge students. Passionate about making complex concepts accessible.",
        headline: "Mathematics & Physics Tutor",
        subjects: ["Mathematics", "Elective Mathematics", "Physics"],
        educationLevels: ["WASSCE", "Cambridge IGCSE", "Cambridge AS Level"],
        location: "Accra",
        avgRating: 4.8,
        totalReviews: 42,
        totalSessions: 156,
      },
      {
        fullName: "Ama Darko",
        email: "ama.darko@outline.edu",
        bio: "Cambridge-trained science teacher specializing in Biology and Chemistry. I help students develop strong foundations for university entrance.",
        headline: "Science Specialist — Biology & Chemistry",
        subjects: ["Biology", "Chemistry", "Integrated Science"],
        educationLevels: ["Cambridge IGCSE", "Cambridge AS Level", "Cambridge A Level"],
        location: "Kumasi",
        avgRating: 4.9,
        totalReviews: 38,
        totalSessions: 124,
      },
      {
        fullName: "Kofi Asante",
        email: "kofi.asante@outline.edu",
        bio: "Business and economics educator with real-world corporate experience. I bridge the gap between textbook theory and practical applications.",
        headline: "Business & Economics Educator",
        subjects: ["Economics", "Accounting", "Business Management"],
        educationLevels: ["WASSCE", "Cambridge A Level"],
        location: "Accra",
        avgRating: 4.6,
        totalReviews: 21,
        totalSessions: 78,
      },
      {
        fullName: "Efua Owusu",
        email: "efua.owusu@outline.edu",
        bio: "English language and literature expert. I focus on essay writing, comprehension, and critical analysis skills essential for exam success.",
        headline: "English Language & Literature Tutor",
        subjects: ["English Language", "Literature in English", "French"],
        educationLevels: ["WASSCE", "Cambridge IGCSE"],
        location: "Takoradi",
        avgRating: 4.7,
        totalReviews: 29,
        totalSessions: 95,
      },
    ];

    const teamMemberIds = [];

    for (const edu of educators) {
      // Create base profile
      const profileId = await ctx.db.insert("profiles", {
        userId: `seed_user_${edu.email}`,
        role: "team_member",
        fullName: edu.fullName,
        email: edu.email,
        city: edu.location,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });

      // Create team member profile
      const teamMemberId = await ctx.db.insert("teamMemberProfiles", {
        userId: `seed_user_${edu.email}`,
        bio: edu.bio,
        headline: edu.headline,
        subjects: edu.subjects,
        educationLevels: edu.educationLevels,
        isRemote: true,
        isInPerson: true,
        location: edu.location,
        avgRating: edu.avgRating,
        totalReviews: edu.totalReviews,
        totalSessions: edu.totalSessions,
        canCreateServices: true,
      });

      teamMemberIds.push(teamMemberId);
    }

    // ── Create services ───────────────────────────────────────────────
    const services = [
      // ─ Platform live sessions (admin-created, providers assigned) ──
      {
        ownerType: "platform" as const,
        title: "WASSCE Mathematics Intensive Prep",
        description:
          "Comprehensive preparation for WASSCE Core and Elective Mathematics. Covers algebra, calculus, statistics, and geometry with past question practice and exam strategies.",
        serviceCategory: "live_session" as const,
        subject: "Mathematics",
        educationLevel: "WASSCE",
        sessionType: "one_on_one" as const,
        durationMinutes: 90,
        price: 80,
        priceUnit: "per_session" as const,
        providerIndices: [0], // Kwame
      },
      {
        ownerType: "platform" as const,
        title: "Cambridge IGCSE Biology Masterclass",
        description:
          "In-depth study of the Cambridge IGCSE Biology syllabus. Focus on cell biology, genetics, ecology, and human physiology with practical experiment guidance.",
        serviceCategory: "live_session" as const,
        subject: "Biology",
        educationLevel: "Cambridge IGCSE",
        sessionType: "group" as const,
        durationMinutes: 120,
        maxGroupSize: 6,
        price: 50,
        priceUnit: "per_session" as const,
        providerIndices: [1], // Ama
      },
      {
        ownerType: "platform" as const,
        title: "A Level Economics Seminar",
        description:
          "Weekly group seminar covering microeconomics, macroeconomics, and development economics. Includes essay writing practice and data response technique.",
        serviceCategory: "live_session" as const,
        subject: "Economics",
        educationLevel: "Cambridge A Level",
        sessionType: "group" as const,
        durationMinutes: 90,
        maxGroupSize: 10,
        price: 40,
        priceUnit: "per_session" as const,
        providerIndices: [2], // Kofi
      },
      {
        ownerType: "platform" as const,
        title: "Physics Problem-Solving Workshop",
        description:
          "Hands-on workshop focusing on solving complex physics problems. Covers mechanics, waves, electricity, and modern physics with step-by-step worked solutions.",
        serviceCategory: "live_session" as const,
        subject: "Physics",
        educationLevel: "Cambridge AS Level",
        sessionType: "one_on_one" as const,
        durationMinutes: 60,
        price: 100,
        priceUnit: "per_hour" as const,
        providerIndices: [0], // Kwame
      },

      // ─ Custom live session (team member-created) ──────────────────
      {
        ownerType: "custom" as const,
        teamMemberIndex: 3, // Efua
        title: "English Essay Writing Clinic",
        description:
          "One-on-one sessions to improve your essay writing skills. Learn how to structure arguments, use evidence effectively, and write under exam conditions.",
        serviceCategory: "live_session" as const,
        subject: "English Language",
        educationLevel: "WASSCE",
        sessionType: "one_on_one" as const,
        durationMinutes: 60,
        price: 70,
        priceUnit: "per_hour" as const,
      },
      {
        ownerType: "custom" as const,
        teamMemberIndex: 1, // Ama
        title: "Chemistry Lab Prep Sessions",
        description:
          "Practical chemistry preparation covering laboratory techniques, safety protocols, and alternative-to-practical paper strategies for Cambridge exams.",
        serviceCategory: "live_session" as const,
        subject: "Chemistry",
        educationLevel: "Cambridge A Level",
        sessionType: "one_on_one" as const,
        durationMinutes: 90,
        price: 120,
        priceUnit: "per_session" as const,
      },

      // ─ Digital products ───────────────────────────────────────────
      {
        ownerType: "platform" as const,
        title: "WASSCE Past Questions Pack — Mathematics (2015-2024)",
        description:
          "Complete collection of WASSCE Mathematics past questions with detailed marking schemes and worked solutions. Includes both Core and Elective papers.",
        serviceCategory: "digital_product" as const,
        subject: "Mathematics",
        educationLevel: "WASSCE",
        price: 35,
        priceUnit: "flat" as const,
        providerIndices: [0], // Kwame
      },
      {
        ownerType: "custom" as const,
        teamMemberIndex: 3, // Efua
        title: "Literature Study Guide — Concord & Discord",
        description:
          "Comprehensive study notes covering all prescribed texts for WASSCE Literature in English. Includes character analysis, themes, and sample essay answers.",
        serviceCategory: "digital_product" as const,
        subject: "Literature in English",
        educationLevel: "WASSCE",
        price: 25,
        priceUnit: "flat" as const,
      },

      // ─ Custom requests ────────────────────────────────────────────
      {
        ownerType: "platform" as const,
        title: "Personalized Study Plan",
        description:
          "Get a tailored study plan designed around your strengths, weaknesses, and exam timeline. Includes weekly milestones and recommended resources.",
        serviceCategory: "custom_request" as const,
        subject: "Integrated Science",
        educationLevel: "WASSCE",
        price: 50,
        priceUnit: "flat" as const,
        providerIndices: [0, 1], // Kwame + Ama
      },
      {
        ownerType: "custom" as const,
        teamMemberIndex: 2, // Kofi
        title: "University Application Mentoring",
        description:
          "Guidance on university applications, personal statements, and interview preparation. Focused on business and economics programmes in Ghana and abroad.",
        serviceCategory: "custom_request" as const,
        subject: "Business Management",
        educationLevel: "Cambridge A Level",
        price: 150,
        priceUnit: "flat" as const,
      },
    ];

    const createdServiceIds = [];

    for (const svc of services) {
      const serviceId = await ctx.db.insert("services", {
        ownerType: svc.ownerType,
        teamMemberId:
          svc.ownerType === "custom" && "teamMemberIndex" in svc
            ? teamMemberIds[svc.teamMemberIndex]
            : undefined,
        createdByUserId: creatorUserId,
        title: svc.title,
        description: svc.description,
        serviceCategory: svc.serviceCategory,
        subject: svc.subject,
        educationLevel: svc.educationLevel,
        sessionType:
          svc.serviceCategory === "live_session" && "sessionType" in svc
            ? svc.sessionType
            : undefined,
        durationMinutes:
          svc.serviceCategory === "live_session" && "durationMinutes" in svc
            ? svc.durationMinutes
            : undefined,
        maxGroupSize:
          svc.serviceCategory === "live_session" &&
          "sessionType" in svc &&
          svc.sessionType === "group" &&
          "maxGroupSize" in svc
            ? svc.maxGroupSize
            : undefined,
        price: svc.price,
        priceUnit: svc.priceUnit,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });

      // Assign providers for platform services
      if (svc.ownerType === "platform" && "providerIndices" in svc) {
        for (const idx of svc.providerIndices) {
          await ctx.db.insert("serviceProviders", {
            serviceId,
            teamMemberId: teamMemberIds[idx],
            assignedByUserId: creatorUserId,
            assignedAt: now,
          });
        }
      }

      createdServiceIds.push(serviceId);
    }

    return {
      success: true,
      educatorsCreated: teamMemberIds.length,
      servicesCreated: createdServiceIds.length,
    };
  },
});
