//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type AppointmentResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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
)

export const appointmentResponseSchema: ZodType<AppointmentResponse> =
  untypedAppointmentResponseSchema

export class FhirAppointmentResponse extends FhirDomainResource<AppointmentResponse> {
  // Static Functions

  public static parse(value: unknown): FhirAppointmentResponse {
    return new FhirAppointmentResponse(appointmentResponseSchema.parse(value))
  }
}
