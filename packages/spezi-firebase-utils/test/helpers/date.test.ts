//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

// Using Jest assertions
import {
  advanceDateByDays,
  advanceDateByHours,
  advanceDateByMinutes,
  advanceDateBySeconds,
} from '../../src/helpers/date.js'

describe('Date Helpers', () => {
  const baseDateISO = '2023-01-01T12:00:00.000Z'
  let baseDate: Date

  beforeEach(() => {
    baseDate = new Date(baseDateISO)
  })

  describe('advanceDateBySeconds', () => {
    it('should advance date by positive seconds', () => {
      const result = advanceDateBySeconds(baseDate, 30)
      expect(result.getTime()).toBe(baseDate.getTime() + 30 * 1000)
    })

    it('should go back in time with negative seconds', () => {
      const result = advanceDateBySeconds(baseDate, -60)
      expect(result.getTime()).toBe(baseDate.getTime() - 60 * 1000)
    })

    it('should not modify the original date', () => {
      advanceDateBySeconds(baseDate, 30)
      expect(baseDate.toISOString()).toBe(baseDateISO)
    })

    it('should handle 0 seconds', () => {
      const result = advanceDateBySeconds(baseDate, 0)
      expect(result.getTime()).toBe(baseDate.getTime())
    })
  })

  describe('advanceDateByMinutes', () => {
    it('should advance date by positive minutes', () => {
      const result = advanceDateByMinutes(baseDate, 5)
      expect(result.getTime()).toBe(baseDate.getTime() + 5 * 60 * 1000)
    })

    it('should go back in time with negative minutes', () => {
      const result = advanceDateByMinutes(baseDate, -10)
      expect(result.getTime()).toBe(baseDate.getTime() - 10 * 60 * 1000)
    })
  })

  describe('advanceDateByHours', () => {
    it('should advance date by positive hours', () => {
      const result = advanceDateByHours(baseDate, 3)
      expect(result.getTime()).toBe(baseDate.getTime() + 3 * 60 * 60 * 1000)
    })

    it('should go back in time with negative hours', () => {
      const result = advanceDateByHours(baseDate, -5)
      expect(result.getTime()).toBe(baseDate.getTime() - 5 * 60 * 60 * 1000)
    })
  })

  describe('advanceDateByDays', () => {
    it('should advance date by positive days', () => {
      const result = advanceDateByDays(baseDate, 2)
      expect(result.getTime()).toBe(
        baseDate.getTime() + 2 * 24 * 60 * 60 * 1000,
      )
    })

    it('should go back in time with negative days', () => {
      const result = advanceDateByDays(baseDate, -3)
      expect(result.getTime()).toBe(
        baseDate.getTime() - 3 * 24 * 60 * 60 * 1000,
      )
    })

    it('should handle fractional days', () => {
      const result = advanceDateByDays(baseDate, 1.5)
      expect(result.getTime()).toBe(
        baseDate.getTime() + 1.5 * 24 * 60 * 60 * 1000,
      )
    })
  })
})
