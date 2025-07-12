//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { elementSchema } from '../element.js'
import {
  base64BinarySchema,
  codeSchema,
  unsignedIntSchema,
  urlSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { z, ZodType } from 'zod/v4'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { Attachment } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const attachmentSchema: ZodType<Attachment> = z.lazy(() =>
  elementSchema.extend({
    contentType: codeSchema.optional(),
    language: codeSchema.optional(),
    data: base64BinarySchema.optional(),
    url: urlSchema.optional(),
    size: unsignedIntSchema.optional(),
    hash: base64BinarySchema.optional(),
    title: z.string().optional(),
    creation: dateTimeSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof attachmentSchema, Attachment>
type _AssertFull = AssertOutputFull<typeof attachmentSchema, Attachment>
