import { expect } from 'chai'
import { createSandbox } from 'sinon'
import { Lazy } from '../../src/utils/lazy.js'

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

  it('should handle factory functions that return undefined', () => {
    const factory = () => undefined
    const lazy = new Lazy<undefined>(factory)

    // Factory should be called when accessing value
    const factorySpy = sandbox.spy(lazy, 'value', ['get'])

    // Access the value multiple times
    expect(lazy.value).to.be.undefined
    expect(lazy.value).to.be.undefined

    // Even though value is undefined, getter should only evaluate once
    expect(factorySpy.get.calledTwice).to.be.true
  })
})
