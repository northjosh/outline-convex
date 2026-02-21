# Auth, Roles & Data Model Design

## Overview

Foundation layer for Outline: authentication, role-based access control, and the Convex schema. Everything else (booking, payments, messaging) builds on this.

## Decisions

- **Single role per user**: `learner | team_member | admin`
- **Separate profiles table** from Better Auth's internal user table
- **Self-registered users** automatically become `learner`
- **Team members** are onboarded via single-use, email-locked invite links created by an admin
- **First admin** is bootstrapped via a one-time seed script
- **Phone OTP** deferred to Phase 1b (email + password and Google OAuth for MVP)

## Role System

| Role          | How they get it                          |
|---------------|------------------------------------------|
| `learner`     | Automatic on signup                      |
| `team_member` | Admin creates invite, person signs up    |
| `admin`       | Seed script promotes an existing profile |

- One role per user, no multi-role. If someone needs both admin and team_member, they create separate accounts.
- Role is stored on the `profiles` table, not on Better Auth's user table.

## Auth Configuration

Extend the existing Better Auth setup:

- **Email + password** — already working
- **Google OAuth** — add as a social provider
- **Phone OTP** — deferred to Phase 1b (important for Ghana market)
- Better Auth's internal tables (`user`, `session`, `account`, `verification`) remain untouched

## Table Architecture

```
Better Auth manages:        App manages:
+-----------------+        +----------------------+
| user            |------->| profiles             |
| session         |  1:1   | team_member_profiles |
| account         |        | invites              |
| verification    |        | services             |
+-----------------+        | availability_slots   |
                           | bookings             |
                           | payments             |
                           | reviews              |
                           | conversations        |
                           | messages             |
                           | notifications        |
                           +----------------------+
```

- `profiles` links to Better Auth's `user` via a `userId` field
- A profile is created automatically on first login via a post-signup hook

## Invite Flow

```
Admin enters team member's email
         |
         v
invites table: { email, token, status: "pending", expiresAt }
         |
         v  (admin copies link or system emails it)
Person clicks /invite/[token]
         |
         v
Signup form with email pre-filled and locked
         |
         v
On signup -> profile created with role = "team_member"
         |
         v
Invite marked as "used"
```

- Invites expire after 7 days
- Invite statuses: `pending | used | expired`
- If someone with that email already has an account, the invite is rejected (MVP simplicity)
- Invite tokens are cryptographically random

## Seed Script

A Convex mutation (`admin:seedAdmin`):

1. Takes an `email` argument
2. Finds the profile with that email
3. Sets `role` to `"admin"`
4. Guard: if an admin already exists, it refuses

Run once via: `npx convex run admin:seedAdmin --args '{"email": "..."}'`

## Convex Schema (Phase 1 MVP)

### profiles

| Field      | Type      | Notes                                |
|------------|-----------|--------------------------------------|
| userId     | id        | FK to Better Auth user               |
| role       | string    | "learner", "team_member", "admin"    |
| fullName   | string    |                                      |
| email      | string    |                                      |
| phone      | string?   | For mobile money and OTP             |
| avatarUrl  | string?   | Profile photo                        |
| city       | string?   | e.g., Accra, Kumasi                  |
| isActive   | boolean   | Default true                         |

### team_member_profiles

| Field           | Type      | Notes                                     |
|-----------------|-----------|-------------------------------------------|
| userId          | id        | FK to profiles                            |
| bio             | string?   | Professional summary                      |
| headline        | string?   | e.g., "Experienced WASSCE Mathematics Tutor" |
| qualifications  | array     | [{ title, institution, year }]            |
| subjects        | string[]  | e.g., Mathematics, Physics                |
| educationLevels | string[]  | e.g., WASSCE, Cambridge IGCSE             |
| isRemote        | boolean   | Offers online sessions                    |
| isInPerson      | boolean   | Offers in-person sessions                 |
| location        | string?   | City for in-person                        |
| avgRating       | number    | Computed from reviews                     |
| totalReviews    | number    |                                           |
| totalSessions   | number    |                                           |

### invites

| Field      | Type      | Notes                                |
|------------|-----------|--------------------------------------|
| email      | string    | Locked to this email                 |
| token      | string    | Unique, cryptographically random     |
| status     | string    | "pending", "used", "expired"         |
| invitedBy  | id        | FK to admin's profile                |
| expiresAt  | number    | Unix timestamp                       |

### services

| Field           | Type      | Notes                                     |
|-----------------|-----------|-------------------------------------------|
| title           | string    | e.g., "One-on-One WASSCE Math Session"    |
| description     | string?   |                                           |
| serviceCategory | string    | "live_session" (future: digital_product)  |
| subject         | string    |                                           |
| educationLevel  | string    | WASSCE, Cambridge IGCSE, Cambridge A-Level|
| sessionType     | string    | "one_on_one", "group"                     |
| price           | number    | In GHS, set by admin                      |
| priceUnit       | string    | "per_hour", "per_session"                 |
| durationMinutes | number    | Default session length                    |
| isActive        | boolean   |                                           |

### availability_slots

| Field        | Type      | Notes                                |
|--------------|-----------|--------------------------------------|
| teamMemberId | id        | FK to team_member_profiles           |
| dayOfWeek    | number?   | 0-6 (Sun-Sat), null for one-off      |
| startTime    | string    | HH:MM format                         |
| endTime      | string    | HH:MM format                         |
| specificDate | string?   | ISO date for one-off availability    |
| isBlocked    | boolean   | True = unavailable                   |

### bookings

| Field             | Type      | Notes                                |
|-------------------|-----------|--------------------------------------|
| learnerId         | id        | FK to profiles                       |
| teamMemberId      | id        | FK to team_member_profiles           |
| serviceId         | id        | FK to services                       |
| scheduledDate     | string    | ISO date                             |
| scheduledStart    | number    | Unix timestamp                       |
| scheduledEnd      | number    | Unix timestamp                       |
| status            | string    | pending, confirmed, completed, cancelled |
| amount            | number    | In GHS                               |
| sessionType       | string    | "online", "in_person"                |
| meetingLink       | string?   | Zoom/Meet link                       |
| cancellationReason| string?   |                                      |
| cancelledBy       | id?       | FK to profiles                       |
| notes             | string?   | Learner's notes                      |

### payments

| Field             | Type      | Notes                                |
|-------------------|-----------|--------------------------------------|
| bookingId         | id        | FK to bookings                       |
| payerId           | id        | FK to profiles (learner)             |
| amount            | number    | In GHS                               |
| paymentMethod     | string    | "mobile_money", "card"               |
| paystackReference | string    |                                      |
| paystackStatus    | string    |                                      |
| status            | string    | pending, completed, refunded, failed |
| paidAt            | number?   | Unix timestamp                       |

### reviews

| Field        | Type      | Notes                                |
|--------------|-----------|--------------------------------------|
| bookingId    | id        | FK to bookings (one review per)      |
| learnerId    | id        | FK to profiles                       |
| teamMemberId | id        | FK to team_member_profiles           |
| rating       | number    | 1-5                                  |
| comment      | string?   |                                      |
| isFlagged    | boolean   |                                      |

### conversations

| Field          | Type      | Notes                                |
|----------------|-----------|--------------------------------------|
| learnerId      | id        | FK to profiles                       |
| teamMemberId   | id        | FK to team_member_profiles           |
| bookingId      | id?       | Optional, can be direct inquiry      |
| lastMessageAt  | number    | Unix timestamp, for sorting          |

### messages

| Field          | Type      | Notes                                |
|----------------|-----------|--------------------------------------|
| conversationId | id        | FK to conversations                  |
| senderId       | id        | FK to profiles                       |
| content        | string    |                                      |
| isRead         | boolean   |                                      |
| sentAt         | number    | Unix timestamp                       |

### notifications

| Field     | Type      | Notes                                       |
|-----------|-----------|---------------------------------------------|
| userId    | id        | FK to profiles                              |
| type      | string    | booking_confirmed, payment_received, etc.   |
| title     | string    |                                              |
| body      | string    |                                              |
| data      | object?   | Additional context (bookingId, etc.)        |
| isRead    | boolean   |                                              |

## Route Protection

- **Convex functions**: check caller's profile role before executing queries/mutations
- **Frontend routes**: role-based redirect via TanStack Router layout guards
- **Shared hook**: `useCurrentProfile()` fetches profile + role for UI decisions

## What's NOT in scope for this design

- Phone OTP auth (Phase 1b)
- Digital products / file storage (Phase 2)
- Custom requests flow (Phase 3)
- Specific UI/component design
- Paystack webhook implementation details (separate design)
