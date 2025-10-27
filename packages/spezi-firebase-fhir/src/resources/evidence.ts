//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Evidence } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedEvidenceSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Evidence').readonly(),
    })
    .passthrough(),
)

export const evidenceSchema = untypedEvidenceSchema

export class FhirEvidence extends FhirDomainResource<Evidence> {
  // Static Functions

  public static parse(value: unknown): FhirEvidence {
    const parsed = evidenceSchema.parse(value)
    return new FhirEvidence(parsed as unknown as Evidence)
  }
}
