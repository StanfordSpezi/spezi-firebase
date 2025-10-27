//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type SupplyRequest } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedSupplyRequestSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('SupplyRequest').readonly(),
    })
    .passthrough(),
)

export const supplyRequestSchema = untypedSupplyRequestSchema

export class FhirSupplyRequest extends FhirDomainResource<SupplyRequest> {
  // Static Functions

  public static parse(value: unknown): FhirSupplyRequest {
    const parsed = supplyRequestSchema.parse(value)
    return new FhirSupplyRequest(parsed as unknown as SupplyRequest)
  }
}
