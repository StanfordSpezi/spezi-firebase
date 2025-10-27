//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type AdverseEvent } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const adverseEventActualitySchema = z.enum(['actual', 'potential'])

export const untypedAdverseEventSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AdverseEvent').readonly(),
    actuality: adverseEventActualitySchema,
    _actuality: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    contributor: referenceSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    detected: dateTimeSchema.optional(),
    _detected: elementSchema.optional(),
    encounter: referenceSchema.optional(),
    event: codeableConceptSchema.optional(),
    identifier: identifierSchema.optional(),
    location: referenceSchema.optional(),
    outcome: codeableConceptSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    recorder: referenceSchema.optional(),
    referenceDocument: referenceSchema.array().optional(),
    resultingCondition: referenceSchema.array().optional(),
    seriousness: codeableConceptSchema.optional(),
    severity: codeableConceptSchema.optional(),
    study: referenceSchema.array().optional(),
    subject: referenceSchema,
    subjectMedicalHistory: referenceSchema.array().optional(),
    suspectEntity: backboneElementSchema
      .extend({
        instance: referenceSchema,
        causality: backboneElementSchema
          .extend({
            assessment: codeableConceptSchema.optional(),
            author: referenceSchema.optional(),
            method: codeableConceptSchema.optional(),
            productRelatedness: stringSchema.optional(),
            _productRelatedness: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<AdverseEvent>

export const adverseEventSchema: ZodType<AdverseEvent> =
  untypedAdverseEventSchema

export class FhirAdverseEvent extends FhirDomainResource<AdverseEvent> {
  // Static Functions

  public static parse(value: unknown): FhirAdverseEvent {
    return new FhirAdverseEvent(adverseEventSchema.parse(value))
  }
}
