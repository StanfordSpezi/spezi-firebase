//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type AllergyIntolerance } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const allergyIntoleranceCategorySchema = z.enum([
  'food',
  'medication',
  'environment',
  'biologic',
])

const allergyIntoleranceCriticalitySchema = z.enum([
  'low',
  'high',
  'unable-to-assess',
])

const allergyIntoleranceReactionSeveritySchema = z.enum([
  'mild',
  'moderate',
  'severe',
])

const allergyIntoleranceTypeSchema = z.enum(['allergy', 'intolerance'])

export const untypedAllergyIntoleranceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AllergyIntolerance').readonly(),
    identifier: identifierSchema.array().optional(),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    type: allergyIntoleranceTypeSchema,
    _type: elementSchema.optional(),
    category: allergyIntoleranceCategorySchema.array().optional(),
    _category: elementSchema.array().optional(),
    criticality: allergyIntoleranceCriticalitySchema.optional(),
    code: codeableConceptSchema.optional(),
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    onsetDateTime: dateTimeSchema.optional(),
    _onsetDateTime: elementSchema.optional(),
    onsetAge: quantitySchema.optional(),
    onsetPeriod: periodSchema.optional(),
    onsetRange: rangeSchema.optional(),
    onsetString: stringSchema.optional(),
    _onsetString: elementSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    recorder: referenceSchema.optional(),
    asserter: referenceSchema.optional(),
    lastOccurrence: dateTimeSchema.optional(),
    _lastOccurrence: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    reaction: backboneElementSchema
      .extend({
        substance: codeableConceptSchema.optional(),
        manifestation: codeableConceptSchema.array().min(1),
        onset: dateTimeSchema.optional(),
        _onset: elementSchema.optional(),
        severity: allergyIntoleranceReactionSeveritySchema.optional(),
        _severity: elementSchema.optional(),
        exposureRoute: codeableConceptSchema.optional(),
        note: annotationSchema.array().optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<AllergyIntolerance>

export const allergyIntoleranceSchema: ZodType<AllergyIntolerance> =
  untypedAllergyIntoleranceSchema

export class FhirAllergyIntolerance extends FhirDomainResource<AllergyIntolerance> {
  // Static Functions

  public static parse(value: unknown): FhirAllergyIntolerance {
    return new FhirAllergyIntolerance(allergyIntoleranceSchema.parse(value))
  }
}
