//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Participation status of the appointment.
 * http://hl7.org/fhir/valueset-participationstatus.html
 */
export const appointmentResponseParticipantStatusSchema = z.enum([
  'accepted',
  'declined',
  'tentative',
  'needs-action',
])

/**
 * Participation status of the appointment.
 * http://hl7.org/fhir/valueset-participationstatus.html
 */
export type AppointmentResponseParticipantStatus = z.infer<
  typeof appointmentResponseParticipantStatusSchema
>
