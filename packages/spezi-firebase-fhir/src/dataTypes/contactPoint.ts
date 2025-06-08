//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import {
  codeSchema,
  positiveIntSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { periodSchema } from './period.js'
import { z } from 'zod'

export const contactPointSchema = elementSchema.extend({
  system: optionalish(codeSchema),
  value: optionalish(Schema.simple(z.string())),
  use: optionalish(codeSchema),
  rank: optionalish(positiveIntSchema),
  period: optionalish(periodSchema),
})
