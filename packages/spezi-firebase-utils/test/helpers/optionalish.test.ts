//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Using Jest assertions
import { z } from 'zod/v4'
import {
  optionalish,
  optionalishDefault,
} from '../../src/helpers/optionalish.js'

describe('Optionalish Utilities', () => {
  describe('optionalish', () => {
    const stringSchema = z.string()
    const optionalStringSchema = optionalish(stringSchema)

    it('should pass through valid values', () => {
      expect(optionalStringSchema.parse('test')).toBe('test')
    })

    it('should convert null to undefined', () => {
      expect(optionalStringSchema.parse(null)).toBeUndefined()
    })

    it('should pass through undefined', () => {
      expect(optionalStringSchema.parse(undefined)).toBeUndefined()
    })

    it('should handle missing properties in objects', () => {
      const objSchema = z.object({
        name: optionalish(z.string()),
      })

      const emptyResult = objSchema.parse({})
      // Zod's behavior might vary in how it represents these properties internally
      // so we check the specific property rather than full equality
      expect(emptyResult.name).toBeUndefined()

      expect(objSchema.parse({ name: 'test' })).toEqual({ name: 'test' })

      const nullResult = objSchema.parse({ name: null })
      expect(nullResult.name).toBeUndefined()
    })

    it('should still validate the type if not null/undefined', () => {
      expect(() => optionalStringSchema.parse(123)).toThrow()
    })
  })

  describe('optionalishDefault', () => {
    const defaultValue = 'default'
    const stringSchema = z.string()
    const defaultStringSchema = optionalishDefault(stringSchema, defaultValue)

    it('should pass through valid values', () => {
      expect(defaultStringSchema.parse('test')).toBe('test')
    })

    it('should replace null with default value', () => {
      expect(defaultStringSchema.parse(null)).toBe(defaultValue)
    })

    it('should replace undefined with default value', () => {
      expect(defaultStringSchema.parse(undefined)).toBe(defaultValue)
    })

    it('should work with objects', () => {
      const objSchema = z.object({
        count: optionalishDefault(z.number(), 0),
        name: optionalishDefault(z.string(), 'unnamed'),
      })

      expect(objSchema.parse({})).toEqual({ count: 0, name: 'unnamed' })
      expect(objSchema.parse({ count: null })).toEqual({
        count: 0,
        name: 'unnamed',
      })
      expect(objSchema.parse({ count: 42, name: null })).toEqual({
        count: 42,
        name: 'unnamed',
      })
    })

    it('should work with complex default values', () => {
      const arraySchema = optionalishDefault(z.array(z.number()), [1, 2, 3])
      expect(arraySchema.parse(null)).toEqual([1, 2, 3])

      const objSchema = optionalishDefault(
        z.object({ a: z.number(), b: z.string() }),
        { a: 1, b: 'default' },
      )
      expect(objSchema.parse(null)).toEqual({ a: 1, b: 'default' })
    })

    it('should still validate the type if not null/undefined', () => {
      expect(() => defaultStringSchema.parse(123)).toThrow()
    })
  })
})
