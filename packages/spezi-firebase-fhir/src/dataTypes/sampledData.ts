//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { elementSchema } from '../elements/element.js'
import { quantitySchema } from './quantity.js'
import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'

export const sampledDataSchema = elementSchema.extend({
  origin: quantitySchema,
  period: Schema.simple(z.number()),
  factor: optionalish(Schema.simple(z.number())),
  lowerLimit: optionalish(Schema.simple(z.number())),
  upperLimit: optionalish(Schema.simple(z.number())),
  dimensions: positiveIntSchema,
  data: optionalish(Schema.simple(z.string())),
})
