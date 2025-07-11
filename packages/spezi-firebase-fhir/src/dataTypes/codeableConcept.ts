//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import { codingForwardSchema, codingBackwardSchema } from './coding.js'

export type CodeableConceptDto = z.input<typeof codeableConceptForwardSchema>
export type CodeableConcept = z.output<typeof codeableConceptForwardSchema>

export const codeableConceptForwardSchema = elementForwardSchema.extend({
  get coding() {
    return codingForwardSchema.array().optional()
  },
  get text() {
    return z.string().optional()
  },
})

export const codeableConceptBackwardSchema = elementBackwardSchema.extend({
  get coding() {
    return codingBackwardSchema.array().optional()
  },
  get text() {
    return z.string().optional()
  },
})
