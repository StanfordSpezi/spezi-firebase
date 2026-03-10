//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Creates a mock function that tracks its calls, see https://stackoverflow.com/questions/59010129/mocking-a-function-inside-a-function-and-getting-calls-count-in-jest
 * @returns A mock function with call tracking
 */
export const createMockFunction = <R>(): {
  fn: jest.Mock<R, unknown[]>;
  called: boolean;
  calledOnce: boolean;
  callCount: number;
  calledWith: (...args: unknown[]) => boolean;
  resetCalls: () => void;
  getCall: (n: number) => { args: unknown[] } | undefined;
  firstCall: { args: unknown[] } | undefined;
} => {
  const mock = jest.fn() as jest.Mock<R, unknown[]>;
  const calls: unknown[][] = [];

  mock.mockImplementation((...args: unknown[]) => {
    calls.push([...args]);
    return undefined as unknown as R;
  });

  return {
    fn: mock,
    get called() {
      return calls.length > 0;
    },
    get calledOnce() {
      return calls.length === 1;
    },
    get callCount() {
      return calls.length;
    },
    calledWith: (...args: unknown[]) => {
      return calls.some((callArgs) =>
        args.every((arg, i) => arg === callArgs[i]),
      );
    },
    resetCalls: () => {
      calls.length = 0;
      mock.mockClear();
    },
    getCall: (n: number) => {
      if (n >= calls.length) return undefined;
      return { args: calls[n] };
    },
    get firstCall() {
      return calls.length > 0 ? { args: calls[0] } : undefined;
    },
  };
};

/**
 * Creates a stub function that returns a preset value
 * @param returnValue The value to return when the stub is called
 * @returns A stub function that returns the specified value
 */
export const createStub = <T>(
  returnValue: T,
): jest.Mock<T> & {
  resolves: (value?: unknown) => jest.Mock;
  rejects: (error?: unknown) => jest.Mock;
  callCount: number;
  calledOnce: boolean;
  called: boolean;
  reset: () => void;
  mockResolvedValue: (value?: unknown) => jest.Mock;
} => {
  const stub = jest.fn().mockReturnValue(returnValue);
  let callCount = 0;

  const enhancedStub = stub as jest.Mock<T> & {
    resolves: (value?: unknown) => jest.Mock;
    rejects: (error?: unknown) => jest.Mock;
    callCount: number;
    calledOnce: boolean;
    called: boolean;
    reset: () => void;
    mockResolvedValue: (value?: unknown) => jest.Mock;
  };

  // Add sinon-like API
  enhancedStub.resolves = (value?: unknown) => {
    stub.mockResolvedValue(value === undefined ? returnValue : value);
    return enhancedStub;
  };

  // Override mockResolvedValue to support empty cals
  const originalMockResolvedValue = stub.mockResolvedValue.bind(stub);
  stub.mockResolvedValue = (value?: unknown) =>
    originalMockResolvedValue(value === undefined ? undefined : value);

  enhancedStub.rejects = (error: unknown = new Error("Rejected")) => {
    stub.mockRejectedValue(error);
    return enhancedStub;
  };

  // Track calls
  const originalMockImplementation = stub.mockImplementation.bind(stub);
  stub.mockImplementation = (fn) => {
    originalMockImplementation((...args: unknown[]) => {
      callCount++;
      return fn ? fn(...args) : undefined;
    });
    return enhancedStub;
  };

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
  });

  // Add reset method
  enhancedStub.reset = () => {
    callCount = 0;
    stub.mockReset();
  };

  return enhancedStub;
};
