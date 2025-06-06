//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from './element.js'
import { z } from 'zod'
import { codeSchema, uriSchema } from '../dataTypes/primitiveTypes.js'

export const quantitySchema = elementSchema.extend({
  value: optionalish(z.number()),
  comparator: optionalish(codeSchema),
  unit: optionalish(z.string()),
  system: optionalish(uriSchema),
  code: optionalish(codeSchema),
})
