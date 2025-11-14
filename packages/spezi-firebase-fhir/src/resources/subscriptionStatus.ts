//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SubscriptionStatusNotificationEvent,
  type SubscriptionStatus,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  instantSchema,
  referenceSchema,
  stringSchema,
  urlSchema,
} from '../elements/index.js'
import {
  subscriptionStatusStatusSchema,
  subscriptionStatusTypeSchema,
} from '../valueSets/index.js'

const subscriptionStatusNotificationEventSchema: ZodType<SubscriptionStatusNotificationEvent> =
  backboneElementSchema.extend({
    additionalContext: referenceSchema.array().optional(),
    eventNumber: stringSchema,
    _eventNumber: elementSchema.optional(),
    focus: referenceSchema.optional(),
    timestamp: instantSchema.optional(),
    _timestamp: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR SubscriptionStatus resource (untyped version).
 */
export const untypedSubscriptionStatusSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubscriptionStatus').readonly(),
    error: codeableConceptSchema.array().optional(),
    eventsSinceSubscriptionStart: stringSchema.optional(),
    _eventsSinceSubscriptionStart: elementSchema.optional(),
    notificationEvent: subscriptionStatusNotificationEventSchema
      .array()
      .optional(),
    status: subscriptionStatusStatusSchema.optional(),
    _status: elementSchema.optional(),
    subscription: referenceSchema,
    topic: urlSchema.optional(),
    _topic: elementSchema.optional(),
    type: subscriptionStatusTypeSchema,
    _type: elementSchema.optional(),
  }),
) satisfies ZodType<SubscriptionStatus>

/**
 * Zod schema for FHIR SubscriptionStatus resource.
 */
export const subscriptionStatusSchema: ZodType<SubscriptionStatus> =
  untypedSubscriptionStatusSchema

/**
 * Wrapper class for FHIR SubscriptionStatus resources.
 * Provides utility methods for working with subscription status information and notification bundles.
 */
export class FhirSubscriptionStatus extends FhirDomainResource<SubscriptionStatus> {
  // Static Functions

  /**
   * Parses a SubscriptionStatus resource from unknown data.
   *
   * @param value - The data to parse and validate against the SubscriptionStatus schema
   * @returns A FhirSubscriptionStatus instance containing the validated resource
   */
  public static parse(value: unknown): FhirSubscriptionStatus {
    return new FhirSubscriptionStatus(subscriptionStatusSchema.parse(value))
  }
}
