//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Endpoint } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  codeableConceptSchema,
  codingSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  urlSchema,
} from '../elements/index.js'
import { endpointStatusSchema } from '../valueSets/index.js'

export const untypedEndpointSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Endpoint').readonly(),
    identifier: identifierSchema.array().optional(),
    status: endpointStatusSchema,
    _status: elementSchema.optional(),
    connectionType: codingSchema,
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    managingOrganization: referenceSchema.optional(),
    contact: contactPointSchema.array().optional(),
    period: periodSchema.optional(),
    payloadType: codeableConceptSchema.array(),
    payloadMimeType: stringSchema.array().optional(),
    _payloadMimeType: elementSchema.array().optional(),
    address: urlSchema,
    _address: elementSchema.optional(),
    header: stringSchema.array().optional(),
    _header: elementSchema.array().optional(),
  }),
)

export const endpointSchema= untypedEndpointSchema

export class FhirEndpoint extends FhirDomainResource<Endpoint> {
  // Static Functions

  public static parse(value: unknown): FhirEndpoint {
    return new FhirEndpoint(endpointSchema.parse(value))
  }
}
