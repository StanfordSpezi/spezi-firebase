//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { domainResourceSchema } from '../elements/domainResource.js'

export enum ObservationStatus {
  registered = 'registered',
  preliminary = 'preliminary',
  final = 'final',
  amended = 'amended',
  corrected = 'corrected',
  cancelled = 'cancelled',
  enteredInError = 'entered-in-error',
  unknown = 'unknown',
}

export const observationSchema = domainResourceSchema.extend({
  resourceType: z.enum(['Observation']),
  status: z.nativeEnum(ObservationStatus),
})
