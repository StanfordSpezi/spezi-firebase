//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Appointment } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
} from '../elements/index.js'

const appointmentStatusSchema = z.enum([
  'proposed',
  'pending',
  'booked',
  'arrived',
  'fulfilled',
  'cancelled',
  'noshow',
  'entered-in-error',
  'checked-in',
  'waitlist',
])
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>

const appointmentParticipantRequiredSchema = z.enum([
  'required',
  'optional',
  'information-only',
])
export type AppointmentParticipantRequired = z.infer<
  typeof appointmentParticipantRequiredSchema
>

const appointmentParticipantStatusSchema = z.enum([
  'accepted',
  'declined',
  'tentative',
  'needs-action',
])
export type AppointmentParticipantStatus = z.infer<
  typeof appointmentParticipantStatusSchema
>

export const appointmentSchema = z.lazy(() =>
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
    participant: backboneElementSchema
      .extend({
        type: codeableConceptSchema.array().optional(),
        period: periodSchema.optional(),
        actor: referenceSchema.optional(),
        required: appointmentParticipantRequiredSchema.optional(),
        status: appointmentParticipantStatusSchema,
        _status: elementSchema.optional(),
      })
      .array()
      .min(1),
    requestPeriod: periodSchema.array().optional(),
  }),
) satisfies ZodType<Appointment>
