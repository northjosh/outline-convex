import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    role: v.union(v.literal("learner"), v.literal("team_member"), v.literal("admin")),
    fullName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    city: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  teamMemberProfiles: defineTable({
    userId: v.string(),
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
    subjects: v.array(v.string()),
    educationLevels: v.array(v.string()),
    isRemote: v.boolean(),
    isInPerson: v.boolean(),
    location: v.optional(v.string()),
    avgRating: v.number(),
    totalReviews: v.number(),
    totalSessions: v.number(),
    canCreateServices: v.optional(v.boolean()),
  }).index("by_userId", ["userId"]),

  learnerProfiles: defineTable({
    userId: v.string(),
    isMinor: v.boolean(),
    guardianName: v.optional(v.string()),
    guardianPhone: v.optional(v.string()),
    educationLevel: v.union(v.literal("wassce"), v.literal("igcse"), v.literal("alevel")),
    subjects: v.array(v.string()),
    examDate: v.union(v.literal("jun2026"), v.literal("nov2026"), v.literal("exploring")),
    onboardingCompletedAt: v.number(),
  }).index("by_userId", ["userId"]),

  invites: defineTable({
    email: v.string(),
    token: v.string(),
    status: v.union(v.literal("pending"), v.literal("used"), v.literal("expired")),
    invitedBy: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_email", ["email"]),

  services: defineTable({
    // Ownership
    ownerType: v.union(v.literal("platform"), v.literal("custom")),
    teamMemberId: v.optional(v.id("teamMemberProfiles")),
    createdByUserId: v.string(),

    // Core
    title: v.string(),
    description: v.optional(v.string()),
    serviceCategory: v.union(
      v.literal("live_session"),
      v.literal("digital_product"),
      v.literal("custom_request"),
    ),
    subject: v.string(),
    educationLevel: v.string(),

    // Session fields (optional — only relevant for live_session)
    sessionType: v.optional(v.union(v.literal("one_on_one"), v.literal("group"))),
    durationMinutes: v.optional(v.number()),
    maxGroupSize: v.optional(v.number()),

    // Pricing
    price: v.number(),
    priceUnit: v.union(v.literal("per_hour"), v.literal("per_session"), v.literal("flat")),

    // Status
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_subject", ["subject"])
    .index("by_educationLevel", ["educationLevel"])
    .index("by_ownerType", ["ownerType"])
    .index("by_teamMemberId", ["teamMemberId"])
    .index("by_isActive", ["isActive"]),

  serviceProviders: defineTable({
    serviceId: v.id("services"),
    teamMemberId: v.id("teamMemberProfiles"),
    assignedByUserId: v.string(),
    assignedAt: v.number(),
  })
    .index("by_serviceId", ["serviceId"])
    .index("by_teamMemberId", ["teamMemberId"])
    .index("by_serviceId_teamMemberId", ["serviceId", "teamMemberId"]),

  availabilitySlots: defineTable({
    teamMemberId: v.id("teamMemberProfiles"),
    dayOfWeek: v.optional(v.number()),
    startTime: v.string(),
    endTime: v.string(),
    specificDate: v.optional(v.string()),
    isBlocked: v.boolean(),
  }).index("by_teamMemberId", ["teamMemberId"]),

  bookings: defineTable({
    learnerId: v.id("profiles"),
    teamMemberId: v.id("teamMemberProfiles"),
    serviceId: v.id("services"),
    scheduledDate: v.string(),
    scheduledStart: v.number(),
    scheduledEnd: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    amount: v.number(),
    sessionType: v.union(v.literal("online"), v.literal("in_person")),
    meetingLink: v.optional(v.string()),
    cancellationReason: v.optional(v.string()),
    cancelledBy: v.optional(v.id("profiles")),
    notes: v.optional(v.string()),
  })
    .index("by_learnerId", ["learnerId"])
    .index("by_teamMemberId", ["teamMemberId"])
    .index("by_status", ["status"]),

  payments: defineTable({
    bookingId: v.id("bookings"),
    payerId: v.id("profiles"),
    amount: v.number(),
    paymentMethod: v.union(v.literal("mobile_money"), v.literal("card")),
    paystackReference: v.string(),
    paystackStatus: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("refunded"),
      v.literal("failed"),
    ),
    paidAt: v.optional(v.number()),
  }).index("by_bookingId", ["bookingId"]),

  reviews: defineTable({
    bookingId: v.id("bookings"),
    learnerId: v.id("profiles"),
    teamMemberId: v.id("teamMemberProfiles"),
    rating: v.number(),
    comment: v.optional(v.string()),
    isFlagged: v.boolean(),
  })
    .index("by_bookingId", ["bookingId"])
    .index("by_teamMemberId", ["teamMemberId"]),

  conversations: defineTable({
    learnerId: v.id("profiles"),
    teamMemberId: v.id("teamMemberProfiles"),
    bookingId: v.optional(v.id("bookings")),
    lastMessageAt: v.number(),
  })
    .index("by_learnerId", ["learnerId"])
    .index("by_teamMemberId", ["teamMemberId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.id("profiles"),
    content: v.string(),
    isRead: v.boolean(),
    sentAt: v.number(),
  }).index("by_conversationId", ["conversationId"]),

  notifications: defineTable({
    userId: v.id("profiles"),
    type: v.string(),
    title: v.string(),
    body: v.string(),
    data: v.optional(v.any()),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_isRead", ["userId", "isRead"]),
});
