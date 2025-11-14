//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Schedule } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

/**
 * Zod schema for FHIR Schedule resource (untyped version).
 */
export const untypedScheduleSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Schedule').readonly(),
    identifier: identifierSchema.array().optional(),
    active: z.boolean().optional(),
    _active: elementSchema.optional(),
    serviceCategory: codeableConceptSchema.array().optional(),
    serviceType: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    actor: referenceSchema.array(),
    planningHorizon: periodSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
  }),
) satisfies ZodType<Schedule>

/**
 * Zod schema for FHIR Schedule resource.
 */
export const scheduleSchema: ZodType<Schedule> = untypedScheduleSchema

/**
 * Wrapper class for FHIR Schedule resources.
 * Provides utility methods for working with schedules and availability information.
 */
export class FhirSchedule extends FhirDomainResource<Schedule> {
  // Static Functions

  /**
   * Parses a Schedule resource from unknown data.
   *
   * @param value - The data to parse and validate against the Schedule schema
   * @returns A FhirSchedule instance containing the validated resource
   */
  public static parse(value: unknown): FhirSchedule {
    return new FhirSchedule(scheduleSchema.parse(value))
  }

  /**
   * Gets the planning horizon start date as a JavaScript Date object.
   *
   * @returns The planning horizon start date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const start = schedule.planningHorizonStart
   * console.log(`Planning starts: ${start?.toLocaleDateString()}`)
   * ```
   */
  public get planningHorizonStartDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.planningHorizon?.start)
  }

  /**
   * Gets the planning horizon end date as a JavaScript Date object.
   *
   * @returns The planning horizon end date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const end = schedule.planningHorizonEnd
   * console.log(`Planning ends: ${end?.toLocaleDateString()}`)
   * ```
   */
  public get planningHorizonEndDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.planningHorizon?.end)
  }

  /**
   * Gets all service category displays.
   *
   * @returns Array of service category display texts
   *
   * @example
   * ```typescript
   * const categories = schedule.getServiceCategoryDisplays()
   * console.log(`Categories: ${categories.join(', ')}`)
   * ```
   */
  public get serviceCategoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.serviceCategory,
    )
  }

  /**
   * Gets all specialty displays.
   *
   * @returns Array of specialty display texts
   *
   * @example
   * ```typescript
   * const specialties = schedule.getSpecialtyDisplays()
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
