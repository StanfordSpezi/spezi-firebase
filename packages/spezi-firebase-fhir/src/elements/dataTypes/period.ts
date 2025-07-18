//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Period } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const periodSchema: ZodType<Period> = z.lazy(() =>
  elementSchema.extend({
    start: dateTimeSchema.optional(),
    _start: elementSchema.optional(),
    end: dateTimeSchema.optional(),
    _end: elementSchema.optional(),
  }),
)
