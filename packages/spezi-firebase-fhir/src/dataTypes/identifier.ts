//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { referenceBackwardSchema, referenceForwardSchema } from './reference.js'
import { z } from 'zod/v4'
import { periodBackwardSchema, periodForwardSchema } from './period.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from './codeableConcept.js'

export const identifierForwardSchema = elementForwardSchema.extend({
  get use() {
    return codeSchema.forward.optional()
  },
  get type() {
    return codeableConceptForwardSchema.optional()
  },
  get system() {
    return uriSchema.forward.optional()
  },
  get value() {
    return z.string().optional()
  },
  get period() {
    return periodForwardSchema.optional()
  },
  get assigner() {
    return referenceForwardSchema.optional()
  },
})

export const identifierBackwardSchema = elementBackwardSchema.extend({
  get use() {
    return codeSchema.backward.optional()
  },
  get type() {
    return codeableConceptBackwardSchema.optional()
  },
  get system() {
    return uriSchema.backward.optional()
  },
  get value() {
    return z.string().optional()
  },
  get period() {
    return periodBackwardSchema.optional()
  },
  get assigner() {
    return referenceBackwardSchema.optional()
  },
})
