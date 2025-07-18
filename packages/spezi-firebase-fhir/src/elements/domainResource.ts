//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { narrativeSchema } from './dataTypes/narrative.js'
import { extensionSchema } from './extension.js'
import { resourceSchema } from './resource.js'

export const domainResourceSchema = resourceSchema.extend({
  text: narrativeSchema.optional(),
  // get contained() {
  //   return resourceSchema.array().optional()
  // },
  get extension() {
    return extensionSchema.array().optional()
  },
  get modifierExtension() {
    return extensionSchema.array().optional()
  },
})
