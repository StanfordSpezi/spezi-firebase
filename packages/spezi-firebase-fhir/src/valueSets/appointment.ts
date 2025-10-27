//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The free/busy status of an appointment.
 * http://hl7.org/fhir/valueset-appointmentstatus.html
 */
export const appointmentStatusSchema = z.enum([
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

/**
 * Is the Participant required to attend the appointment.
 * http://hl7.org/fhir/valueset-participantrequired.html
 */
export const appointmentParticipantRequiredSchema = z.enum([
  'required',
  'optional',
  'information-only',
])

export type AppointmentParticipantRequired = z.infer<
  typeof appointmentParticipantRequiredSchema
>

/**
 * Participation status of the appointment.
 * http://hl7.org/fhir/valueset-participationstatus.html
 */
export const appointmentParticipantStatusSchema = z.enum([
  'accepted',
  'declined',
  'tentative',
  'needs-action',
])

export type AppointmentParticipantStatus = z.infer<
  typeof appointmentParticipantStatusSchema
>
