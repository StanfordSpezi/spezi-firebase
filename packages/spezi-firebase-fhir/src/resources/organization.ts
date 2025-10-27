//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Organization } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  addressSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedOrganizationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Organization').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    alias: stringSchema.array().optional(),
    _alias: elementSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    address: addressSchema.array().optional(),
    partOf: referenceSchema.optional(),
    contact: backboneElementSchema
      .extend({
        purpose: codeableConceptSchema.optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
      })
      .array()
      .optional(),
    endpoint: referenceSchema.array().optional(),
  }),
)

export const organizationSchema =
  untypedOrganizationSchema

export class FhirOrganization extends FhirDomainResource<Organization> {
  // Static Functions

  public static parse(value: unknown): FhirOrganization {
    return new FhirOrganization(organizationSchema.parse(value))
  }
}
