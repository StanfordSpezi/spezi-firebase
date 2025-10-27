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

/**
 * Is the participant required to attend the appointment.
 */
export const appointmentParticipantRequiredSchema = z.enum([
  'required',
  'optional',
  'information-only',
])

/**
 * The Participation status of an appointment.
 */
export const appointmentParticipantStatusSchema = z.enum([
  'accepted',
  'declined',
  'tentative',
  'needs-action',
])
