//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { elementForwardSchema } from '../elements/element.js'

export const codingSchema = elementForwardSchema.extend({
  system: optionalish(uriSchema.forward),
  version: optionalish(z.string()),
  code: optionalish(codeSchema.forward),
  display: optionalish(z.string()),
  userSelected: optionalish(z.boolean()),
})
