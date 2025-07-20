//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Patient } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  addressSchema,
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactPointSchema,
  dateSchema,
  dateTimeSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'

export const patientGender = ['male', 'female', 'other', 'unknown'] as const

export const patientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Patient').readonly(),
    identifier: identifierSchema.array().optional(),
    active: z.boolean().optional(),
    _active: elementSchema.optional(),
    name: humanNameSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    gender: z.enum(patientGender).optional(),
    _gender: elementSchema.optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    deceasedBoolean: z.boolean().optional(),
    _deceasedBoolean: elementSchema.optional(),
    deceasedDateTime: dateTimeSchema.optional(),
    _deceasedDateTime: elementSchema.optional(),
    multipleBirthBoolean: z.boolean().optional(),
    _multipleBirthBoolean: elementSchema.optional(),
    multipleBirthInteger: z.number().int().optional(),
    _multipleBirthInteger: elementSchema.optional(),
    photo: attachmentSchema.array().optional(),
    contact: backboneElementSchema
      .extend({
        relationship: codeableConceptSchema.array().optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
        gender: z.enum(patientGender).optional(),
        _gender: elementSchema.optional(),
        organization: referenceSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    communication: backboneElementSchema
      .extend({
        language: codeableConceptSchema,
        preferred: z.boolean().optional(),
        _preferred: elementSchema.optional(),
      })
      .array()
      .optional(),
    generalPractitioner: referenceSchema.array().optional(),
    managingOrganization: referenceSchema.optional(),
    link: backboneElementSchema
      .extend({
        other: referenceSchema,
        type: z.enum(['replaced-by', 'replaces', 'refer', 'seealso']),
        _type: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Patient>
