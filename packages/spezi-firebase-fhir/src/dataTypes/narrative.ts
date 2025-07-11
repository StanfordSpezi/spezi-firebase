//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'

export const narrativeForwardSchema = elementForwardSchema.extend({
  get status() {
    return codeSchema.forward
  },
  get div() {
    return z.string() // TODO: technically this is xhtml
  },
})

export const narrativeBackwardSchema = elementBackwardSchema.extend({
  get status() {
    return codeSchema.backward
  },
  get div() {
    return z.string() // TODO: technically this is xhtml
  },
})
