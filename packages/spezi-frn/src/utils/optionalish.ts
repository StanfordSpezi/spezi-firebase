//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Utility for handling optional fields in schemas
 */

import { type z } from 'zod'

/**
 * Creates a schema that transforms null values to undefined
 *
 * NOTE: The Zod transform API returns a type that TypeScript cannot safely infer,
 * so we must use the unsafe-return eslint-disable. This is a known limitation when
 * working with Zod's transform API and schema validation.
 */
export function optionalish<T extends z.ZodTypeAny>(schema: T) {
  return schema.nullable().transform<z.infer<T> | undefined>((val) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return val === null ? undefined : (val as z.infer<T>)
  })
}

/**
 * Creates a schema that provides a default value when null is encountered
 *
 * NOTE: The Zod transform API returns a type that TypeScript cannot safely infer,
 * so we must use the unsafe-return eslint-disable. This is a known limitation when
 * working with Zod's transform API and schema validation.
 */
export function optionalishDefault<T extends z.ZodTypeAny>(
  schema: T,
  defaultValue: z.infer<T>,
) {
  return schema
    .nullable()
    .default(null)
    .transform<z.infer<T>>((val) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return val === null ? defaultValue : (val as z.infer<T>)
    })
}
