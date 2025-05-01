//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import { z } from 'zod'
import { optionalish, optionalishDefault } from '../../src/helpers/optionalish.js'

describe('Optionalish Utilities', () => {
  describe('optionalish', () => {
    const stringSchema = z.string()
    const optionalStringSchema = optionalish(stringSchema)

    it('should pass through valid values', () => {
      expect(optionalStringSchema.parse('test')).to.equal('test')
    })

    it('should convert null to undefined', () => {
      expect(optionalStringSchema.parse(null)).to.be.undefined
    })

    it('should pass through undefined', () => {
      expect(optionalStringSchema.parse(undefined)).to.be.undefined
    })

    it('should handle missing properties in objects', () => {
      const objSchema = z.object({
        name: optionalish(z.string()),
      })

      const emptyResult = objSchema.parse({})
      // Zod's behavior might vary in how it represents these properties internally
      // so we check the specific property rather than full equality
      expect(emptyResult.name).to.be.undefined
      
      expect(objSchema.parse({ name: 'test' })).to.deep.equal({ name: 'test' })
      
      const nullResult = objSchema.parse({ name: null })
      expect(nullResult.name).to.be.undefined
    })

    it('should still validate the type if not null/undefined', () => {
      expect(() => optionalStringSchema.parse(123)).to.throw()
    })
  })

  describe('optionalishDefault', () => {
    const defaultValue = 'default'
    const stringSchema = z.string()
    const defaultStringSchema = optionalishDefault(stringSchema, defaultValue)

    it('should pass through valid values', () => {
      expect(defaultStringSchema.parse('test')).to.equal('test')
    })

    it('should replace null with default value', () => {
      expect(defaultStringSchema.parse(null)).to.equal(defaultValue)
    })

    it('should replace undefined with default value', () => {
      expect(defaultStringSchema.parse(undefined)).to.equal(defaultValue)
    })

    it('should work with objects', () => {
      const objSchema = z.object({
        count: optionalishDefault(z.number(), 0),
        name: optionalishDefault(z.string(), 'unnamed'),
      })

      expect(objSchema.parse({})).to.deep.equal({ count: 0, name: 'unnamed' })
      expect(objSchema.parse({ count: null })).to.deep.equal({ count: 0, name: 'unnamed' })
      expect(objSchema.parse({ count: 42, name: null })).to.deep.equal({ count: 42, name: 'unnamed' })
    })

    it('should work with complex default values', () => {
      const arraySchema = optionalishDefault(z.array(z.number()), [1, 2, 3])
      expect(arraySchema.parse(null)).to.deep.equal([1, 2, 3])
      
      const objSchema = optionalishDefault(
        z.object({ a: z.number(), b: z.string() }),
        { a: 1, b: 'default' }
      )
      expect(objSchema.parse(null)).to.deep.equal({ a: 1, b: 'default' })
    })

    it('should still validate the type if not null/undefined', () => {
      expect(() => defaultStringSchema.parse(123)).to.throw()
    })
  })
})