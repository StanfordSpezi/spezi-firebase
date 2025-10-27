//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RelatedPerson } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  addressSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import { administrativeGenderSchema } from '../valueSets/index.js'

export const untypedRelatedPersonSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RelatedPerson').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    patient: referenceSchema,
    relationship: codeableConceptSchema.array().optional(),
    name: humanNameSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    address: addressSchema.array().optional(),
    photo: attachmentSchema.array().optional(),
    period: periodSchema.optional(),
    communication: backboneElementSchema
      .extend({
        language: codeableConceptSchema,
        preferred: booleanSchema.optional(),
        _preferred: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<RelatedPerson>

export const relatedPersonSchema: ZodType<RelatedPerson> =
  untypedRelatedPersonSchema

export class FhirRelatedPerson extends FhirDomainResource<RelatedPerson> {
  // Static Functions

  public static parse(value: unknown): FhirRelatedPerson {
    return new FhirRelatedPerson(relatedPersonSchema.parse(value))
  }
}
