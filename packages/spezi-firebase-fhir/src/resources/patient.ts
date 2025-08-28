//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Patient } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  domainResourceSchema,
  FhirDomainResource,
} from '../elements/domainResource.js'
import {
  addressSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  dateSchema,
  dateTimeSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  intSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'

const patientGenderSchema = z.enum(['male', 'female', 'other', 'unknown'])

const patientLinkTypeSchema = z.enum([
  'replaced-by',
  'replaces',
  'refer',
  'seealso',
])

export const untypedPatientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Patient').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    name: humanNameSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    gender: patientGenderSchema.optional(),
    _gender: elementSchema.optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    deceasedBoolean: booleanSchema.optional(),
    _deceasedBoolean: elementSchema.optional(),
    deceasedDateTime: dateTimeSchema.optional(),
    _deceasedDateTime: elementSchema.optional(),
    address: addressSchema.array().optional(),
    maritalStatus: codeableConceptSchema.optional(),
    multipleBirthBoolean: booleanSchema.optional(),
    _multipleBirthBoolean: elementSchema.optional(),
    multipleBirthInteger: intSchema.optional(),
    _multipleBirthInteger: elementSchema.optional(),
    photo: attachmentSchema.array().optional(),
    contact: backboneElementSchema
      .extend({
        relationship: codeableConceptSchema.array().optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
        gender: patientGenderSchema.optional(),
        _gender: elementSchema.optional(),
        organization: referenceSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    communication: backboneElementSchema
      .extend({
        language: codeableConceptSchema,
        preferred: booleanSchema.optional(),
        _preferred: elementSchema.optional(),
      })
      .array()
      .optional(),
    generalPractitioner: referenceSchema.array().optional(),
    managingOrganization: referenceSchema.optional(),
    link: backboneElementSchema
      .extend({
        other: referenceSchema,
        type: patientLinkTypeSchema,
        _type: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Patient>

export const patientSchema: ZodType<Patient> = untypedPatientSchema

export class FhirPatient extends FhirDomainResource<Patient> {
  // Static Functions

  public static parse(value: unknown): FhirPatient {
    return new FhirPatient(patientSchema.parse(value))
  }
}
