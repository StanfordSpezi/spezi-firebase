//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR SubscriptionTopicCanFilterByModifier value set.
 * Modifiers that can be applied to filter criteria in a subscription topic.
 */
export const subscriptionTopicCanFilterByModifierSchema = z.enum([
  '=',
  'eq',
  'ne',
  'gt',
  'lt',
  'ge',
  'le',
  'sa',
  'eb',
  'ap',
  'above',
  'below',
  'in',
  'not-in',
  'of-type',
])

/**
 * TypeScript type for FHIR SubscriptionTopicCanFilterByModifier value set.
 */
export type SubscriptionTopicCanFilterByModifier = z.infer<
  typeof subscriptionTopicCanFilterByModifierSchema
>

/**
 * Zod schema for FHIR SubscriptionTopicResourceTriggerInteraction value set.
 * The type of interaction that triggers a subscription notification.
 */
export const subscriptionTopicResourceTriggerInteractionSchema = z.enum([
  'create',
  'update',
  'delete',
])

/**
 * TypeScript type for FHIR SubscriptionTopicResourceTriggerInteraction value set.
 */
export type SubscriptionTopicResourceTriggerInteraction = z.infer<
  typeof subscriptionTopicResourceTriggerInteractionSchema
>

/**
 * Zod schema for FHIR SubscriptionTopicResourceTriggerQueryCriteriaResult value set.
 * How query criteria are evaluated for a subscription topic.
 */
export const subscriptionTopicResourceTriggerQueryCriteriaResultSchema = z.enum(
  ['test-passes', 'test-fails'],
)

/**
 * TypeScript type for FHIR SubscriptionTopicResourceTriggerQueryCriteriaResult value set.
 */
export type SubscriptionTopicResourceTriggerQueryCriteriaResult = z.infer<
  typeof subscriptionTopicResourceTriggerQueryCriteriaResultSchema
>
