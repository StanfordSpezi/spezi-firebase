//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Utility for lazy initialization of values
 */

/**
 * A utility class that implements lazy initialization pattern
 */
export class Lazy<T> {
  private factory: () => T
  private _value?: T

  /**
   * Creates a new Lazy instance
   * @param factory Function that produces the value when first accessed
   */
  constructor(factory: () => T) {
    this.factory = factory
  }

  /**
   * Gets the lazily-initialized value, computing it on first access
   * @returns The computed or cached value
   */
  get value(): T {
    if (this._value === undefined) {
      this._value = this.factory()
    }
    return this._value
  }
}
