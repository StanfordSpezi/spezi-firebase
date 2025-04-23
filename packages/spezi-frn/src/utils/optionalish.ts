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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return schema.nullable().transform<z.infer<T> | undefined>((val) => {
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
  return (
    schema
      .nullable()
      .default(null)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .transform<z.infer<T>>((val) => {
        return val === null ? defaultValue : (val as z.infer<T>)
      })
  )
}
