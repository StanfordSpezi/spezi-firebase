//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Using Jest assertions
import { z } from 'zod'
import { Lazy } from '../../src/helpers/lazy.js'
import {
  SchemaConverter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type InferEncoded,
} from '../../src/helpers/schemaConverter.js'

describe('SchemaConverter', () => {
  // Simple class for testing
  class TestUser {
    constructor(
      public readonly name: string,
      public readonly age: number,
    ) {}
  }

  describe('constructor', () => {
    it('should create a SchemaConverter instance', () => {
      const converter = new SchemaConverter({
        schema: z
          .object({
            name: z.string(),
            age: z.number(),
          })
          .transform((data) => new TestUser(data.name, data.age)),
        encode: (user: TestUser) => ({ name: user.name, age: user.age }),
      })

      expect(converter).toBeInstanceOf(SchemaConverter)
      expect(converter).toHaveProperty('schema')
      expect(converter).toHaveProperty('encode')
    })
  })

  describe('value property', () => {
    it('should return the converter itself', () => {
      const converter = new SchemaConverter({
        schema: z.string(),
        encode: (value) => value.toUpperCase(),
      })

      expect(converter.value).toBe(converter)
    })
  })

  describe('schema and encode', () => {
    const userConverter = new SchemaConverter({
      schema: z
        .object({
          name: z.string(),
          age: z.number(),
        })
        .transform((data) => new TestUser(data.name, data.age)),
      encode: (user: TestUser) => ({ name: user.name, age: user.age }),
    })

    it('should parse and transform input data', () => {
      const input = { name: 'John', age: 30 }
      const user = userConverter.schema.parse(input)

      expect(user).toBeInstanceOf(TestUser)
      expect(user.name).toBe('John')
      expect(user.age).toBe(30)
    })

    it('should encode user objects to plain data', () => {
      const user = new TestUser('Jane', 25)
      const encoded = userConverter.encode(user)

      expect(encoded).toEqual({ name: 'Jane', age: 25 })
    })

    it('should validate input data', () => {
      const invalidInput = { name: 123, age: 'young' }
      expect(() => userConverter.schema.parse(invalidInput)).toThrow()
    })
  })

  describe('InferEncoded type', () => {
    // Testing this via a runtime check for the equivalent behavior
    it('should correctly infer return type of encode method', () => {
      // Normal SchemaConverter
      const converter = new SchemaConverter({
        schema: z.string(),
        encode: (value) => ({ processed: value.toUpperCase() }),
      })

      const encoded = converter.encode('test')
      expect(encoded).toHaveProperty('processed')
      expect(encoded.processed).toBe('TEST')

      // Lazy SchemaConverter
      const lazyConverter = new Lazy(() => converter)

      const lazyEncoded = lazyConverter.value.encode('test')
      expect(lazyEncoded).toHaveProperty('processed')
      expect(lazyEncoded.processed).toBe('TEST')
    })
  })
})
