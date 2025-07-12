//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { Narrative } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

const narrativeStatus = [
  'generated',
  'extensions',
  'additional',
  'empty',
] as const

export const narrativeSchema: ZodType<Narrative> = z.lazy(() =>
  elementSchema.extend({
    status: z.enum(narrativeStatus),
    div: z.string(), // TODO: technically this is xhtml
  }),
)

type _Assert = AssertOutput<typeof narrativeSchema, Narrative>
type _AssertFull = AssertOutputFull<typeof narrativeSchema, Narrative>
