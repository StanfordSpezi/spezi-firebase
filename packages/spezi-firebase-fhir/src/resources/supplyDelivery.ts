//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { SupplyDelivery } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedSupplyDeliverySchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('SupplyDelivery').readonly(),
    })
    .passthrough(),
)

export const supplyDeliverySchema = untypedSupplyDeliverySchema

export class FhirSupplyDelivery extends FhirDomainResource<SupplyDelivery> {
  // Static Functions

  public static parse(value: unknown): FhirSupplyDelivery {
    const parsed = supplyDeliverySchema.parse(value)
    return new FhirSupplyDelivery(parsed as unknown as SupplyDelivery)
  }
}
