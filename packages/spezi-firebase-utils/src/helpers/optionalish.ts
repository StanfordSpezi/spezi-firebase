//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Create an optional schema that handles null values by transforming them to undefined.
 */
export function optionalish<T extends z.core.SomeType>(type: T) {
  return z.union([type, z.null().transform(() => undefined)]).optional()
}

/**
 * Create an optional schema with a default value when the value is null or undefined.
 */
export function optionalishDefault<T extends z.core.SomeType>(
  type: T,
  defaultValue: z.output<T>,
) {
  // Since we can't fully type this correctly without causing warning,
  // we'll disable the warning for the transform function only
  return z
    .union([type, z.null().transform(() => undefined)])
    .optional()
    .transform((value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value ?? defaultValue
    })
}
