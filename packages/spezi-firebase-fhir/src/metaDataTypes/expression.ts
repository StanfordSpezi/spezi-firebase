//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementForwardSchema, elementBackwardSchema } from '../elements/element.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { codeSchema, idSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const expressionForwardSchema = elementForwardSchema.extend({
  description: optionalish(z.string()),
  name: optionalish(idSchema.forward),
  language: codeSchema.forward,
  expression: optionalish(z.string()),
  reference: optionalish(uriSchema.forward),
})

export const expressionBackwardSchema = elementBackwardSchema.extend({
  description: optionalish(z.string()),
  name: optionalish(idSchema.backward),
  language: codeSchema.backward,
  expression: optionalish(z.string()),
  reference: optionalish(uriSchema.backward),
})
