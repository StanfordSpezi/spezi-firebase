//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Citation } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCitationSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Citation').readonly(),
    })
    .passthrough(),
)

export const citationSchema = untypedCitationSchema

export class FhirCitation extends FhirDomainResource<Citation> {
  // Static Functions

  public static parse(value: unknown): FhirCitation {
    const parsed = citationSchema.parse(value)
    return new FhirCitation(parsed as unknown as Citation)
  }
}
