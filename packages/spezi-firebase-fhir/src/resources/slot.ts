//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Slot } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { slotStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR Slot resource (untyped version).
 */
export const untypedSlotSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Slot').readonly(),
    identifier: identifierSchema.array().optional(),
    serviceCategory: codeableConceptSchema.array().optional(),
    serviceType: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    appointmentType: codeableConceptSchema.optional(),
    schedule: referenceSchema,
    status: slotStatusSchema,
    _status: elementSchema.optional(),
    start: dateTimeSchema,
    _start: elementSchema.optional(),
    end: dateTimeSchema,
    _end: elementSchema.optional(),
    overbooked: z.boolean().optional(),
    _overbooked: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
  }),
) satisfies ZodType<Slot>

/**
 * Zod schema for FHIR Slot resource.
 */
export const slotSchema: ZodType<Slot> = untypedSlotSchema

/**
 * Wrapper class for FHIR Slot resources.
 * Provides convenience accessors for temporal calculations and specialty display extraction.
 */
export class FhirSlot extends FhirDomainResource<Slot> {
  // Static Functions

  /**
   * Parses a Slot resource from unknown data.
   *
   * @param value - The data to parse and validate against the Slot schema
   * @returns A FhirSlot instance containing the validated resource
   */
  public static parse(value: unknown): FhirSlot {
    return new FhirSlot(slotSchema.parse(value))
  }

  /**
   * Gets the slot start date/time as a JavaScript Date object.
   *
   * @returns The start date
   *
   * @example
   * ```typescript
   * const start = slot.startDate
   * console.log(`Slot starts at: ${start.toLocaleString()}`)
   * ```
   */
  public get startDate(): Date {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return FhirDomainResource.parseDateTime(this.value.start)!
  }

  /**
   * Gets the slot end date/time as a JavaScript Date object.
   *
   * @returns The end date
   *
   * @example
   * ```typescript
   * const end = slot.endDate
   * console.log(`Slot ends at: ${end.toLocaleString()}`)
   * ```
   */
  public get endDate(): Date {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return FhirDomainResource.parseDateTime(this.value.end)!
  }

  /**
   * Calculates the duration of the slot in milliseconds.
   *
   * @returns Duration in milliseconds
   *
   * @example
   * ```typescript
   * const minutes = slot.duration / (1000 * 60)
   * console.log(`Slot duration: ${minutes} minutes`)
   * ```
   */
  public get duration(): number {
    return this.endDate.getTime() - this.startDate.getTime()
  }

  /**
   * Checks if the slot is in the past relative to a given date.
   *
   * @param asOfDate - The reference date (defaults to now)
   * @returns True if the slot end time is in the past, false otherwise
   *
   * @example
   * ```typescript
   * if (slot.isPast()) {
   *   console.log('This slot has already passed')
   * }
   * ```
   */
  public isPast(asOfDate: Date = new Date()): boolean {
    return this.endDate < asOfDate
  }

  /**
   * Gets all specialty displays for the slot.
   *
   * @returns Array of specialty display texts
   *
   * @example
   * ```typescript
   * const specialties = slot.getSpecialtyDisplays()
   * console.log(`Specialties: ${specialties.join(', ')}`)
   * ```
   */
  public get specialtyDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.specialty)
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
}
