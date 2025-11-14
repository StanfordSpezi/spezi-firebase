//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SubscriptionChannel, type Subscription } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  instantSchema,
  stringSchema,
  urlSchema,
} from '../elements/index.js'
import {
  subscriptionResourceStatusSchema,
  subscriptionChannelTypeSchema,
} from '../valueSets/index.js'

const subscriptionChannelSchema: ZodType<SubscriptionChannel> =
  backboneElementSchema.extend({
    type: subscriptionChannelTypeSchema,
    _type: elementSchema.optional(),
    endpoint: urlSchema.optional(),
    _endpoint: elementSchema.optional(),
    payload: stringSchema.optional(),
    _payload: elementSchema.optional(),
    header: stringSchema.array().optional(),
    _header: elementSchema.array().optional(),
  })

/**
 * Zod schema for FHIR Subscription resource (untyped version).
 */
export const untypedSubscriptionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Subscription').readonly(),
    status: subscriptionResourceStatusSchema,
    _status: elementSchema.optional(),
    contact: contactPointSchema.array().optional(),
    end: instantSchema.optional(),
    _end: elementSchema.optional(),
    reason: stringSchema,
    _reason: elementSchema.optional(),
    criteria: stringSchema,
    _criteria: elementSchema.optional(),
    error: stringSchema.optional(),
    _error: elementSchema.optional(),
    channel: subscriptionChannelSchema,
  }),
) satisfies ZodType<Subscription>

/**
 * Zod schema for FHIR Subscription resource.
 */
export const subscriptionSchema: ZodType<Subscription> =
  untypedSubscriptionSchema

/**
 * Wrapper class for FHIR Subscription resources.
 * Provides utility methods for working with subscriptions that describe server push notifications for specific events.
 */
export class FhirSubscription extends FhirDomainResource<Subscription> {
  // Static Functions

  /**
   * Parses a Subscription resource from unknown data.
   *
   * @param value - The data to parse and validate against the Subscription schema
   * @returns A FhirSubscription instance containing the validated resource
   */
  public static parse(value: unknown): FhirSubscription {
    return new FhirSubscription(subscriptionSchema.parse(value))
  }
}
