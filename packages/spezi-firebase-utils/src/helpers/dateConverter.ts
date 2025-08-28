//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { SchemaConverter } from './schemaConverter.js'

/**
 * Convert between ISO date strings and Date objects for Firestore.
 */
export const dateConverter = new SchemaConverter({
  schema: z.string().transform((string, context) => {
    try {
      const date = new Date(string)
      if (isNaN(date.getTime())) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid date',
        })
        return z.NEVER
      }
      return date
    } catch (error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: String(error),
      })
      return z.NEVER
    }
  }),
  encode: (object) => object.toISOString(),
})
