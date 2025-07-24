//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Address } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { periodSchema } from './period.js'
import { stringSchema } from './primitiveTypes.js'
import { elementSchema } from '../element.js'

const addressTypeSchema = z.enum(['postal', 'physical', 'both'])
export type AddressType = z.infer<typeof addressTypeSchema>

const addressUseSchema = z.enum(['home', 'work', 'temp', 'old', 'billing'])
export type AddressUse = z.infer<typeof addressUseSchema>

export const addressSchema: ZodType<Address> = z.lazy(() =>
  elementSchema.extend({
    use: addressUseSchema.optional(),
    _use: elementSchema.optional(),
    type: addressTypeSchema.optional(),
    _type: elementSchema.optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    line: stringSchema.array().optional(),
    _line: elementSchema.array().optional(),
    city: stringSchema.optional(),
    _city: elementSchema.optional(),
    district: stringSchema.optional(),
    _district: elementSchema.optional(),
    state: stringSchema.optional(),
    _state: elementSchema.optional(),
    postalCode: stringSchema.optional(),
    _postalCode: elementSchema.optional(),
    country: stringSchema.optional(),
    _country: elementSchema.optional(),
    period: periodSchema.optional(),
  }),
)
