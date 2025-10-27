//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type SubscriptionTopic } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedSubscriptionTopicSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('SubscriptionTopic').readonly(),
    })
    .passthrough(),
)

export const subscriptionTopicSchema = untypedSubscriptionTopicSchema

export class FhirSubscriptionTopic extends FhirDomainResource<SubscriptionTopic> {
  // Static Functions

  public static parse(value: unknown): FhirSubscriptionTopic {
    const parsed = subscriptionTopicSchema.parse(value)
    return new FhirSubscriptionTopic(parsed as unknown as SubscriptionTopic)
  }
}
