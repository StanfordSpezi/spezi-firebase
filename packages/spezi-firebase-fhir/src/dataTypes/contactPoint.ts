//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { elementForwardSchema } from '../elements/element.js'
import {
  codeSchema,
  positiveIntSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { periodSchema } from './period.js'
import { z } from 'zod/v4'

export const contactPointSchema = elementForwardSchema.extend({
  system: optionalish(codeSchema.forward),
  value: optionalish(z.string()),
  use: optionalish(codeSchema.forward),
  rank: optionalish(positiveIntSchema.forward),
  period: optionalish(periodSchema.forward),
})
