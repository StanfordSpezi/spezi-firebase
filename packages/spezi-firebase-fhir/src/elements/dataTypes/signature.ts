//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Signature } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { codingSchema } from './coding.js'
import {
  base64BinarySchema,
  codeSchema,
  instantSchema,
} from './primitiveTypes.js'
import { referenceSchema } from './reference.js'
import { elementSchema } from '../element.js'

export const signatureSchema: ZodType<Signature> = z.lazy(() =>
  elementSchema.extend({
    type: codingSchema.array().min(1),
    _type: elementSchema.optional(),
    when: instantSchema,
    _when: elementSchema.optional(),
    who: referenceSchema,
    onBehalfOf: referenceSchema.optional(),
    targetFormat: codeSchema.optional(),
    _targetFormat: elementSchema.optional(),
    sigFormat: codeSchema.optional(),
    _sigFormat: elementSchema.optional(),
    data: base64BinarySchema.optional(),
    _data: elementSchema.optional(),
  }),
)
