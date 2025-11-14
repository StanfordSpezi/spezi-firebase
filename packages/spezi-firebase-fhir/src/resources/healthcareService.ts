//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type HealthcareService } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { daysOfWeekSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR HealthcareService resource (untyped version).
 */
export const untypedHealthcareServiceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('HealthcareService').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    providedBy: referenceSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    type: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    location: referenceSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    extraDetails: markdownSchema.optional(),
    _extraDetails: elementSchema.optional(),
    photo: attachmentSchema.optional(),
    telecom: contactPointSchema.array().optional(),
    coverageArea: referenceSchema.array().optional(),
    serviceProvisionCode: codeableConceptSchema.array().optional(),
    eligibility: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        comment: stringSchema.optional(),
        _comment: elementSchema.optional(),
      })
      .array()
      .optional(),
    program: codeableConceptSchema.array().optional(),
    characteristic: codeableConceptSchema.array().optional(),
    communication: codeableConceptSchema.array().optional(),
    referralMethod: codeableConceptSchema.array().optional(),
    appointmentRequired: booleanSchema.optional(),
    _appointmentRequired: elementSchema.optional(),
    availableTime: backboneElementSchema
      .extend({
        daysOfWeek: daysOfWeekSchema.array().optional(),
        _daysOfWeek: elementSchema.array().optional(),
        allDay: booleanSchema.optional(),
        _allDay: elementSchema.optional(),
        availableStartTime: stringSchema.optional(),
        _availableStartTime: elementSchema.optional(),
        availableEndTime: stringSchema.optional(),
        _availableEndTime: elementSchema.optional(),
      })
      .array()
      .optional(),
    notAvailable: backboneElementSchema
      .extend({
        description: stringSchema,
        _description: elementSchema.optional(),
        during: periodSchema.optional(),
      })
      .array()
      .optional(),
    availabilityExceptions: stringSchema.optional(),
    _availabilityExceptions: elementSchema.optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<HealthcareService>

/**
 * Zod schema for FHIR HealthcareService resource.
 */
export const healthcareServiceSchema: ZodType<HealthcareService> =
  untypedHealthcareServiceSchema

/**
 * Wrapper class for FHIR HealthcareService resources.
 * Provides utility methods for working with healthcare services and their properties.
 */
export class FhirHealthcareService extends FhirDomainResource<HealthcareService> {
  // Static Functions

  /**
   * Parses a HealthcareService resource from unknown data.
   *
   * @param value - The data to parse and validate against the HealthcareService schema
   * @returns A FhirHealthcareService instance containing the validated resource
   */
  public static parse(value: unknown): FhirHealthcareService {
    return new FhirHealthcareService(healthcareServiceSchema.parse(value))
  }

  /**
   * Gets all category displays for the service.
   *
   * @returns Array of category display texts
   *
   * @example
   * ```typescript
   * const categories = service.getCategoryDisplays()
   * console.log(`Categories: ${categories.join(', ')}`)
   * ```
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
  }

  /**
   * Gets all service type displays.
   *
   * @returns Array of service type display texts
   *
   * @example
   * ```typescript
   * const types = service.getServiceTypeDisplays()
   * console.log(`Service types: ${types.join(', ')}`)
   * ```
   */
  public get serviceTypeDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.type)
  }

  /**
   * Gets all specialty displays for the service.
   *
   * @returns Array of specialty display texts
   *
   * @example
   * ```typescript
   * const specialties = service.getSpecialtyDisplays()
   * console.log(`Specialties: ${specialties.join(', ')}`)
   * ```
   */
  public get specialtyDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.specialty)
  }

  /**
   * Gets all phone numbers for the service.
   *
   * @returns Array of phone number strings
   *
   * @example
   * ```typescript
   * const phones = service.getAllPhones()
   * phones.forEach(phone => console.log(phone))
   * ```
   */
  public get phoneNumbers(): string[] {
    return FhirDomainResource.contactPointsBySystem(this.value.telecom, 'phone')
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
