//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Narrative } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'

const narrativeStatus = [
  'generated',
  'extensions',
  'additional',
  'empty',
] as const

export const narrativeSchema: ZodType<Narrative> = z.lazy(() =>
  elementSchema.extend({
    status: z.enum(narrativeStatus),
    _status: elementSchema.optional(),
    div: z.string(), // TODO: technically this is xhtml
    _div: elementSchema.optional(),
  }),
)
