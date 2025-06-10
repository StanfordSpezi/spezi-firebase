//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { quantitySchema } from './quantity.js'

export const rangeSchema = elementSchema.extend({
  low: optionalish(quantitySchema),
  high: optionalish(quantitySchema),
})
