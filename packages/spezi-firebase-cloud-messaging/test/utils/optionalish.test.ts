//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { optionalish, optionalishDefault } from '../../src/utils/optionalish.js'

describe('Optionalish Utilities', () => {
  describe('optionalish', () => {
    test('should transform null to undefined', () => {
      const schema = optionalish(z.string())

      expect(schema.parse('hello')).toBe('hello')
      expect(schema.parse(null)).toBeUndefined()
    })

    test('should work with different types', () => {
      const numberSchema = optionalish(z.number())
      const booleanSchema = optionalish(z.boolean())

      expect(numberSchema.parse(42)).toBe(42)
      expect(numberSchema.parse(null)).toBeUndefined()

      expect(booleanSchema.parse(true)).toBe(true)
      expect(booleanSchema.parse(null)).toBeUndefined()
    })

    test('should still validate the inner schema', () => {
      const schema = optionalish(z.string().email())

      expect(() => schema.parse('invalid')).toThrow()
      expect(schema.parse('test@example.com')).toBe('test@example.com')
    })
  })

  describe('optionalishDefault', () => {
    test('should provide a default value when null', () => {
      const schema = optionalishDefault(z.string(), 'default value')

      expect(schema.parse('hello')).toBe('hello')
      expect(schema.parse(null)).toBe('default value')
    })

    test('should work with different types and defaults', () => {
      const numberSchema = optionalishDefault(z.number(), 0)
      const booleanSchema = optionalishDefault(z.boolean(), false)
      const arraySchema = optionalishDefault(z.array(z.string()), ['default'])

      expect(numberSchema.parse(42)).toBe(42)
      expect(numberSchema.parse(null)).toBe(0)

      expect(booleanSchema.parse(true)).toBe(true)
      expect(booleanSchema.parse(null)).toBe(false)

      expect(arraySchema.parse(['a', 'b'])).toEqual(['a', 'b'])
      expect(arraySchema.parse(null)).toEqual(['default'])
    })

    test('should still validate the inner schema', () => {
      const schema = optionalishDefault(
        z.string().email(),
        'default@example.com',
      )

      expect(() => schema.parse('invalid')).toThrow()
      expect(schema.parse('test@example.com')).toBe('test@example.com')
      expect(schema.parse(null)).toBe('default@example.com')
    })
  })
})
