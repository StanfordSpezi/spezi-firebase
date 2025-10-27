//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { SubscriptionStatus } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedSubscriptionStatusSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('SubscriptionStatus').readonly(),
    })
    .passthrough(),
)

export const subscriptionStatusSchema = untypedSubscriptionStatusSchema

export class FhirSubscriptionStatus extends FhirDomainResource<SubscriptionStatus> {
  // Static Functions

  public static parse(value: unknown): FhirSubscriptionStatus {
    const parsed = subscriptionStatusSchema.parse(value)
    return new FhirSubscriptionStatus(parsed as unknown as SubscriptionStatus)
  }
}
