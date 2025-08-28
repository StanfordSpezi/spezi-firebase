//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Period } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { dateTimeSchema } from './primitiveTypes.js'
import { elementSchema } from '../element.js'

export const periodSchema: ZodType<Period> = z.lazy(() =>
  elementSchema.extend({
    start: dateTimeSchema.optional(),
    _start: elementSchema.optional(),
    end: dateTimeSchema.optional(),
    _end: elementSchema.optional(),
  }),
)
