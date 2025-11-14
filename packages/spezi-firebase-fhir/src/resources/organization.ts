//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type OrganizationContact,
  type Coding,
  type Organization,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

const organizationContactSchema: ZodType<OrganizationContact> =
  backboneElementSchema.extend({
    purpose: codeableConceptSchema.optional(),
    name: humanNameSchema.optional(),
    telecom: contactPointSchema.array().optional(),
    address: addressSchema.optional(),
  })

/**
 * Zod schema for FHIR Organization resource (untyped version).
 */
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
    contact: organizationContactSchema.array().optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Organization>

/**
 * Zod schema for FHIR Organization resource.
 */
export const organizationSchema: ZodType<Organization> =
  untypedOrganizationSchema

/**
 * Wrapper class for FHIR Organization resources.
 * Provides utility methods for working with organizations.
 */
export class FhirOrganization extends FhirDomainResource<Organization> {
  // Static Functions

  /**
   * Parses an Organization resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirOrganization instance
   */
  public static parse(value: unknown): FhirOrganization {
    return new FhirOrganization(organizationSchema.parse(value))
  }

  // Properties

  /**
   * Gets identifiers by system.
   *
   * @param system - The system URL to filter by
   * @returns Array of identifier values matching the system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided type
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
  /**
   * Gets human-readable display strings for all organization type CodeableConcepts.
   *
   * @returns Array of type display texts
   */
  public get typeDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.type)
  }

  /**
   * Gets all phone numbers for the organization.
   *
   * @returns Array of phone numbers
   */
  public get phoneNumbers(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'phone')
  }

  /**
   * Gets all email addresses for the organization.
   *
   * @returns Array of email addresses
   */
  public get emailAddresses(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'email')
  }
}
