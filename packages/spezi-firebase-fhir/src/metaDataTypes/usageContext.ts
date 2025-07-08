//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { codingSchema } from '../dataTypes/coding.js'
import { elementForwardSchema, elementBackwardSchema } from '../elements/element.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { rangeSchema } from '../dataTypes/range.js'
import { referenceForwardSchema, referenceBackwardSchema } from '../dataTypes/reference.js'

export const usageContextSchema = elementForwardSchema.extend({
  code: codingSchema,
  valueCodeableConcept: optionalish(codeableConceptSchema),
  valueQuantity: optionalish(quantitySchema),
  valueRange: optionalish(rangeSchema),
  valueReference: optionalish(referenceForwardSchema),
})

export const usageContextBackwardSchema = elementBackwardSchema.extend({
  code: codingSchema,
  valueCodeableConcept: optionalish(codeableConceptSchema),
  valueQuantity: optionalish(quantitySchema),
  valueRange: optionalish(rangeSchema),
  valueReference: optionalish(referenceBackwardSchema),
})
