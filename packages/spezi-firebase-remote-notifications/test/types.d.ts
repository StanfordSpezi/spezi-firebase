declare namespace jest {
  interface Matchers<R> {
    toBeObject(): R
  }

  interface Mock<T = any> {
    mockResolvedValue<U = T>(value?: U): this
  }
}
