//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//


import { dateConverter } from '../../src/utils/dateConverter.js'

describe('DateConverter', () => {
  describe('encode', () => {
    test('should convert a Date to Firestore timestamp format', () => {
      const date = new Date('2024-04-23T12:00:00Z')
      const encoded = dateConverter.encode(date)

      expect(encoded).toBeObject()
      expect(encoded).toHaveProperty("seconds")
      expect(encoded).toHaveProperty("nanoseconds")

      // 2024-04-23T12:00:00Z in seconds since epoch
      expect(encoded.seconds).toBe(Math.floor(date.getTime() / 1000))
      expect(encoded.nanoseconds).toBe((date.getTime() % 1000) * 1000000)
    })

    test('should handle milliseconds correctly', () => {
      const date = new Date('2024-04-23T12:00:00.123Z')
      const encoded = dateConverter.encode(date)

      expect(encoded.nanoseconds).toBe(123 * 1000000)
    })
  })

  describe('schema', () => {
    test('should parse a Date object', () => {
      const date = new Date()
      const parsed = dateConverter.schema.parse(date)

      expect(parsed).toBeInstanceOf(Date)
      expect(parsed.getTime()).toBe(date.getTime())
    })

    test('should parse a date string', () => {
      const dateStr = '2024-04-23T12:00:00Z'
      const expected = new Date(dateStr)
      const parsed = dateConverter.schema.parse(dateStr)

      expect(parsed).toBeInstanceOf(Date)
      expect(parsed.toISOString()).toBe(expected.toISOString())
    })

    test('should parse a Firestore timestamp', () => {
      const date = new Date('2024-04-23T12:00:00Z')
      const timestamp = {
        seconds: Math.floor(date.getTime() / 1000),
        nanoseconds: 0,
      }

      const parsed = dateConverter.schema.parse(timestamp)

      expect(parsed).toBeInstanceOf(Date)
      expect(Math.floor(parsed.getTime() / 1000)).toBe(timestamp.seconds)
    })
  })
})
