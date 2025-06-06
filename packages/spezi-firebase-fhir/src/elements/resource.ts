//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { metaSchema } from './meta.js'
import { codeSchema, uriSchema } from '../dataTypes/primitiveTypes.js'

export const resourceSchema = z.object({
  id: optionalish(z.string()),
  meta: optionalish(metaSchema),
  implicitRules: optionalish(uriSchema),
  language: optionalish(codeSchema),
})
