//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Using Jest assertions
import { Lazy } from '../../src/helpers/lazy.js'

describe('Lazy Utility', () => {
  it('should initialize value only when accessed', () => {
    let factoryCalled = 0
    const factory = () => {
      factoryCalled++
      return 'test value'
    }

    const lazy = new Lazy(factory)

    // Factory should not be called yet
    expect(factoryCalled).toBe(0)

    // Access the value
    const value = lazy.value

    // Factory should be called exactly once
    expect(factoryCalled).toBe(1)
    expect(value).toBe('test value')
  })

  it('should cache the result after first access', () => {
    let counter = 0
    const factory = () => {
      counter++
      return `value ${counter}`
    }

    const lazy = new Lazy(factory)

    // First access
    expect(lazy.value).toBe('value 1')
    expect(counter).toBe(1)

    // Second access should use cached value
    expect(lazy.value).toBe('value 1')
    expect(counter).toBe(1)

    // Multiple accesses should still use cached value
    expect(lazy.value).toBe('value 1')
    expect(lazy.value).toBe('value 1')
    expect(counter).toBe(1)
  })

  it('should work with complex object types', () => {
    const factory = () => ({
      name: 'test',
      value: 42,
      nested: { prop: true },
    })

    const lazy = new Lazy(factory)

    expect(lazy.value).toEqual({
      name: 'test',
      value: 42,
      nested: { prop: true },
    })
  })

  it('should set value directly when using setter', () => {
    let factoryCalled = 0
    const factory = () => {
      factoryCalled++
      return 'factory value'
    }

    const lazy = new Lazy(factory)

    // Set the value directly
    lazy.value = 'direct value'

    // Get the value - factory should not be called
    expect(lazy.value).toBe('direct value')
    expect(factoryCalled).toBe(0)
  })

  it('should throw when factory is not available and value is undefined', () => {
    // Create a lazy with a factory that returns undefined
    // @ts-expect-error - factory intentionally returns undefined for testing
    const lazy = new Lazy<string>(() => undefined)

    // We need to modify the lazy instance to simulate the error condition
    // @ts-expect-error - accessing private property for testing
    lazy._factory = undefined

    expect(() => lazy.value).toThrow(
      'Lazy value is undefined and factory function is not available',
    )
  })
})
