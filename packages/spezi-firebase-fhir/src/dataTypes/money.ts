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

export const moneySchema = elementForwardSchema.extend({
  value: optionalish(z.number()),
  currency: optionalish(codeSchema.forward),
})
