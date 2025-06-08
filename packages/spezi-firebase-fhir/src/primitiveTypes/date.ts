//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'

export const dateSchema = Schema.separate(
  z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/,
    )
    .transform((value) => new Date(value)),
  z.date().transform((value) => value.toISOString()),
)
