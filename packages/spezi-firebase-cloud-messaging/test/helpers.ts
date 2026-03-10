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
 * @returns Promise that resolves after the specified delay
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Create a mock document reference
 * @param id Document ID
 * @param path Document path
 * @param data Document data
 * @returns Mock document reference
 */
export const createMockDocRef = (
  id: string,
  path: string,
  data: Record<string, any> = {},
) => ({
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
});
