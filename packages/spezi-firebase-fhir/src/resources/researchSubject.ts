//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ResearchSubject } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { researchSubjectStatusSchema } from '../valueSets/index.js'

export const untypedResearchSubjectSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchSubject').readonly(),
    identifier: identifierSchema.array().optional(),
    status: researchSubjectStatusSchema,
    _status: elementSchema.optional(),
    period: periodSchema.optional(),
    study: referenceSchema,
    individual: referenceSchema,
    assignedArm: stringSchema.optional(),
    _assignedArm: elementSchema.optional(),
    actualArm: stringSchema.optional(),
    _actualArm: elementSchema.optional(),
    consent: referenceSchema.optional(),
  }),
) satisfies ZodType<ResearchSubject>

export const researchSubjectSchema: ZodType<ResearchSubject> =
  untypedResearchSubjectSchema

export class FhirResearchSubject extends FhirDomainResource<ResearchSubject> {
  // Static Functions

  public static parse(value: unknown): FhirResearchSubject {
    return new FhirResearchSubject(researchSubjectSchema.parse(value))
  }
}
