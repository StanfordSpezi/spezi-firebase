import { z } from 'zod'

/**
 * Create an optional schema that handles null values by transforming them to undefined.
 */
export function optionalish<T extends z.ZodTypeAny>(type: T) {
  return type.or(z.null().transform(() => undefined)).optional()
}

/**
 * Create an optional schema with a default value when the value is null or undefined.
 */
export function optionalishDefault<T extends z.ZodTypeAny>(
  type: T,
  defaultValue: z.output<T>,
) {
  return (
    type
      .or(z.null().transform(() => undefined))
      .optional()
      .transform((value) => value ?? defaultValue)
  )
}