//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { elementForwardSchema } from '../elements/element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod/v4'
import { periodSchema } from './period.js'

export const humanNameSchema = elementForwardSchema.extend({
  use: optionalish(codeSchema.forward),
  text: optionalish(z.string()),
  family: optionalish(z.string()),
  given: optionalish(z.string().array()),
  prefix: optionalish(z.string().array()),
  suffix: optionalish(z.string().array()),
  period: optionalish(periodSchema.forward),
})
