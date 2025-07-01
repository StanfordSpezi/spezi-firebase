//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { elementForwardSchema } from '../elements/element.js'
import { contactDetailSchema } from './contactDetail.js'
import { z } from 'zod/v4'

export const contributorSchema = elementForwardSchema.extend({
  type: codeSchema,
  name: z.string(),
  contact: optionalish(contactDetailSchema.array()),
})
