/**
 * Utility for handling optional fields in schemas
 */

import { type z } from 'zod'

export function optionalish<T extends z.ZodTypeAny>(schema: T) {
  return schema.nullable().transform((val) => (val === null ? undefined : val))
}

export function optionalishDefault<T extends z.ZodTypeAny>(
  schema: T,
  defaultValue: z.infer<T>,
) {
  return schema
    .nullable()
    .default(null)
    .transform((val) => (val === null ? defaultValue : val))
}
