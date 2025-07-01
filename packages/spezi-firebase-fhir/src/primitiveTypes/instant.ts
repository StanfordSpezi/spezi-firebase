//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { BidirectionalSchema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'

export const instantSchema = BidirectionalSchema.separate(
  z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/,
    )
    .transform((value) => new Date(value)),
  z.date().transform((value) => value.toISOString()),
)
