//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Custom Jest matchers for improved readability
expect.extend({
  toBeObject(received) {
    const pass =
      received !== null &&
      typeof received === 'object' &&
      !Array.isArray(received)
    if (pass) {
      return {
        message: () => `expected ${received} not to be an object`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be an object`,
        pass: false,
      }
    }
  },
});