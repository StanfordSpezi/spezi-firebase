//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  BidirectionalSchema,
  optionalish,
} from '@stanfordspezi/spezi-firebase-utils'
import { elementForwardSchema } from '../elements/element.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const periodForwardSchema = elementForwardSchema.extend({
  start: optionalish(dateTimeSchema.forward),
  end: optionalish(dateTimeSchema.forward),
})

export const periodBackwardSchema = elementForwardSchema.extend({
  start: optionalish(dateTimeSchema.backward),
  end: optionalish(dateTimeSchema.backward),
})

export const periodSchema = BidirectionalSchema.separate(
  periodForwardSchema,
  periodBackwardSchema,
)
