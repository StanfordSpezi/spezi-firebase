//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CompartmentDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codeSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'

const compartmentDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const compartmentTypeSchema = z.enum([
  'Patient',
  'Encounter',
  'RelatedPerson',
  'Practitioner',
  'Device',
])

export const untypedCompartmentDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CompartmentDefinition').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    status: compartmentDefinitionStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    code: compartmentTypeSchema,
    _code: elementSchema.optional(),
    search: booleanSchema,
    _search: elementSchema.optional(),
    resource: backboneElementSchema
      .extend({
        code: codeSchema,
        _code: elementSchema.optional(),
        param: stringSchema.array().optional(),
        _param: elementSchema.array().optional(),
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<CompartmentDefinition>

export const compartmentDefinitionSchema: ZodType<CompartmentDefinition> =
  untypedCompartmentDefinitionSchema

export class FhirCompartmentDefinition extends FhirDomainResource<CompartmentDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirCompartmentDefinition {
    return new FhirCompartmentDefinition(
      compartmentDefinitionSchema.parse(value),
    )
  }
}
