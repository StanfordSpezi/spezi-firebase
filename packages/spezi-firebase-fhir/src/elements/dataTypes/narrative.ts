//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Narrative } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { xhtmlSchema } from './primitiveTypes.js'
import { elementSchema } from '../element.js'

const narrativeStatusSchema = z.enum([
  'generated',
  'extensions',
  'additional',
  'empty',
])

/**
 * Zod schema for FHIR Narrative data type.
 */
export const narrativeSchema: ZodType<Narrative> = z.lazy(() =>
  elementSchema.extend({
    status: narrativeStatusSchema,
    _status: elementSchema.optional(),
    div: xhtmlSchema,
    _div: elementSchema.optional(),
  }),
)
