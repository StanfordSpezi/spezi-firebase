//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a subscription.
 * http://hl7.org/fhir/valueset-subscription-status.html
 */
export const subscriptionStatusCodeSchema = z.enum([
  'requested',
  'active',
  'error',
  'off',
])

export type SubscriptionStatusCode = z.infer<
  typeof subscriptionStatusCodeSchema
>

/**
 * The type of method used to execute a subscription.
 * http://hl7.org/fhir/valueset-subscription-channel-type.html
 */
export const subscriptionChannelTypeSchema = z.enum([
  'rest-hook',
  'websocket',
  'email',
  'sms',
  'message',
])

export type SubscriptionChannelType = z.infer<
  typeof subscriptionChannelTypeSchema
>
