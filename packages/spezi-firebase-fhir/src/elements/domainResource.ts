//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  narrativeBackwardSchema,
  narrativeForwardSchema,
} from '../dataTypes/narrative.js'
import { extensionForwardSchema, extensionBackwardSchema } from './extension.js'
import { resourceForwardSchema, resourceBackwardSchema } from './resource.js'

export const domainResourceForwardSchema = resourceForwardSchema.extend({
  // get text() {
  //   return narrativeForwardSchema.optional()
  // },
  // get contained() {
  //   return resourceForwardSchema.array().optional()
  // },
  // get extension() {
  //   return extensionForwardSchema.array().optional()
  // },
  // get modifierExtension() {
  //   return extensionForwardSchema.array().optional()
  // },
})

export const domainResourceBackwardSchema = resourceBackwardSchema.extend({
  // get text() {
  //   return narrativeBackwardSchema.optional()
  // },
  // get contained() {
  //   return resourceBackwardSchema.array().optional()
  // },
  // get extension() {
  //    return extensionBackwardSchema.array().optional()
  //  },
  //  get modifierExtension() {
  //    return extensionBackwardSchema.array().optional()
  //},
})
