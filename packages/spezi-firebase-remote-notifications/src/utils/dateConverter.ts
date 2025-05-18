//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Date converter utility for handling Firestore date format conversions
 */

import { z } from 'zod'

export const dateConverter = {
  schema: z.union([
    z.date(),
    z.string().transform((val) => new Date(val)),
    z
      .object({
        seconds: z.number(),
        nanoseconds: z.number(),
      })
      .transform((val) => new Date(val.seconds * 1000)),
  ]),
  encode: (date: Date): { seconds: number; nanoseconds: number } => {
    const seconds = Math.floor(date.getTime() / 1000)
    const nanoseconds = (date.getTime() % 1000) * 1000000
    return { seconds, nanoseconds }
  },
}
