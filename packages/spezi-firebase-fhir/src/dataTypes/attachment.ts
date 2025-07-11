//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import {
  base64BinarySchema,
  codeSchema,
  unsignedIntSchema,
  urlSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod/v4'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export type AttachmentDto = z.input<typeof attachmentForwardSchema>
export type Attachment = z.output<typeof attachmentForwardSchema>

export const attachmentForwardSchema = elementForwardSchema.extend({
  get contentType() {
    return codeSchema.forward.optional()
  },
  get language() {
    return codeSchema.forward.optional()
  },
  get data() {
    return base64BinarySchema.forward.optional()
  },
  get url() {
    return urlSchema.forward.optional()
  },
  get size() {
    return unsignedIntSchema.forward.optional()
  },
  get hash() {
    return base64BinarySchema.forward.optional()
  },
  get title() {
    return z.string().optional()
  },
  get creation() {
    return dateTimeSchema.forward.optional()
  },
})

export const attachmentBackwardSchema = elementBackwardSchema.extend({
  get contentType() {
    return codeSchema.backward.optional()
  },
  get language() {
    return codeSchema.backward.optional()
  },
  get data() {
    return base64BinarySchema.backward.optional()
  },
  get url() {
    return urlSchema.backward.optional()
  },
  get size() {
    return unsignedIntSchema.backward.optional()
  },
  get hash() {
    return base64BinarySchema.backward.optional()
  },
  get title() {
    return z.string().optional()
  },
  get creation() {
    return dateTimeSchema.backward.optional()
  },
})
