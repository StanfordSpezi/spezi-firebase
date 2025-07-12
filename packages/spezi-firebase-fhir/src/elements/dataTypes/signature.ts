//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { elementSchema } from '../element.js'
import {
  base64BinarySchema,
  codeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { referenceSchema } from './reference.js'
import { instantSchema } from '../primitiveTypes/instant.js'
import { codingSchema } from './coding.js'
import { Signature } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { z, ZodType } from 'zod/v4'

export const signatureSchema: ZodType<Signature> = z.lazy(() =>
  elementSchema.extend({
    type: codingSchema.array(), // TODO: .min(1)
    when: instantSchema,
    who: referenceSchema,
    onBehalfOf: referenceSchema.optional(),
    targetFormat: codeSchema.optional(),
    sigFormat: codeSchema.optional(),
    data: base64BinarySchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof signatureSchema, Signature>
type _AssertFull = AssertOutputFull<typeof signatureSchema, Signature>
