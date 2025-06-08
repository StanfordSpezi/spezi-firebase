//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { z } from 'zod'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const referenceSchema = elementSchema.extend({
  reference: optionalish(Schema.simple(z.string())),
  type: optionalish(uriSchema),
  // TODO: identifier: optionalish(identifierSchema),
  display: optionalish(Schema.simple(z.string())),
})
