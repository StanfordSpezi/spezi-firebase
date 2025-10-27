//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { CarePlan } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCarePlanSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CarePlan').readonly(),
    })
    .passthrough(),
)

export const carePlanSchema = untypedCarePlanSchema

export class FhirCarePlan extends FhirDomainResource<CarePlan> {
  // Static Functions

  public static parse(value: unknown): FhirCarePlan {
    const parsed = carePlanSchema.parse(value)
    return new FhirCarePlan(parsed as unknown as CarePlan)
  }
}
