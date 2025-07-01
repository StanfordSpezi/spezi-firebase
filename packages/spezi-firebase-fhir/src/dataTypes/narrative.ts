//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'

export const narrativeSchema = z.object({
  status: codeSchema,
  div: z.string(), // TODO: technically this is xhtml
})
