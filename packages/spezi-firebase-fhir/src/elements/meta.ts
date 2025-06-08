//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { codingSchema } from '../dataTypes/coding.js'
import { instantSchema } from '../primitiveTypes/instant.js'

export const metaSchema = Schema.composed({
  versionId: optionalish(Schema.simple(z.string())),
  lastUpdated: optionalish(instantSchema),
  source: optionalish(uriSchema),
  profile: optionalish(uriSchema.array()),
  security: optionalish(codingSchema.array()),
  tag: optionalish(codingSchema.array()),
})
