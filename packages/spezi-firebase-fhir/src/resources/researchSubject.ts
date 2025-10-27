//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ResearchSubject } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedResearchSubjectSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchSubject').readonly(),
  }).passthrough(),
)

export const researchSubjectSchema = untypedResearchSubjectSchema

export class FhirResearchSubject extends FhirDomainResource<ResearchSubject> {
  // Static Functions

  public static parse(value: unknown): FhirResearchSubject {
    const parsed = researchSubjectSchema.parse(value)
    return new FhirResearchSubject(parsed as unknown as ResearchSubject)
  }
}
