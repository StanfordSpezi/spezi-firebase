//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import {
  contactDetailBackwardSchema,
  contactDetailForwardSchema,
} from './contactDetail.js'
import { z } from 'zod/v4'

export const contributorForwardSchema = elementForwardSchema.extend({
  get type() {
    return codeSchema.forward
  },
  get name() {
    return z.string()
  },
  get contact() {
    return contactDetailForwardSchema.array().optional()
  },
})

export const contributorBackwardSchema = elementBackwardSchema.extend({
  get type() {
    return codeSchema.backward
  },
  get name() {
    return z.string()
  },
  get contact() {
    return contactDetailBackwardSchema.array().optional()
  },
})
