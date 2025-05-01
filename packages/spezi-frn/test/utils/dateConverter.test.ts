//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import { dateConverter } from '../../src/utils/dateConverter.js'

describe('DateConverter', () => {
  describe('encode', () => {
    it('should convert a Date to Firestore timestamp format', () => {
      const date = new Date('2024-04-23T12:00:00Z')
      const encoded = dateConverter.encode(date)

      expect(encoded).to.be.an('object')
      expect(encoded).to.have.property('seconds')
      expect(encoded).to.have.property('nanoseconds')

      // 2024-04-23T12:00:00Z in seconds since epoch
      expect(encoded.seconds).to.equal(Math.floor(date.getTime() / 1000))
      expect(encoded.nanoseconds).to.equal((date.getTime() % 1000) * 1000000)
    })

    it('should handle milliseconds correctly', () => {
      const date = new Date('2024-04-23T12:00:00.123Z')
      const encoded = dateConverter.encode(date)

      expect(encoded.nanoseconds).to.equal(123 * 1000000)
    })
  })

  describe('schema', () => {
    it('should parse a Date object', () => {
      const date = new Date()
      const parsed = dateConverter.schema.parse(date)

      expect(parsed).to.be.instanceof(Date)
      expect(parsed.getTime()).to.equal(date.getTime())
    })

    it('should parse a date string', () => {
      const dateStr = '2024-04-23T12:00:00Z'
      const expected = new Date(dateStr)
      const parsed = dateConverter.schema.parse(dateStr)

      expect(parsed).to.be.instanceof(Date)
      expect(parsed.toISOString()).to.equal(expected.toISOString())
    })

    it('should parse a Firestore timestamp', () => {
      const date = new Date('2024-04-23T12:00:00Z')
      const timestamp = {
        seconds: Math.floor(date.getTime() / 1000),
        nanoseconds: 0,
      }

      const parsed = dateConverter.schema.parse(timestamp)

      expect(parsed).to.be.instanceof(Date)
      expect(Math.floor(parsed.getTime() / 1000)).to.equal(timestamp.seconds)
    })
  })
})
