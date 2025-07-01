//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { quantitySchema } from './quantity.js'
import { elementForwardSchema } from '../elements/element.js'

export const ratioRangeSchema = elementForwardSchema.extend({
  lowNumerator: optionalish(quantitySchema),
  highNumerator: optionalish(quantitySchema),
  denominator: optionalish(quantitySchema),
})
