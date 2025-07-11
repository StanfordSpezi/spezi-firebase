//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import {
  contactPointBackwardSchema,
  contactPointForwardSchema,
} from '../dataTypes/contactPoint.js'

export const contactDetailForwardSchema = elementForwardSchema.extend({
  get name() {
    return z.string().optional()
  },
  get telecom() {
    return contactPointForwardSchema.array().optional()
  },
})

export const contactDetailBackwardSchema = elementBackwardSchema.extend({
  get name() {
    return z.string().optional()
  },
  get telecom() {
    return contactPointBackwardSchema.array().optional()
  },
})
