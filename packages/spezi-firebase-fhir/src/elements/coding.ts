//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { codeSchema, uriSchema } from '../dataTypes/primitiveTypes.js'
import { elementSchema } from './element.js'

export const codingSchema = elementSchema.extend({
  system: optionalish(uriSchema),
  version: optionalish(z.string()),
  code: optionalish(codeSchema),
  display: optionalish(z.string()),
  userSelected: optionalish(z.boolean()),
})
