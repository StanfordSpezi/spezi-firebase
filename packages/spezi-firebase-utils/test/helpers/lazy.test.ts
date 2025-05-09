//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import { createSandbox } from 'sinon'
import { Lazy } from '../../src/helpers/lazy.js'

describe('Lazy Utility', () => {
  const sandbox = createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it('should initialize value only when accessed', () => {
    const factorySpy = sandbox.spy(() => 'test value')
    const lazy = new Lazy(factorySpy)

    // Factory should not be called yet
    expect(factorySpy.called).to.be.false

    // Access the value
    const value = lazy.value

    // Factory should be called exactly once
    expect(factorySpy.calledOnce).to.be.true
    expect(value).to.equal('test value')
  })

  it('should cache the result after first access', () => {
    let counter = 0
    const factory = () => {
      counter++
      return `value ${counter}`
    }

    const lazy = new Lazy(factory)

    // First access
    expect(lazy.value).to.equal('value 1')
    expect(counter).to.equal(1)

    // Second access should use cached value
    expect(lazy.value).to.equal('value 1')
    expect(counter).to.equal(1)

    // Multiple accesses should still use cached value
    expect(lazy.value).to.equal('value 1')
    expect(lazy.value).to.equal('value 1')
    expect(counter).to.equal(1)
  })

  it('should work with complex object types', () => {
    const factory = () => ({
      name: 'test',
      value: 42,
      nested: { prop: true },
    })

    const lazy = new Lazy(factory)

    expect(lazy.value).to.deep.equal({
      name: 'test',
      value: 42,
      nested: { prop: true },
    })
  })

  it('should set value directly when using setter', () => {
    const factorySpy = sandbox.spy(() => 'factory value')
    const lazy = new Lazy(factorySpy)

    // Set the value directly
    lazy.value = 'direct value'

    // Get the value - factory should not be called
    expect(lazy.value).to.equal('direct value')
    expect(factorySpy.called).to.be.false
  })

  it('should throw when factory is not available and value is undefined', () => {
    // Create a lazy with a factory that returns undefined
    // @ts-expect-error - factory intentionally returns undefined for testing
    const lazy = new Lazy<string>(() => undefined)

    // We need to modify the lazy instance to simulate the error condition
    // @ts-expect-error - accessing private property for testing
    lazy._factory = undefined

    expect(() => lazy.value).to.throw(
      'Lazy value is undefined and factory function is not available',
    )
  })
})
