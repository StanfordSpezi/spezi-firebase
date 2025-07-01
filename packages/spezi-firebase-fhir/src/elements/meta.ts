//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { codingSchema } from '../dataTypes/coding.js'
import { instantSchema } from '../primitiveTypes/instant.js'

export const metaSchema = z.object({
  versionId: optionalish(z.string()),
  lastUpdated: optionalish(instantSchema.forward),
  source: optionalish(uriSchema.forward),
  profile: optionalish(uriSchema.forward.array()),
  security: optionalish(codingSchema.array()),
  tag: optionalish(codingSchema.array()),
})
