//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SubscriptionStatus } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  instantSchema,
  intSchema,
  stringSchema,
  canonicalSchema,
  codeSchema,
} from '../elements/index.js'

const subscriptionStatusCodesSchema = z.enum([
  'requested',
  'active',
  'error',
  'off',
  'entered-in-error',
])

const subscriptionNotificationTypeSchema = z.enum([
  'handshake',
  'heartbeat',
  'event-notification',
  'query-status',
  'query-event',
])

export const untypedSubscriptionStatusSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubscriptionStatus').readonly(),
    status: subscriptionStatusCodesSchema.optional(),
    _status: elementSchema.optional(),
    type: subscriptionNotificationTypeSchema,
    _type: elementSchema.optional(),
    eventsSinceSubscriptionStart: intSchema.optional(),
    _eventsSinceSubscriptionStart: elementSchema.optional(),
    notificationEvent: backboneElementSchema
      .extend({
        eventNumber: intSchema,
        _eventNumber: elementSchema.optional(),
        timestamp: instantSchema.optional(),
        _timestamp: elementSchema.optional(),
        focus: z.any().optional(), // Reference
        additionalContext: z.any().array().optional(), // Reference array
      })
      .array()
      .optional(),
    subscription: z.any(), // Reference to Subscription
    topic: canonicalSchema.optional(),
    _topic: elementSchema.optional(),
    error: codeableConceptSchema.array().optional(),
  }),
) satisfies ZodType<SubscriptionStatus>

export const subscriptionStatusSchema: ZodType<SubscriptionStatus> =
  untypedSubscriptionStatusSchema

export class FhirSubscriptionStatus extends FhirDomainResource<SubscriptionStatus> {
  public static parse(value: unknown): FhirSubscriptionStatus {
    return new FhirSubscriptionStatus(subscriptionStatusSchema.parse(value))
  }
}
