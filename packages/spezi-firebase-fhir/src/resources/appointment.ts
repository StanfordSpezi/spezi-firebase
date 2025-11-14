//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AppointmentParticipant,
  type Appointment,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
} from '../elements/index.js'
import {
  appointmentStatusSchema,
  appointmentParticipantRequiredSchema,
  appointmentParticipantStatusSchema,
} from '../valueSets/index.js'

const appointmentParticipantSchema: ZodType<AppointmentParticipant> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.array().optional(),
    period: periodSchema.optional(),
    actor: referenceSchema.optional(),
    required: appointmentParticipantRequiredSchema.optional(),
    status: appointmentParticipantStatusSchema,
    _status: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR Appointment resource (untyped version).
 */
export const untypedAppointmentSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Appointment').readonly(),
    identifier: identifierSchema.array().optional(),
    status: appointmentStatusSchema,
    _status: elementSchema.optional(),
    cancelationReason: codeableConceptSchema.optional(),
    serviceCategory: codeableConceptSchema.array().optional(),
    serviceType: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    appointmentType: codeableConceptSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    priority: unsignedIntSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    start: instantSchema.optional(),
    _start: elementSchema.optional(),
    end: instantSchema.optional(),
    _end: elementSchema.optional(),
    minutesDuration: intSchema.optional(),
    _minutesDuration: elementSchema.optional(),
    slot: referenceSchema.array().optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    patientInstruction: stringSchema.optional(),
    _patientInstruction: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    participant: appointmentParticipantSchema.array().min(1),
    requestPeriod: periodSchema.array().optional(),
  }),
) satisfies ZodType<Appointment>

/**
 * Zod schema for FHIR Appointment resource.
 */
export const appointmentSchema: ZodType<Appointment> = untypedAppointmentSchema

/**
 * Wrapper class for FHIR Appointment resources.
 * Provides utility methods for working with appointments and their dates.
 */
export class FhirAppointment extends FhirDomainResource<Appointment> {
  // Static Functions

  /**
   * Parses an Appointment resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirAppointment instance
   */
  public static parse(value: unknown): FhirAppointment {
    return new FhirAppointment(appointmentSchema.parse(value))
  }

  // Properties

  /**
   * Gets the appointment start date/time as a JavaScript Date object.
   *
   * @returns The start date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const startDate = appointment.startDate
   * if (startDate) {
   *   console.log(`Appointment starts at: ${startDate.toLocaleString()}`)
   * }
   * ```
   */
  public get startDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.start)
  }

  /**
   * Gets the appointment end date/time as a JavaScript Date object.
   *
   * @returns The end date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const endDate = appointment.endDate
   * if (endDate) {
   *   console.log(`Appointment ends at: ${endDate.toLocaleString()}`)
   * }
   * ```
   */
  public get endDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.end)
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
   * Calculates the duration of the appointment in milliseconds.
   *
   * @returns Duration in milliseconds if both start and end dates are available, undefined otherwise
   *
   * @example
   * ```typescript
   * const duration = appointment.getDurationInMilliseconds()
   * if (duration) {
   *   const minutes = duration / (1000 * 60)
   *   console.log(`Appointment duration: ${minutes} minutes`)
   * }
   * ```
   */
  public get duration(): number | undefined {
    const start = this.startDate
    const end = this.endDate
    if (start && end) {
      return end.getTime() - start.getTime()
    }
    return undefined
  }

  /**
   * Checks if the appointment is in the past relative to a given date.
   *
   * @param asOf - The reference date (defaults to now)
   * @returns True if the appointment end time is in the past, false otherwise
   *
   * @example
   * ```typescript
   * if (appointment.isPast()) {
   *   console.log('This appointment has already occurred')
   * }
   * ```
   */
  public isPast(asOf: Date = new Date()): boolean {
    const end = this.endDate ?? this.startDate
    return end !== undefined && end < asOf
  }

  /**
   * Checks if the appointment is upcoming relative to a given date.
   *
   * @param asOf - The reference date (defaults to now)
   * @returns True if the appointment start time is in the future, false otherwise
   *
   * @example
   * ```typescript
   * if (appointment.isUpcoming()) {
   *   console.log('This appointment is scheduled for the future')
   * }
   * ```
   */
  public isUpcoming(asOf: Date = new Date()): boolean {
    const start = this.startDate
    return start !== undefined && start > asOf
  }
}
