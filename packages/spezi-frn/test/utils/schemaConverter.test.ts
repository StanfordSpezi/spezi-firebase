//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { SchemaConverter } from '../../src/utils/schemaConverter.js'

describe('SchemaConverter', () => {
  // Create a simple class for testing
  class TestClass {
    constructor(public readonly value: string) {}
  }

  describe('constructor', () => {
    test('should create a SchemaConverter instance', () => {
      const converter = new SchemaConverter<TestClass, any>({
        schema: z.string().transform((val) => new TestClass(val)),
        encode: (obj: TestClass) => obj.value,
      })

      expect(converter).toBeInstanceOf(SchemaConverter)
      expect(converter).toHaveProperty('schema')
      expect(converter).toHaveProperty('encode')
    })
  })

  describe('schema and encode', () => {
    test('should handle simple schema transformations', () => {
      const converter = new SchemaConverter<TestClass, any>({
        schema: z.string().transform((val) => new TestClass(val)),
        encode: (obj: TestClass) => obj.value,
      })

      // Test schema parsing
      const result = converter.schema.parse('test value')
      expect(result).toBeInstanceOf(TestClass)
      expect(result.value).toBe('test value')

      // Test encoding
      const encoded = converter.encode(new TestClass('test value'))
      expect(encoded).toBe('test value')
    })

    test('should handle complex objects', () => {
      interface ComplexData {
        id: string
        count: number
        items: string[]
      }

      class ComplexClass implements ComplexData {
        constructor(
          public readonly id: string,
          public readonly count: number,
          public readonly items: string[],
        ) {}
      }

      const converter = new SchemaConverter<ComplexClass, any>({
        schema: z
          .object({
            id: z.string(),
            count: z.number(),
            items: z.array(z.string()),
          })
          .transform((val) => new ComplexClass(val.id, val.count, val.items)),
        encode: (obj: ComplexClass) => ({
          id: obj.id,
          count: obj.count,
          items: obj.items,
        }),
      })

      // Create a test instance
      const testData = {
        id: 'id-123',
        count: 42,
        items: ['a', 'b', 'c'],
      }

      // Test encoding
      const instance = new ComplexClass(
        testData.id,
        testData.count,
        testData.items,
      )
      const encoded = converter.encode(instance)

      expect(encoded).toEqual(testData)
    })
  })
})
