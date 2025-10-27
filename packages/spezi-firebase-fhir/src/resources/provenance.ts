//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Provenance } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedProvenanceSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Provenance').readonly(),
    })
    .passthrough(),
)

export const provenanceSchema = untypedProvenanceSchema

export class FhirProvenance extends FhirDomainResource<Provenance> {
  // Static Functions

  public static parse(value: unknown): FhirProvenance {
    const parsed = provenanceSchema.parse(value)
    return new FhirProvenance(parsed as unknown as Provenance)
  }
}
