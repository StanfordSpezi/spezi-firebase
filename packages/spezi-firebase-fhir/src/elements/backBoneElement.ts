//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { elementBackwardSchema, elementForwardSchema } from './element.js'
import { extensionBackwardSchema, extensionForwardSchema } from './extension.js'

export const backBoneElementForwardSchema = elementForwardSchema.extend({
  get modifierExtension() {
    return extensionForwardSchema.array().optional()
  },
})

export const backBoneElementBackwardSchema = elementBackwardSchema.extend({
  get modifierExtension() {
    return extensionBackwardSchema.array().optional()
  },
})
