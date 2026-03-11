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
export const jsonStringifyDeterministically = (object: unknown): string =>
  JSON.stringify(
    object,
    (_, value: unknown) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const record = value as Record<string, unknown>;
        return Object.keys(record)
          .sort()
          .reduce<Record<string, unknown>>((sorted, key) => {
            sorted[key] = record[key];
            return sorted;
          }, {});
      }
      return value;
    },
    2,
  );
