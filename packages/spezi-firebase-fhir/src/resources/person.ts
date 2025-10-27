//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Person } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  addressSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  contactPointSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  referenceSchema,
} from '../elements/index.js'
import {
  administrativeGenderSchema,
  identityAssuranceLevelSchema,
} from '../valueSets/index.js'

export const untypedPersonSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Person').readonly(),
    identifier: identifierSchema.array().optional(),
    name: humanNameSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    address: addressSchema.array().optional(),
    photo: attachmentSchema.optional(),
    managingOrganization: referenceSchema.optional(),
    active: booleanSchema.optional(),
    link: backboneElementSchema
      .extend({
        target: referenceSchema,
        assurance: identityAssuranceLevelSchema.optional(),
        _assurance: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
)

export const personSchema= untypedPersonSchema

export class FhirPerson extends FhirDomainResource<Person> {
  // Static Functions

  public static parse(value: unknown): FhirPerson {
    return new FhirPerson(personSchema.parse(value))
  }
}
