//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type AppointmentResponse } from 'fhir/r4b.js'
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
import { appointmentResponseParticipantStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR AppointmentResponse resource (untyped version).
 */
export const untypedAppointmentResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AppointmentResponse').readonly(),
    identifier: identifierSchema.array().optional(),
    appointment: referenceSchema,
    start: dateTimeSchema.optional(),
    _start: elementSchema.optional(),
    end: dateTimeSchema.optional(),
    _end: elementSchema.optional(),
    participantType: codeableConceptSchema.array().optional(),
    actor: referenceSchema.optional(),
    participantStatus: appointmentResponseParticipantStatusSchema,
    _participantStatus: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
  }),
) satisfies ZodType<AppointmentResponse>

/**
 * Zod schema for FHIR AppointmentResponse resource.
 */
export const appointmentResponseSchema: ZodType<AppointmentResponse> =
  untypedAppointmentResponseSchema

/**
 * Wrapper class for FHIR AppointmentResponse resources.
 * Provides utility methods for working with appointment response records.
 */
export class FhirAppointmentResponse extends FhirDomainResource<AppointmentResponse> {
  // Static Functions

  /**
   * Parses an AppointmentResponse resource from unknown data.
   *
   * @param value - The data to parse and validate against the AppointmentResponse schema
   * @returns A FhirAppointmentResponse instance containing the validated resource
   */
  public static parse(value: unknown): FhirAppointmentResponse {
    return new FhirAppointmentResponse(appointmentResponseSchema.parse(value))
  }

  // Properties

  /**
   * Gets the appointment response start date/time as a JavaScript Date object.
   *
   * @returns The start date if available
   */
  public get startDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.start)
  }

  /**
   * Gets the appointment response end date/time as a JavaScript Date object.
   *
   * @returns The end date if available
   */
  public get endDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.end)
  }

  /**
   * Gets the participant type displays.
   *
   * @returns Array of participant type display texts
   *
   * @example
   * ```typescript
   * const types = response.getParticipantTypeDisplays()
   * console.log(`Participant types: ${types.join(', ')}`)
   * ```
   */
  public get participantTypeDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.participantType,
    )
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
