//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  codingBackwardSchema,
  codingForwardSchema,
} from '../dataTypes/coding.js'
import {
  elementForwardSchema,
  elementBackwardSchema,
} from '../elements/element.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from '../dataTypes/codeableConcept.js'
import {
  referenceForwardSchema,
  referenceBackwardSchema,
} from '../dataTypes/reference.js'
import {
  quantityBackwardSchema,
  quantityForwardSchema,
} from '../dataTypes/quantity.js'
import { rangeBackwardSchema, rangeForwardSchema } from '../dataTypes/range.js'

export const usageContextForwardSchema = elementForwardSchema.extend({
  get code() {
    return codingForwardSchema
  },
  get valueCodeableConcept() {
    return codeableConceptForwardSchema.optional()
  },
  get valueQuantity() {
    return quantityForwardSchema.optional()
  },
  get valueRange() {
    return rangeForwardSchema.optional()
  },
  get valueReference() {
    return referenceForwardSchema.optional()
  },
})

export const usageContextBackwardSchema = elementBackwardSchema.extend({
  get code() {
    return codingBackwardSchema
  },
  get valueCodeableConcept() {
    return codeableConceptBackwardSchema.optional()
  },
  get valueQuantity() {
    return quantityBackwardSchema.optional()
  },
  get valueRange() {
    return rangeBackwardSchema.optional()
  },
  get valueReference() {
    return referenceBackwardSchema.optional()
  },
})
