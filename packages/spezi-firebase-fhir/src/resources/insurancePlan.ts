//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type InsurancePlan } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedInsurancePlanSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('InsurancePlan').readonly(),
    })
    .passthrough(),
)

export const insurancePlanSchema = untypedInsurancePlanSchema

export class FhirInsurancePlan extends FhirDomainResource<InsurancePlan> {
  // Static Functions

  public static parse(value: unknown): FhirInsurancePlan {
    const parsed = insurancePlanSchema.parse(value)
    return new FhirInsurancePlan(parsed as unknown as InsurancePlan)
  }
}
