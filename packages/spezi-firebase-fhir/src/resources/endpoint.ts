//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Endpoint } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Zod schema for FHIR Endpoint resource (untyped version).
 */
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
) satisfies ZodType<Endpoint>

/**
 * Zod schema for FHIR Endpoint resource.
 */
export const endpointSchema: ZodType<Endpoint> = untypedEndpointSchema

/**
 * Wrapper class for FHIR Endpoint resources.
 * Provides utility methods for working with technical endpoints and connectivity details.
 */
export class FhirEndpoint extends FhirDomainResource<Endpoint> {
  // Static Functions

  /**
   * Parses an Endpoint resource from unknown data.
   *
   * @param value - The data to parse and validate against the Endpoint schema
   * @returns A FhirEndpoint instance containing the validated resource
   */
  public static parse(value: unknown): FhirEndpoint {
    return new FhirEndpoint(endpointSchema.parse(value))
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
