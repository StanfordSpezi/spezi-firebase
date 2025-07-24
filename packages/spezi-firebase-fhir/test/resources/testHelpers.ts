//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

export function jsonStringifyDeterministically(value: unknown): string {
  return JSON.stringify(
    value,
    function replacer(key, value) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value)
          .sort()
          .reduce((sorted, key) => {
            sorted[key] = value[key]
            return sorted
          }, {} as any)
      }
      return value
    },
    2,
  )
}
