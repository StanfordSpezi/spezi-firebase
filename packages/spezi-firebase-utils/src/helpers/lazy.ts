//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * A utility class that implements the lazy initialization pattern.
 * The factory function is only called when the value is first accessed.
 */
export class Lazy<T> {
  // Properties

  private _factory?: () => T
  private _value?: T

  // Constructor

  /**
   * Creates a new Lazy instance
   * @param factory Function that produces the value when first accessed
   */
  constructor(factory: () => T) {
    this._factory = factory
  }

  // Accessors

  /**
   * Gets the lazily-initialized value, computing it on first access
   * @returns The computed or cached value
   */
  get value(): T {
    if (this._value === undefined && this._factory) {
      this._value = this._factory()
      this._factory = undefined
    }
    // At this point _value should be defined, but we'll handle the case if it's not
    if (this._value === undefined) {
      throw new Error(
        'Lazy value is undefined and factory function is not available',
      )
    }
    return this._value
  }

  /**
   * Sets the value directly, bypassing the factory
   */
  set value(value: T) {
    this._value = value
    this._factory = undefined
  }
}
