//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Observation } from 'fhir/r4b.js'
import { z, ZodType } from 'zod/v4'
import {
  codeableConceptSchema,
  domainResourceSchema,
} from '../elements/index.js'

const observationStatus = [
  'registered',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'cancelled',
  'entered-in-error',
  'unknown',
] as const

export const observationSchema: ZodType<Observation> =
  domainResourceSchema.extend({
    resourceType: z.literal('Observation'),
    status: z.enum(observationStatus),
    code: codeableConceptSchema,
  })
