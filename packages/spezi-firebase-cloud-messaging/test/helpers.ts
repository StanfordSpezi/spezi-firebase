//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Test helpers and utilities using Jest
 */

// Add custom test utilities here

/**
 * Sleep for a specified number of milliseconds
 * @param ms Milliseconds to wait
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Create a mock document reference
 * @param id Document ID
 * @param path Document path
 * @param data Document data
 * @returns Mock document reference
 */
export function createMockDocRef(
  id: string,
  path: string,
  data: Record<string, any> = {},
) {
  return {
    id,
    path,
    set: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue({
      id,
      data: () => data,
      exists: true,
      ref: { path },
    }),
    delete: jest.fn().mockResolvedValue(undefined),
  }
}
