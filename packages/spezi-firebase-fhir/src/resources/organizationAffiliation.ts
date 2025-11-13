//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type OrganizationAffiliation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'

/**
 * Zod schema for FHIR OrganizationAffiliation resource (untyped version).
 */
export const untypedOrganizationAffiliationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OrganizationAffiliation').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    period: periodSchema.optional(),
    organization: referenceSchema.optional(),
    participatingOrganization: referenceSchema.optional(),
    network: referenceSchema.array().optional(),
    code: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    location: referenceSchema.array().optional(),
    healthcareService: referenceSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<OrganizationAffiliation>

/**
 * Zod schema for FHIR OrganizationAffiliation resource.
 */
export const organizationAffiliationSchema: ZodType<OrganizationAffiliation> =
  untypedOrganizationAffiliationSchema

/**
 * Wrapper class for FHIR OrganizationAffiliation resources.
 * Provides utility methods for working with organization affiliations and relationships.
 */
export class FhirOrganizationAffiliation extends FhirDomainResource<OrganizationAffiliation> {
  // Static Functions

  /**
   * Parses an OrganizationAffiliation resource from unknown data.
   *
   * @param value - The data to parse and validate against the OrganizationAffiliation schema
   * @returns A FhirOrganizationAffiliation instance containing the validated resource
   */
  public static parse(value: unknown): FhirOrganizationAffiliation {
    return new FhirOrganizationAffiliation(
      organizationAffiliationSchema.parse(value),
    )
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
