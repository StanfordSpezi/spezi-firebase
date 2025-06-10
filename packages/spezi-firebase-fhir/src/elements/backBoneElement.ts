//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from './element.js'
import { extensionSchema } from './extension.js'

export const backBoneElementSchema = elementSchema.extend({
  // get modifierExtension() {
  //   return optionalish(extensionSchema.array())
  // },
})
