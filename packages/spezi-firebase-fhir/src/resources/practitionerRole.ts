//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type PractitionerRoleAvailableTime,
  type PractitionerRoleNotAvailable,
  type Coding,
  type PractitionerRole,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  booleanSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  contactPointSchema,
  stringSchema,
} from '../elements/index.js'
import { daysOfWeekSchema } from '../valueSets/index.js'

const practitionerRoleAvailableTimeSchema: ZodType<PractitionerRoleAvailableTime> =
  backboneElementSchema.extend({
    daysOfWeek: daysOfWeekSchema.array().optional(),
    allDay: booleanSchema.optional(),
    _allDay: elementSchema.optional(),
    availableStartTime: stringSchema.optional(),
    _availableStartTime: elementSchema.optional(),
    availableEndTime: stringSchema.optional(),
    _availableEndTime: elementSchema.optional(),
  })

const practitionerRoleNotAvailableSchema: ZodType<PractitionerRoleNotAvailable> =
  backboneElementSchema.extend({
    description: stringSchema,
    _description: elementSchema.optional(),
    during: periodSchema.optional(),
  })

/**
 * Zod schema for FHIR PractitionerRole resource (untyped version).
 */
export const untypedPractitionerRoleSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PractitionerRole').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    period: periodSchema.optional(),
    practitioner: referenceSchema.optional(),
    organization: referenceSchema.optional(),
    code: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    location: referenceSchema.array().optional(),
    healthcareService: referenceSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    availableTime: practitionerRoleAvailableTimeSchema.array().optional(),
    notAvailable: practitionerRoleNotAvailableSchema.array().optional(),
    availabilityExceptions: stringSchema.optional(),
    _availabilityExceptions: elementSchema.optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<PractitionerRole>

/**
 * Zod schema for FHIR PractitionerRole resource.
 */
export const practitionerRoleSchema: ZodType<PractitionerRole> =
  untypedPractitionerRoleSchema

/**
 * Wrapper class for FHIR PractitionerRole resources.
 * Provides utility methods for working with practitioner roles and healthcare provider assignments.
 */
export class FhirPractitionerRole extends FhirDomainResource<PractitionerRole> {
  // Static Functions

  /**
   * Parses a PractitionerRole resource from unknown data.
   *
   * @param value - The data to parse and validate against the PractitionerRole schema
   * @returns A FhirPractitionerRole instance containing the validated resource
   */
  public static parse(value: unknown): FhirPractitionerRole {
    return new FhirPractitionerRole(practitionerRoleSchema.parse(value))
  }

  /**
   * Get the period start date.
   * @returns The start date, or undefined if not set
   */
  public get periodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period?.start)
  }

  /**
   * Get the period end date.
   * @returns The end date, or undefined if not set
   */
  public get periodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period?.end)
  }

  /**
   * Check if the practitioner role is currently active.
   * @param asOfDate Optional date to check against (defaults to current date)
   * @returns True if currently within active period
   */
  public isCurrentlyActive(asOfDate?: Date): boolean {
    const periodActive = FhirDomainResource.periodIsActive(
      this.value.period,
      asOfDate,
    )
    return periodActive && (this.value.active ?? true)
  }

  /**
   * Get all role/code displays.
   * @returns Array of role display texts
   */
  public get roleDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.code)
  }

  /**
   * Get all specialty displays.
   * @returns Array of specialty display texts
   */
  public get specialtyDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.specialty)
  }

  /**
   * Get all phone numbers from telecom.
   * @returns Array of phone numbers
   */
  public get phoneNumbers(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'phone')
  }

  /**
   * Get all email addresses from telecom.
   * @returns Array of email addresses
   */
  public get emailAddresses(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'email')
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
