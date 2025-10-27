//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Measure } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedMeasureSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Measure').readonly(),
    })
    .passthrough(),
)

export const measureSchema = untypedMeasureSchema

export class FhirMeasure extends FhirDomainResource<Measure> {
  // Static Functions

  public static parse(value: unknown): FhirMeasure {
    const parsed = measureSchema.parse(value)
    return new FhirMeasure(parsed as unknown as Measure)
  }
}
