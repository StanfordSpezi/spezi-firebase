//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { urlSchema } from './primitiveTypes/primitiveTypes.js'
import { Extension } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { attachmentSchema } from './dataTypes/attachment.js'
import { codingSchema } from './dataTypes/coding.js'
import { referenceSchema } from './dataTypes/reference.js'
import { quantitySchema } from './dataTypes/quantity.js'

export const extensionSchema: ZodType<Extension> = z.object({
  url: urlSchema,
  valueString: z.string().optional(),
  valueBoolean: z.boolean().optional(),
  valueInteger: z.number().int().optional(),
  valueDecimal: z.number().optional(),
  valueDate: z.string().optional(),
  valueDateTime: z.string().optional(),
  valueTime: z.string().optional(),
  valueCode: z.string().optional(),
  valueUri: z.string().optional(),
  valueBase64Binary: z.string().optional(),
  /*
  get valueAttachment() {
    return attachmentSchema.optional()
  },
  get valueCoding() {
    return codingSchema.optional()
  },
  get valueReference() {
    return referenceSchema.optional()
  },
  get valueQuantity() {
    return quantitySchema.optional()
  },
  */
})

type _Assert = AssertOutput<typeof extensionSchema, Extension>
type _AssertFull = AssertOutputFull<typeof extensionSchema, Extension>
