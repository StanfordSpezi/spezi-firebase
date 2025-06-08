//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { Schema } from '@stanfordspezi/spezi-firebase-utils'

export const narrativeSchema = Schema.composed({
  status: codeSchema,
  div: Schema.simple(z.string()), // TODO: technically this is xhtml
})
