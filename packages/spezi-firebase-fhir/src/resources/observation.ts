//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import {
  codeableConceptSchema,
  domainResourceSchema,
} from '../elements/index.js'
import { Observation } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

type _Assert = AssertOutput<typeof observationSchema, Observation>
type _AssertFull = AssertOutputFull<typeof observationSchema, Observation>

export const observationSchema = domainResourceSchema.extend({
  resourceType: z.literal('Observation'),
  status: z.enum([
    'registered',
    'preliminary',
    'final',
    'amended',
    'corrected',
    'cancelled',
    'entered-in-error',
    'unknown',
  ] as const),
  code: codeableConceptSchema,
})
