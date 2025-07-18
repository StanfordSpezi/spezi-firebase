//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Address } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { periodSchema } from './period.js'
import { elementSchema } from '../element.js'

const addressType = ['postal', 'physical', 'both'] as const
const addressUse = ['home', 'work', 'temp', 'old', 'billing'] as const

export const addressSchema: ZodType<Address> = z.lazy(() =>
  elementSchema.extend({
    use: z.enum(addressUse).optional(),
    _use: elementSchema.optional(),
    type: z.enum(addressType).optional(),
    _type: elementSchema.optional(),
    text: z.string().optional(),
    _text: elementSchema.optional(),
    line: z.string().array().optional(),
    _line: elementSchema.array().optional(),
    city: z.string().optional(),
    _city: elementSchema.optional(),
    district: z.string().optional(),
    _district: elementSchema.optional(),
    state: z.string().optional(),
    _state: elementSchema.optional(),
    postalCode: z.string().optional(),
    _postalCode: elementSchema.optional(),
    country: z.string().optional(),
    _country: elementSchema.optional(),
    period: periodSchema.optional(),
  }),
)
