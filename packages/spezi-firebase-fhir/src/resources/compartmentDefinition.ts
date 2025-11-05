//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CompartmentDefinitionResource,
  type CompartmentDefinition,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  compartmentDefinitionCodeSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const compartmentDefinitionResourceSchema: ZodType<CompartmentDefinitionResource> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
    param: stringSchema.array().optional(),
    _param: elementSchema.array().optional(),
  })

export const untypedCompartmentDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CompartmentDefinition').readonly(),
    code: compartmentDefinitionCodeSchema,
    _code: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    resource: compartmentDefinitionResourceSchema.array().optional(),
    search: booleanSchema,
    _search: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    url: urlSchema,
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
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
