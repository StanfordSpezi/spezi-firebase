//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { instantSchema, uriSchema } from '../dataTypes/primitiveTypes.js'
import { codingSchema } from './coding.js'

export const metaSchema = z.object({
  versionId: optionalish(z.string()),
  lastUpdated: optionalish(instantSchema),
  source: optionalish(uriSchema),
  profile: optionalish(uriSchema.array()),
  security: optionalish(codingSchema.array()),
  tag: optionalish(codingSchema.array()),
})
