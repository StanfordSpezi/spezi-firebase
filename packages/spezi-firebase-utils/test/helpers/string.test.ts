//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Using Jest assertions
import { capitalize } from '../../src/helpers/string.js'

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalize('hello world')).toBe('Hello World')
      expect(capitalize('john doe')).toBe('John Doe')
    })

    it('should handle already capitalized words', () => {
      expect(capitalize('Hello World')).toBe('Hello World')
      expect(capitalize('HELLO WORLD')).toBe('HELLO WORLD')
    })

    it('should handle mixed case words', () => {
      expect(capitalize('hello World')).toBe('Hello World')
      expect(capitalize('HELLO world')).toBe('HELLO World')
    })

    it('should handle single word', () => {
      expect(capitalize('test')).toBe('Test')
      expect(capitalize('TEST')).toBe('TEST')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle string with numbers and special characters', () => {
      expect(capitalize('hello 123 world!')).toBe('Hello 123 World!')
      expect(capitalize('test-case')).toBe('Test-case')
    })

    it('should handle multiple spaces', () => {
      expect(capitalize('hello  world')).toBe('Hello  World')
    })

    it('should handle leading and trailing spaces', () => {
      expect(capitalize(' hello world ')).toBe(' Hello World ')
    })
  })
})
