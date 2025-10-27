//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ValueSet } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedValueSetSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ValueSet').readonly(),
    })
    .passthrough(),
)

export const valueSetSchema = untypedValueSetSchema

export class FhirValueSet extends FhirDomainResource<ValueSet> {
  // Static Functions

  public static parse(value: unknown): FhirValueSet {
    const parsed = valueSetSchema.parse(value)
    return new FhirValueSet(parsed as unknown as ValueSet)
  }
}
