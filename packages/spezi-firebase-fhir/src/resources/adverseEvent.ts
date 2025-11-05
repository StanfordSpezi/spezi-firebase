//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AdverseEventSuspectEntity,
  type AdverseEventSuspectEntityCausality,
  type AdverseEvent,
} from 'fhir/r4b.js'
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
import { adverseEventActualitySchema } from '../valueSets/index.js'

const adverseEventSuspectEntityCausalitySchema: ZodType<AdverseEventSuspectEntityCausality> =
  backboneElementSchema.extend({
    assessment: codeableConceptSchema.optional(),
    productRelatedness: stringSchema.optional(),
    _productRelatedness: elementSchema.optional(),
    author: referenceSchema.optional(),
    method: codeableConceptSchema.optional(),
  })

const adverseEventSuspectEntitySchema: ZodType<AdverseEventSuspectEntity> =
  backboneElementSchema.extend({
    instance: referenceSchema,
    causality: adverseEventSuspectEntityCausalitySchema.array().optional(),
  })

export const untypedAdverseEventSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AdverseEvent').readonly(),
    identifier: identifierSchema.optional(),
    actuality: adverseEventActualitySchema,
    _actuality: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    event: codeableConceptSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    detected: dateTimeSchema.optional(),
    _detected: elementSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    resultingCondition: referenceSchema.array().optional(),
    location: referenceSchema.optional(),
    seriousness: codeableConceptSchema.optional(),
    severity: codeableConceptSchema.optional(),
    outcome: codeableConceptSchema.optional(),
    recorder: referenceSchema.optional(),
    contributor: referenceSchema.array().optional(),
    suspectEntity: adverseEventSuspectEntitySchema.array().optional(),
    subjectMedicalHistory: referenceSchema.array().optional(),
    referenceDocument: referenceSchema.array().optional(),
    study: referenceSchema.array().optional(),
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
