//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type ResearchStudy } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedResearchStudySchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ResearchStudy').readonly(),
    })
    .passthrough(),
)

export const researchStudySchema = untypedResearchStudySchema

export class FhirResearchStudy extends FhirDomainResource<ResearchStudy> {
  // Static Functions

  public static parse(value: unknown): FhirResearchStudy {
    const parsed = researchStudySchema.parse(value)
    return new FhirResearchStudy(parsed as unknown as ResearchStudy)
  }
}
