/**
 * A utility class that implements the lazy initialization pattern.
 * The factory function is only called when the value is first accessed.
 */
export class Lazy<T> {
  private _factory?: () => T
  private _value?: T

  constructor(factory: () => T) {
    this._factory = factory
  }

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

  set value(value: T) {
    this._value = value
    this._factory = undefined
  }
}
