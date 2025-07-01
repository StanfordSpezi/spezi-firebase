//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementForwardSchema, elementSchema } from '../elements/element.js'
import { quantitySchema } from './quantity.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'

export const sampledDataSchema = elementForwardSchema.extend({
  origin: quantitySchema,
  period: z.number(),
  factor: optionalish(z.number()),
  lowerLimit: optionalish(z.number()),
  upperLimit: optionalish(z.number()),
  dimensions: positiveIntSchema,
  data: optionalish(z.string()),
})
