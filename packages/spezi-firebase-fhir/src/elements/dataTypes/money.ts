//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Money } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { codeSchema, decimalSchema } from './primitiveTypes.js'
import { elementSchema } from '../element.js'

/**
 * Zod schema for FHIR Money data type.
 */
export const moneySchema: ZodType<Money> = z.lazy(() =>
  elementSchema.extend({
    value: decimalSchema.optional(),
    currency: codeSchema.optional(),
    _currency: elementSchema.optional(),
  }),
)
