//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import { dateConverter } from '../../src/helpers/dateConverter.js'

describe('DateConverter', () => {
  describe('schema', () => {
    it('should transform a valid ISO string to a Date object', () => {
      const isoString = '2023-05-15T10:30:45.000Z'
      const result = dateConverter.schema.parse(isoString)

      expect(result).to.be.instanceOf(Date)
      expect(result.toISOString()).to.equal(isoString)
    })

    it('should handle date strings in other formats', () => {
      const dateStr = 'May 15, 2023 10:30:45'
      const result = dateConverter.schema.parse(dateStr)

      expect(result).to.be.instanceOf(Date)
      expect(result.getFullYear()).to.equal(2023)
      expect(result.getMonth()).to.equal(4) // May is month 4 (0-based)
      expect(result.getDate()).to.equal(15)
    })

    it('should throw for invalid date strings', () => {
      expect(() => dateConverter.schema.parse('not a date')).to.throw()
    })
  })

  describe('encode', () => {
    it('should encode Date objects to ISO strings', () => {
      const date = new Date('2023-05-15T10:30:45.000Z')
      const result = dateConverter.encode(date)

      expect(result).to.be.a('string')
      expect(result).to.equal('2023-05-15T10:30:45.000Z')
    })

    it('should handle dates with timezone information', () => {
      // Create a specific date in local timezone
      const date = new Date(2023, 4, 15, 10, 30, 45) // May 15, 2023 10:30:45 local time
      const result = dateConverter.encode(date)

      expect(result).to.equal(date.toISOString())
      expect(new Date(result).getTime()).to.equal(date.getTime())
    })
  })

  describe('roundtrip', () => {
    it('should preserve date value in a decode-encode roundtrip', () => {
      const originalIso = '2023-05-15T10:30:45.000Z'
      const date = dateConverter.schema.parse(originalIso)
      const encodedAgain = dateConverter.encode(date)

      expect(encodedAgain).to.equal(originalIso)
    })

    it('should preserve date value in an encode-decode roundtrip', () => {
      const original = new Date('2023-05-15T10:30:45.000Z')
      const encoded = dateConverter.encode(original)
      const decodedAgain = dateConverter.schema.parse(encoded)

      expect(decodedAgain.getTime()).to.equal(original.getTime())
    })
  })
})
