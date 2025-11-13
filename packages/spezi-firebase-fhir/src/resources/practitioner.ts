//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type PractitionerQualification,
  type Coding,
  type Practitioner,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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
import { administrativeGenderSchema } from '../valueSets/index.js'

const practitionerQualificationSchema: ZodType<PractitionerQualification> =
  backboneElementSchema.extend({
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema,
    period: periodSchema.optional(),
    issuer: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR Practitioner resource (untyped version).
 */
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
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    address: addressSchema.array().optional(),
    photo: attachmentSchema.array().optional(),
    qualification: practitionerQualificationSchema.array().optional(),
    communication: codeableConceptSchema.array().optional(),
  }),
) satisfies ZodType<Practitioner>

/**
 * Zod schema for FHIR Practitioner resource.
 */
export const practitionerSchema: ZodType<Practitioner> =
  untypedPractitionerSchema

/**
 * Wrapper class for FHIR Practitioner resources.
 * Provides utility methods for working with practitioners.
 */
export class FhirPractitioner extends FhirDomainResource<Practitioner> {
  // Static Functions

  /**
   * Parses a Practitioner resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirPractitioner instance
   */
  public static parse(value: unknown): FhirPractitioner {
    return new FhirPractitioner(practitionerSchema.parse(value))
  }

  // Properties

  /**
   * Gets the practitioner's birth date as a JavaScript Date object.
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
   * @returns Array of identifier values matching any provided Coding
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
   * Gets all phone numbers for the practitioner.
   *
   * @returns Array of phone numbers
   */
  public get phoneNumbers(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'phone')
  }

  /**
   * Gets all email addresses for the practitioner.
   *
   * @returns Array of email addresses
   */
  public get emailAddresses(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'email')
  }
}
