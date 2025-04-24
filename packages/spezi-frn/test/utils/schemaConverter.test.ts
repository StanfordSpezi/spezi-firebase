import { expect } from 'chai'
import { z } from 'zod'
import { SchemaConverter } from '../../src/utils/schemaConverter.js'

describe('SchemaConverter', () => {
  // Create a simple class for testing
  class TestClass {
    constructor(public readonly value: string) {}
  }

  describe('constructor', () => {
    it('should create a SchemaConverter instance', () => {
      const converter = new SchemaConverter<TestClass, any>({
        schema: z.string().transform((val) => new TestClass(val)),
        encode: (obj: TestClass) => obj.value,
      })

      expect(converter).to.be.an.instanceOf(SchemaConverter)
      expect(converter).to.have.property('schema')
      expect(converter).to.have.property('encode')
    })
  })

  describe('schema and encode', () => {
    it('should handle simple schema transformations', () => {
      const converter = new SchemaConverter<TestClass, any>({
        schema: z.string().transform((val) => new TestClass(val)),
        encode: (obj: TestClass) => obj.value,
      })

      // Test schema parsing
      const result = converter.schema.parse('test value')
      expect(result).to.be.an.instanceOf(TestClass)
      expect(result.value).to.equal('test value')

      // Test encoding
      const encoded = converter.encode(new TestClass('test value'))
      expect(encoded).to.equal('test value')
    })

    it('should handle complex objects', () => {
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

      expect(encoded).to.deep.equal(testData)
    })
  })
})
