//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PersonLink, type Coding, type Person } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

const personLinkSchema: ZodType<PersonLink> = backboneElementSchema.extend({
  target: referenceSchema,
  assurance: identityAssuranceLevelSchema.optional(),
  _assurance: elementSchema.optional(),
})

/**
 * Zod schema for FHIR Person resource (untyped version).
 */
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
    link: personLinkSchema.array().optional(),
  }),
) satisfies ZodType<Person>

/**
 * Zod schema for FHIR Person resource.
 */
export const personSchema: ZodType<Person> = untypedPersonSchema

/**
 * Wrapper class for FHIR Person resources.
 * Provides convenience accessors for demographic details and identifiers.
 */
export class FhirPerson extends FhirDomainResource<Person> {
  /**
   * Parses a Person resource from unknown data.
   *
   * @param value - The data to parse and validate against the Person schema
   * @returns A FhirPerson instance containing the validated resource
   */
  public static parse(value: unknown): FhirPerson {
    return new FhirPerson(personSchema.parse(value))
  }

  /**
   * Gets the birth date of the person as a JavaScript Date object.
   *
   * @returns The birth date if available
   */
  public get birthDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.birthDate)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
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
}
