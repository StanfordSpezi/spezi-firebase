//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { Address } from 'fhir/r4b.js'
import { periodSchema } from './period.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

const addressType = ['postal', 'physical', 'both'] as const
const addressUse = ['home', 'work', 'temp', 'old', 'billing'] as const

export const addressSchema: ZodType<Address> = z.lazy(() =>
  elementSchema.extend({
    use: z.enum(addressUse).optional(),
    type: z.enum(addressType).optional(),
    text: z.string().optional(),
    line: z.string().array().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    period: periodSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof addressSchema, Address>
type _AssertFull = AssertOutputFull<typeof addressSchema, Address>
