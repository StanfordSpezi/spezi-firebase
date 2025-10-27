//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Subscription } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  instantSchema,
  stringSchema,
  urlSchema,
} from '../elements/index.js'

export const untypedSubscriptionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Subscription').readonly(),
    status: z.enum(['requested', 'active', 'error', 'off']),
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
    channel: z.object({
      type: z.enum(['rest-hook', 'websocket', 'email', 'sms', 'message']),
      _type: elementSchema.optional(),
      endpoint: urlSchema.optional(),
      _endpoint: elementSchema.optional(),
      payload: stringSchema.optional(),
      _payload: elementSchema.optional(),
      header: stringSchema.array().optional(),
      _header: elementSchema.array().optional(),
    }),
  }),
) satisfies ZodType<Subscription>

export const subscriptionSchema: ZodType<Subscription> =
  untypedSubscriptionSchema

export class FhirSubscription extends FhirDomainResource<Subscription> {
  // Static Functions

  public static parse(value: unknown): FhirSubscription {
    return new FhirSubscription(subscriptionSchema.parse(value))
  }
}
