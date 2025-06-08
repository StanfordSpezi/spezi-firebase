//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { codeableConceptSchema } from './codeableConcept.js'
import { referenceSchema } from './reference.js'
import { periodSchema } from './period.js'
import { z } from 'zod'

export const identifierSchema = elementSchema.extend({
  use: optionalish(codeSchema),
  type: optionalish(codeableConceptSchema),
  system: optionalish(uriSchema),
  value: optionalish(Schema.simple(z.string())),
  period: optionalish(periodSchema),
  assigner: optionalish(referenceSchema),
})
