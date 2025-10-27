//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Practitioner } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { patientGenderSchema } from './patient.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  attachmentSchema,
  humanNameSchema,
  identifierSchema,
  backboneElementSchema,
  booleanSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  addressSchema,
  contactPointSchema,
  dateSchema,
} from '../elements/index.js'

export const untypedPractitionerSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Practitioner').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    name: humanNameSchema.array().optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    telecom: contactPointSchema.array().optional(),
    gender: patientGenderSchema.optional(),
    _gender: elementSchema.optional(),
    address: addressSchema.array().optional(),
    photo: attachmentSchema.array().optional(),
    qualification: backboneElementSchema
      .extend({
        identifier: identifierSchema.array().optional(),
        code: codeableConceptSchema,
        period: periodSchema.optional(),
        issuer: referenceSchema.optional(),
      })
      .array()
      .optional(),
    communication: codeableConceptSchema.array().optional(),
  }),
)

export const practitionerSchema: ZodType<Practitioner> =
  untypedPractitionerSchema

export class FhirPractitioner extends FhirDomainResource<Practitioner> {
  public static parse(value: unknown): FhirPractitioner {
    return new FhirPractitioner(practitionerSchema.parse(value))
  }
}
