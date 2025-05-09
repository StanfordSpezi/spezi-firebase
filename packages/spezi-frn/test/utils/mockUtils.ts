/**
 * Creates a mock function that tracks its calls, see https://stackoverflow.com/questions/59010129/mocking-a-function-inside-a-function-and-getting-calls-count-in-jest
 * @returns A mock function with call tracking
 */
export function createMockFunction<_T = void, R = any>(): {
  fn: jest.Mock<R, any[]>
  called: boolean
  calledOnce: boolean
  callCount: number
  calledWith: (...args: any[]) => boolean
  resetCalls: () => void
  getCall: (n: number) => { args: any[] } | undefined
  firstCall: { args: any[] } | undefined
} {
  const mock = jest.fn() as jest.Mock<R, any[]>
  const calls: any[][] = []

  mock.mockImplementation((...args: any[]) => {
    calls.push([...args])
    return undefined as unknown as R
  })

  return {
    fn: mock,
    get called() {
      return calls.length > 0
    },
    get calledOnce() {
      return calls.length === 1
    },
    get callCount() {
      return calls.length
    },
    calledWith: (...args: any[]) => {
      return calls.some((callArgs) =>
        args.every((arg, i) => arg === callArgs[i]),
      )
    },
    resetCalls: () => {
      calls.length = 0
      mock.mockClear()
    },
    getCall: (n: number) => {
      if (n >= calls.length) return undefined
      return { args: calls[n] }
    },
    get firstCall() {
      return calls.length > 0 ? { args: calls[0] } : undefined
    },
  }
}

/**
 * Creates a stub function that returns a preset value
 * @param returnValue The value to return when the stub is called
 * @returns A stub function that returns the specified value
 */
export function createStub<T>(returnValue: T): jest.Mock<T, any[]> & {
  resolves: (value?: any) => jest.Mock
  rejects: (error?: any) => jest.Mock
  callCount: number
  calledOnce: boolean
  called: boolean
  reset: () => void
} {
  const stub = jest.fn().mockReturnValue(returnValue)
  let callCount = 0

  const enhancedStub = stub as jest.Mock<T, any[]> & {
    resolves: (value?: any) => jest.Mock
    rejects: (error?: any) => jest.Mock
    callCount: number
    calledOnce: boolean
    called: boolean
    reset: () => void
  }

  // Add sinon-like API
  enhancedStub.resolves = (value: any = undefined) => {
    stub.mockResolvedValue(value)
    return enhancedStub
  }

  enhancedStub.rejects = (error: any = new Error('Rejected')) => {
    stub.mockRejectedValue(error)
    return enhancedStub
  }

  // Track calls
  const originalMockImplementation = stub.mockImplementation.bind(stub)
  stub.mockImplementation = (fn) => {
    originalMockImplementation((...args: any[]) => {
      callCount++
      return fn ? fn(...args) : undefined
    })
    return enhancedStub
  }

  // Add call count properties
  Object.defineProperties(enhancedStub, {
    callCount: {
      get: () => callCount,
    },
    calledOnce: {
      get: () => callCount === 1,
    },
    called: {
      get: () => callCount > 0,
    },
  })

  // Add reset method
  enhancedStub.reset = () => {
    callCount = 0
    stub.mockReset()
  }

  return enhancedStub
}
