//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { periodSchema } from './period.js'
import { z } from 'zod/v4'

export const addressSchema = elementSchema.extend({
  use: codeSchema.optionalish(),
  type: codeSchema.optionalish(),
  text: Schema.simple(z.string()).optionalish(),
  line: Schema.simple(z.string().array()).optionalish(),
  city: Schema.simple(z.string()).optionalish(),
  district: Schema.simple(z.string()).optionalish(),
  state: Schema.simple(z.string()).optionalish(),
  postalCode: Schema.simple(z.string()).optionalish(),
  country: Schema.simple(z.string()).optionalish(),
  period: periodSchema.optionalish(),
})
