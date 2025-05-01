//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import { capitalize } from '../../src/helpers/string.js'

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalize('hello world')).to.equal('Hello World')
      expect(capitalize('john doe')).to.equal('John Doe')
    })

    it('should handle already capitalized words', () => {
      expect(capitalize('Hello World')).to.equal('Hello World')
      expect(capitalize('HELLO WORLD')).to.equal('HELLO WORLD')
    })

    it('should handle mixed case words', () => {
      expect(capitalize('hello World')).to.equal('Hello World')
      expect(capitalize('HELLO world')).to.equal('HELLO World')
    })

    it('should handle single word', () => {
      expect(capitalize('test')).to.equal('Test')
      expect(capitalize('TEST')).to.equal('TEST')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).to.equal('')
    })

    it('should handle string with numbers and special characters', () => {
      expect(capitalize('hello 123 world!')).to.equal('Hello 123 World!')
      expect(capitalize('test-case')).to.equal('Test-case')
    })

    it('should handle multiple spaces', () => {
      expect(capitalize('hello  world')).to.equal('Hello  World')
    })

    it('should handle leading and trailing spaces', () => {
      expect(capitalize(' hello world ')).to.equal(' Hello World ')
    })
  })
})