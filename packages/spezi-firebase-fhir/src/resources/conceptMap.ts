//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ConceptMap } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedConceptMapSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ConceptMap').readonly(),
    })
    .passthrough(),
)

export const conceptMapSchema = untypedConceptMapSchema

export class FhirConceptMap extends FhirDomainResource<ConceptMap> {
  // Static Functions

  public static parse(value: unknown): FhirConceptMap {
    const parsed = conceptMapSchema.parse(value)
    return new FhirConceptMap(parsed as unknown as ConceptMap)
  }
}
