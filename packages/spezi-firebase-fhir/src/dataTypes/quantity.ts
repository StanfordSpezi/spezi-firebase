//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { elementForwardSchema } from '../elements/element.js'
import { z } from 'zod/v4'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const quantitySchema = elementForwardSchema.extend({
  value: optionalish(z.number()),
  comparator: optionalish(codeSchema.forward),
  unit: optionalish(z.string()),
  system: optionalish(uriSchema.forward),
  code: optionalish(codeSchema.forward),
})
