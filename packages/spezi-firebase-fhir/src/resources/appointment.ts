//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { AppointmentParticipant, type Appointment } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

export const appointmentSchema: ZodType<Appointment> = untypedAppointmentSchema

export class FhirAppointment extends FhirDomainResource<Appointment> {
  // Static Functions

  public static parse(value: unknown): FhirAppointment {
    return new FhirAppointment(appointmentSchema.parse(value))
  }

  // Properties

  public get startDate(): Date | undefined {
    return this.value.start !== undefined ?
        new Date(this.value.start)
      : undefined
  }

  public set startDate(date: Date | undefined) {
    if (date !== undefined) {
      this.value.start = date.toISOString()
    } else {
      delete this.value.start
    }
  }

  public get endDate(): Date | undefined {
    return this.value.end !== undefined ? new Date(this.value.end) : undefined
  }

  public set endDate(date: Date | undefined) {
    if (date !== undefined) {
      this.value.end = date.toISOString()
    } else {
      delete this.value.end
    }
  }
}
