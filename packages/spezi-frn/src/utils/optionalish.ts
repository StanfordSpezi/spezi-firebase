/**
 * Utility for handling optional fields in schemas
 */

import { type z } from 'zod'

export function optionalish<T extends z.ZodTypeAny>(schema: T) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return schema.nullable().transform<z.infer<T> | undefined>((val) => {
    return val === null ? undefined : (val as z.infer<T>)
  })
}

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
