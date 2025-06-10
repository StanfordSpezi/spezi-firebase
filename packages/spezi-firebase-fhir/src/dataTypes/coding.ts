//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { elementSchema } from '../elements/element.js'

export const codingSchema = elementSchema.extend({
  system: uriSchema.optionalish(),
  version: Schema.simple(z.string()).optionalish(),
  code: codeSchema.optionalish(),
  display: Schema.simple(z.string()).optionalish(),
  userSelected: Schema.simple(z.boolean()).optionalish(),
})
