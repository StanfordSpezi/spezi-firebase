//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Lazy } from '../../src/utils/lazy.js'

describe('Lazy Utility', () => {
  test('should initialize value only when accessed', () => {
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

  test('should cache the result after first access', () => {
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

  test('should work with complex object types', () => {
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

  test('should handle factory functions that return undefined', () => {
    let factoryCalled = 0
    const factory = () => {
      factoryCalled++
      return undefined
    }
    const lazy = new Lazy<undefined>(factory)

    // Access the value
    expect(lazy.value).toBeUndefined()

    // Factory should only be called once
    expect(factoryCalled).toBe(1)
  })
})
