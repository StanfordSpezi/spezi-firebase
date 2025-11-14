//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR SubscriptionStatusStatus value set.
 * The status of a subscription notification.
 */
export const subscriptionStatusStatusSchema = z.enum([
  'requested',
  'active',
  'error',
  'off',
])

/**
 * TypeScript type for FHIR SubscriptionStatusStatus value set.
 */
export type SubscriptionStatusStatus = z.infer<
  typeof subscriptionStatusStatusSchema
>

/**
 * Zod schema for FHIR SubscriptionStatusType value set.
 * The type of notification being sent in a subscription status.
 */
export const subscriptionStatusTypeSchema = z.enum([
  'handshake',
  'heartbeat',
  'event-notification',
  'query-status',
  'query-event',
])

/**
 * TypeScript type for FHIR SubscriptionStatusType value set.
 */
export type SubscriptionStatusType = z.infer<
  typeof subscriptionStatusTypeSchema
>
