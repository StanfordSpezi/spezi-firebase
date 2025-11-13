//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Attachment } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  base64BinarySchema,
  codeSchema,
  dateTimeSchema,
  stringSchema,
  unsignedIntSchema,
  urlSchema,
} from './primitiveTypes.js'
import { elementSchema } from '../element.js'

/**
 * Zod schema for FHIR Attachment data type.
 */
export const attachmentSchema: ZodType<Attachment> = z.lazy(() =>
  elementSchema.extend({
    contentType: codeSchema.optional(),
    _contentType: elementSchema.optional(),
    language: codeSchema.optional(),
    _language: elementSchema.optional(),
    data: base64BinarySchema.optional(),
    _data: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    size: unsignedIntSchema.optional(),
    hash: base64BinarySchema.optional(),
    _hash: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    creation: dateTimeSchema.optional(),
    _creation: elementSchema.optional(),
  }),
)
