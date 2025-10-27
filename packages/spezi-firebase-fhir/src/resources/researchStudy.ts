//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ResearchStudy } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactDetailSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedResearchStudySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchStudy').readonly(),
    identifier: identifierSchema.array().optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    protocol: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: z.enum([
      'active',
      'administratively-completed',
      'approved',
      'closed-to-accrual',
      'closed-to-accrual-and-intervention',
      'completed',
      'disapproved',
      'in-review',
      'temporarily-closed-to-accrual',
      'temporarily-closed-to-accrual-and-intervention',
      'withdrawn',
    ]),
    _status: elementSchema.optional(),
    primaryPurposeType: codeableConceptSchema.optional(),
    phase: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    focus: codeableConceptSchema.array().optional(),
    condition: codeableConceptSchema.array().optional(),
    contact: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    keyword: codeableConceptSchema.array().optional(),
    location: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    enrollment: referenceSchema.array().optional(),
    period: periodSchema.optional(),
    sponsor: referenceSchema.optional(),
    principalInvestigator: referenceSchema.optional(),
    site: referenceSchema.array().optional(),
    reasonStopped: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
    arm: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        type: codeableConceptSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
      })
      .array()
      .optional(),
    objective: backboneElementSchema
      .extend({
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        type: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<ResearchStudy>

export const researchStudySchema: ZodType<ResearchStudy> =
  untypedResearchStudySchema

export class FhirResearchStudy extends FhirDomainResource<ResearchStudy> {
  // Static Functions

  public static parse(value: unknown): FhirResearchStudy {
    return new FhirResearchStudy(researchStudySchema.parse(value))
  }
}
