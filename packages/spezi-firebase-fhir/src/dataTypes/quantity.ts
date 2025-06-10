//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { z } from 'zod/v4'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const quantitySchema = elementSchema.extend({
  value: optionalish(Schema.simple(z.number())),
  comparator: optionalish(codeSchema),
  unit: optionalish(Schema.simple(z.string())),
  system: optionalish(uriSchema),
  code: optionalish(codeSchema),
})
