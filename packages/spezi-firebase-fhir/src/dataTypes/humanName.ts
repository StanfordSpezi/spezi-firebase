//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod'
import { periodSchema } from './period.js'

export const humanNameSchema = elementSchema.extend({
  use: optionalish(codeSchema),
  text: optionalish(Schema.simple(z.string())),
  family: optionalish(Schema.simple(z.string())),
  given: optionalish(Schema.simple(z.string().array())),
  prefix: optionalish(Schema.simple(z.string().array())),
  suffix: optionalish(Schema.simple(z.string().array())),
  period: optionalish(periodSchema),
})
