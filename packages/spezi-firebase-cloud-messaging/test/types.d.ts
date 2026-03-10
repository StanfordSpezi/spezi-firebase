declare namespace jest {
  interface Matchers<R> {
    toBeObject(): R;
  }

  interface Mock<T = unknown> {
    mockResolvedValue(value?: T): this;
  }
}
