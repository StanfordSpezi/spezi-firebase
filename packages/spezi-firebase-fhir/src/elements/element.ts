//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { extensionSchema } from './extension.js'

export const elementSchema = z.object({
  id: optionalish(z.string()),
  extension: optionalish(extensionSchema.array()),
})
