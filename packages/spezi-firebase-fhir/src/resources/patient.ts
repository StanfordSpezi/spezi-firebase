//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Patient, type ContactPoint, type Coding } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  addressSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  intSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import {
  administrativeGenderSchema,
  patientLinkTypeSchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR Patient resource (untyped version).
 */
export const untypedPatientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Patient').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    name: humanNameSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    deceasedBoolean: booleanSchema.optional(),
    _deceasedBoolean: elementSchema.optional(),
    deceasedDateTime: dateTimeSchema.optional(),
    _deceasedDateTime: elementSchema.optional(),
    address: addressSchema.array().optional(),
    maritalStatus: codeableConceptSchema.optional(),
    multipleBirthBoolean: booleanSchema.optional(),
    _multipleBirthBoolean: elementSchema.optional(),
    multipleBirthInteger: intSchema.optional(),
    _multipleBirthInteger: elementSchema.optional(),
    photo: attachmentSchema.array().optional(),
    contact: backboneElementSchema
      .extend({
        relationship: codeableConceptSchema.array().optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
        gender: administrativeGenderSchema.optional(),
        _gender: elementSchema.optional(),
        organization: referenceSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    communication: backboneElementSchema
      .extend({
        language: codeableConceptSchema,
        preferred: booleanSchema.optional(),
        _preferred: elementSchema.optional(),
      })
      .array()
      .optional(),
    generalPractitioner: referenceSchema.array().optional(),
    managingOrganization: referenceSchema.optional(),
    link: backboneElementSchema
      .extend({
        other: referenceSchema,
        type: patientLinkTypeSchema,
        _type: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Patient>

/**
 * Zod schema for FHIR Patient resource.
 */
export const patientSchema: ZodType<Patient> = untypedPatientSchema

/**
 * Wrapper class for FHIR Patient resources.
 * Provides utility methods for working with patient demographics and identifiers.
 */
export class FhirPatient extends FhirDomainResource<Patient> {
  // Static Functions

  /**
   * Parses a Patient resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirPatient instance
   */
  public static parse(value: unknown): FhirPatient {
    return new FhirPatient(patientSchema.parse(value))
  }

  // Properties

  /**
   * Gets the patient's birth date as a JavaScript Date object.
   *
   * @returns The birth date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const birthDate = patient.birthDate
   * if (birthDate) {
   *   const age = new Date().getFullYear() - birthDate.getFullYear()
   * }
   * ```
   */
  public get birthDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.birthDate)
  }

  /**
   * Gets the patient's deceased date as a JavaScript Date object (if deceased by date).
   *
   * @returns The deceased date if available, undefined otherwise
   */
  public get deceasedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.deceasedDateTime)
  }

  /**
   * Checks if the patient is deceased (either by boolean flag or date).
   *
   * @returns true if the patient is marked as deceased
   *
   * @example
   * ```typescript
   * if (patient.isDeceased) {
   *   console.log('Patient is deceased')
   * }
   * ```
   */
  public get isDeceased(): boolean {
    return (
      this.value.deceasedBoolean === true ||
      this.value.deceasedDateTime !== undefined
    )
  }

  /**
   * Gets all identifiers with a specific system.
   * Uses the generic FhirDomainResource method.
   *
   * @param system - The system URL to filter by
   * @returns Array of identifier values matching the system
   *
   * @example
   * ```typescript
   * const mrns = patient.getIdentifiersBySystem('http://hospital.org/mrn')
   * ```
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
   * Gets all phone numbers for the patient.
   *
   * @returns Array of phone numbers
   */
  public get phoneNumbers(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'phone')
  }

  /**
   * Gets all email addresses for the patient.
   *
   * @returns Array of email addresses
   */
  public get emailAddresses(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'email')
  }

  /**
   * Gets a phone number by use (e.g., 'home', 'work', 'mobile').
   *
   * @param use - The use type to filter by
   * @returns The phone number if found
   */
  public phoneNumberByUse(use: ContactPoint['use']): string | undefined {
    return FhirDomainResource.contactPointBySystem(
      this.value.telecom,
      'phone',
      use,
    )
  }

  /**
   * Calculates the patient's age in years based on birth date.
   *
   * @param asOfDate - Date to calculate age as of (defaults to today)
   * @returns Age in years, or undefined if no birth date
   *
   * @example
   * ```typescript
   * const age = patient.calculateAge() // 34
   * ```
   */
  public ageInYears(asOfDate: Date = new Date()): number | undefined {
    const birth = this.birthDate
    if (!birth) return undefined

    let age = asOfDate.getFullYear() - birth.getFullYear()
    const monthDiff = asOfDate.getMonth() - birth.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && asOfDate.getDate() < birth.getDate())
    ) {
      age--
    }

    return age
  }

  /**
   * Gets the patient's marital status display text.
   *
   * @returns Marital status display or undefined
   */
  public get maritalStatusDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.maritalStatus)
  }
}
