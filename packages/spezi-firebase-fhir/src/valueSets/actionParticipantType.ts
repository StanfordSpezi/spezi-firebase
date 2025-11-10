//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The type of participant for the action.
 * http://hl7.org/fhir/ValueSet/action-participant-type
 */
export const actionParticipantTypeSchema = z.enum([
  'patient',
  'practitioner',
  'related-person',
  'device',
])

export type ActionParticipantType = z.infer<typeof actionParticipantTypeSchema>
