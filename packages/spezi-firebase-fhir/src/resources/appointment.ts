//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Appointment } from 'fhir/r4b.js'
import { z, ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  periodSchema,
  referenceSchema,
  unsignedIntSchema,
} from '../elements/index.js'

export const appointmentStatus = [
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
] as const

export const appointmentSchema: ZodType<Appointment> = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Appointment').readonly(),
    identifier: identifierSchema.array().optional(),
    status: z.enum(appointmentStatus),
    _status: elementSchema.optional(),
    cancelationReason: codeableConceptSchema.optional(),
    serviceCategory: codeableConceptSchema.array().optional(),
    serviceType: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    appointmentType: codeableConceptSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    priority: unsignedIntSchema.optional(),
    description: z.string().optional(),
    _description: elementSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    start: instantSchema.optional(),
    _start: elementSchema.optional(),
    end: instantSchema.optional(),
    _end: elementSchema.optional(),
    minutesDuration: z.number().int().optional(),
    _minutesDuration: elementSchema.optional(),
    slot: referenceSchema.array().optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    comment: z.string().optional(),
    _comment: elementSchema.optional(),
    patientInstruction: z.string().optional(),
    _patientInstruction: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    participant: backboneElementSchema
      .extend({
        type: codeableConceptSchema.array().optional(),
        period: periodSchema.optional(),
        actor: referenceSchema.optional(),
        required: z
          .enum(['required', 'optional', 'information-only'])
          .optional(),
        status: z.enum(['accepted', 'declined', 'tentative', 'needs-action']),
        _status: elementSchema.optional(),
      })
      .array()
      .min(1),
    requestPeriod: periodSchema.array().optional(),
  }),
)
