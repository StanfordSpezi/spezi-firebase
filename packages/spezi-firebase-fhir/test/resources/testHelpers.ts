//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Stringify an object with deterministically sorted keys
 * @param object The object to stringify
 * @returns JSON string with sorted keys
 */
export function jsonStringifyDeterministically(object: unknown): string {
  return JSON.stringify(
    object,
    (_, value) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value)
          .sort()
          .reduce<any>((sorted, key) => {
            sorted[key] = value[key]
            return sorted
          }, {})
      }
      return value
    },
    2,
  )
}
