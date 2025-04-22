/**
 * Utility for lazy initialization of values
 */

export class Lazy<T> {
  private factory: () => T;
  private _value?: T;

  constructor(factory: () => T) {
    this.factory = factory;
  }

  get value(): T {
    if (this._value === undefined) {
      this._value = this.factory();
    }
    return this._value;
  }
}