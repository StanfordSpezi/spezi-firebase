/**
 * Test helpers and utilities
 */

// Re-export utilities for convenience
import * as chai from 'chai';
import * as sinon from 'sinon';

export { chai, sinon };
export const { expect } = chai;

// Add custom test utilities here

/**
 * Sleep for a specified number of milliseconds
 * @param ms Milliseconds to wait
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a mock document reference
 * @param id Document ID
 * @param path Document path
 * @param data Document data
 * @returns Mock document reference
 */
export function createMockDocRef(id: string, path: string, data: Record<string, any> = {}) {
  return {
    id,
    path,
    set: sinon.stub().resolves(),
    get: sinon.stub().resolves({
      id,
      data: () => data,
      exists: true,
      ref: { path }
    }),
    delete: sinon.stub().resolves()
  };
}