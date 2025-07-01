//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { periodSchema } from './period.js'
import { z } from 'zod/v4'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'

export const addressForwardSchema = elementForwardSchema.extend({
  use: optionalish(codeSchema.forward),
  type: optionalish(codeSchema.forward),
  text: optionalish(z.string()),
  line: optionalish(z.string().array()),
  city: optionalish(z.string()),
  district: optionalish(z.string()),
  state: optionalish(z.string()),
  postalCode: optionalish(z.string()),
  country: optionalish(z.string()),
  period: optionalish(periodSchema.forward),
})

export const addressBackwardSchema = elementBackwardSchema.extend({
  use: optionalish(codeSchema.backward),
  type: optionalish(codeSchema.backward),
  text: optionalish(z.string()),
  line: optionalish(z.string().array()),
  city: optionalish(z.string()),
  district: optionalish(z.string()),
  state: optionalish(z.string()),
  postalCode: optionalish(z.string()),
  country: optionalish(z.string()),
  period: optionalish(periodSchema.backward),
})
