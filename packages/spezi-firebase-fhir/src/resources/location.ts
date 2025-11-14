//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type LocationHoursOfOperation,
  type LocationPosition,
  type Coding,
  type Location,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  addressSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactPointSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
  timeSchema,
} from '../elements/index.js'
import {
  daysOfWeekSchema,
  locationModeSchema,
  locationStatusSchema,
} from '../valueSets/index.js'

const locationPositionSchema: ZodType<LocationPosition> =
  backboneElementSchema.extend({
    longitude: decimalSchema,
    latitude: decimalSchema,
    altitude: decimalSchema.optional(),
  })

const locationHoursOfOperationSchema: ZodType<LocationHoursOfOperation> =
  backboneElementSchema.extend({
    daysOfWeek: daysOfWeekSchema.array().optional(),
    _daysOfWeek: elementSchema.array().optional(),
    allDay: booleanSchema.optional(),
    openingTime: timeSchema.optional(),
    _openingTime: elementSchema.optional(),
    closingTime: timeSchema.optional(),
    _closingTime: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR Location resource (untyped version).
 */
export const untypedLocationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Location').readonly(),
    identifier: identifierSchema.array().optional(),
    status: locationStatusSchema.optional(),
    _status: elementSchema.optional(),
    operationalStatus: codingSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    alias: stringSchema.array().optional(),
    _alias: elementSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    mode: locationModeSchema.optional(),
    _mode: elementSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    address: addressSchema.optional(),
    physicalType: codeableConceptSchema.optional(),
    position: locationPositionSchema.optional(),
    managingOrganization: referenceSchema.optional(),
    partOf: referenceSchema.optional(),
    hoursOfOperation: locationHoursOfOperationSchema.array().optional(),
    availabilityExceptions: stringSchema.optional(),
    _availabilityExceptions: elementSchema.optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Location>

/**
 * Zod schema for FHIR Location resource.
 */
export const locationSchema: ZodType<Location> = untypedLocationSchema

/**
 * Wrapper class for FHIR Location resources.
 * Provides utility methods for working with locations.
 */
export class FhirLocation extends FhirDomainResource<Location> {
  // Static Functions

  /**
   * Parses a Location resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirLocation instance
   */
  public static parse(value: unknown): FhirLocation {
    return new FhirLocation(locationSchema.parse(value))
  }

  // Properties

  /**
   * Gets the type display text.
   *
   * @returns Array of type display texts
   */
  public get typeDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.type)
  }

  /**
   * Gets all phone numbers for the location.
   *
   * @returns Array of phone numbers
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
