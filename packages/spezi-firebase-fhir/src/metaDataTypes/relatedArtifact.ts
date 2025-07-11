//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import {
  elementForwardSchema,
  elementBackwardSchema,
} from '../elements/element.js'
import { codeSchema, urlSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  attachmentForwardSchema,
  attachmentBackwardSchema,
} from '../dataTypes/attachment.js'

export const relatedArtifactForwardSchema = elementForwardSchema.extend({
  get type() {
    return codeSchema.forward
  },
  get label() {
    return z.string().optional()
  },
  get display() {
    return z.string().optional()
  },
  get citation() {
    return z.string().optional()
  },
  get url() {
    return urlSchema.forward.optional()
  },
  get document() {
    return attachmentForwardSchema.optional()
  },
  get resource() {
    return z.string().optional()
  },
})

export const relatedArtifactBackwardSchema = elementBackwardSchema.extend({
  get type() {
    return codeSchema.backward
  },
  get label() {
    return z.string().optional()
  },
  get display() {
    return z.string().optional()
  },
  get citation() {
    return z.string().optional()
  },
  get url() {
    return urlSchema.backward.optional()
  },
  get document() {
    return attachmentBackwardSchema.optional()
  },
  get resource() {
    return z.string().optional()
  },
})
