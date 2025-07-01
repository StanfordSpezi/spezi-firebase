//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  BidirectionalSchema,
  optionalish,
} from '@stanfordspezi/spezi-firebase-utils'
import { elementBackwardSchema, elementForwardSchema } from './element.js'
import { extensionBackwardSchema, extensionForwardSchema } from './extension.js'

export const backBoneElementForwardSchema = elementForwardSchema.extend({
  get modifierExtension() {
    return extensionForwardSchema.array().optional()
  },
})

export const backBoneelementBackwardSchema = elementBackwardSchema.extend({
  get modifierExtension() {
    return extensionBackwardSchema.array().optional()
  },
})

export const backBoneElementSchema = BidirectionalSchema.separate(
  backBoneElementForwardSchema,
  backBoneelementBackwardSchema,
)
