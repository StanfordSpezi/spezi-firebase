//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { resourceSchema } from './resource.js'
import { narrativeSchema } from '../dataTypes/narrative.js'
import { extensionSchema } from './extension.js'

export const domainResourceSchema = resourceSchema.extend({
  text: optionalish(narrativeSchema),
  // contained: optionalish(resourceSchema.array()),
  // extension: optionalish(extensionSchema.array()),
  // modifierExtension: optionalish(extensionSchema.array()),
})
