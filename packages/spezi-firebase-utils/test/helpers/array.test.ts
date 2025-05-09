//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
import {
  average,
  chunks,
  compact,
  compactMap,
  median,
  percentage,
  percentile,
  presortedMedian,
  presortedPercentile,
} from '../../src/helpers/array.js'

describe('Array Helpers', () => {
  describe('average', () => {
    it('should calculate the average of non-empty arrays', () => {
      expect(average([1, 2, 3, 4, 5])).to.equal(3)
      expect(average([10, 20])).to.equal(15)
      expect(average([-5, 5])).to.equal(0)
    })

    it('should return undefined for empty arrays', () => {
      expect(average([])).to.be.undefined
    })
  })

  describe('chunks', () => {
    it('should split arrays into chunks of the specified size', () => {
      expect(chunks([1, 2, 3, 4, 5], 2)).to.deep.equal([[1, 2], [3, 4], [5]])
      expect(chunks([1, 2, 3, 4], 2)).to.deep.equal([
        [1, 2],
        [3, 4],
      ])
      expect(chunks([1, 2, 3], 1)).to.deep.equal([[1], [2], [3]])
      expect(chunks([1, 2, 3, 4, 5], 10)).to.deep.equal([[1, 2, 3, 4, 5]])
    })

    it('should handle empty arrays', () => {
      expect(chunks([], 3)).to.deep.equal([])
    })
  })

  describe('compact', () => {
    it('should filter out undefined values', () => {
      expect(compact([1, undefined, 2, undefined, 3])).to.deep.equal([1, 2, 3])
      expect(compact([undefined, undefined])).to.deep.equal([])
      expect(compact([1, 2, 3])).to.deep.equal([1, 2, 3])
    })

    it('should filter out null values', () => {
      expect(compact([1, null, 2, null, 3])).to.deep.equal([1, 2, 3])
      expect(compact([null, null])).to.deep.equal([])
    })

    it('should filter out both null and undefined values', () => {
      expect(
        compact([1, null, undefined, 2, null, undefined, 3]),
      ).to.deep.equal([1, 2, 3])
    })
  })

  describe('compactMap', () => {
    it('should map and filter undefined results', () => {
      const mapFn = (num: number) => (num % 2 === 0 ? num * 2 : undefined)
      expect(compactMap([1, 2, 3, 4, 5], mapFn)).to.deep.equal([4, 8])
    })

    it('should map and filter null results', () => {
      const mapFn = (num: number) => (num % 2 === 0 ? num * 2 : null)
      expect(compactMap([1, 2, 3, 4, 5], mapFn)).to.deep.equal([4, 8])
    })

    it('should filter both null and undefined input values', () => {
      expect(compactMap([1, null, 2, undefined, 3], (n) => n)).to.deep.equal([
        1, 2, 3,
      ])
    })

    it('should handle example from documentation', () => {
      const userIds = ['user1', 'user2', null, 'user3', undefined]
      expect(compactMap(userIds, (id) => id)).to.deep.equal([
        'user1',
        'user2',
        'user3',
      ])
    })

    it('should handle empty arrays', () => {
      expect(compactMap([], (n) => n)).to.deep.equal([])
    })

    it('should handle all items mapping to undefined or null', () => {
      expect(
        compactMap([1, 3, 5], (n) => (n % 2 === 0 ? n : undefined)),
      ).to.deep.equal([])
      expect(
        compactMap([1, 3, 5], (n) => (n % 2 === 0 ? n : null)),
      ).to.deep.equal([])
    })
  })

  describe('median', () => {
    it('should calculate the median for odd-length arrays', () => {
      expect(median([1, 5, 3, 2, 4])).to.equal(3)
    })

    it('should calculate the median for even-length arrays', () => {
      expect(median([1, 2, 3, 4])).to.equal(2.5)
    })

    it('should return the single value for arrays of length 1', () => {
      expect(median([42])).to.equal(42)
    })

    it('should return undefined for empty arrays', () => {
      expect(median([])).to.be.undefined
    })
  })

  describe('presortedMedian', () => {
    it('should calculate the median for already sorted arrays', () => {
      expect(presortedMedian([1, 2, 3, 4, 5])).to.equal(3)
      expect(presortedMedian([1, 2, 3, 4])).to.equal(2.5)
    })
  })

  describe('percentile', () => {
    it('should calculate percentiles correctly', () => {
      const data = [15, 20, 35, 40, 50]
      expect(percentile(data, 0)).to.equal(15)
      expect(percentile(data, 0.25)).to.equal(20)
      expect(percentile(data, 0.5)).to.equal(35)
      expect(percentile(data, 0.75)).to.equal(40)
      expect(percentile(data, 1)).to.equal(50)
    })

    it('should handle percentiles that fall between values', () => {
      const result = percentile([10, 20, 30, 40], 0.33)
      expect(result).to.not.be.undefined
      if (result !== undefined) {
        expect(result).to.be.closeTo(19.9, 0.1)
      }
    })
  })

  describe('presortedPercentile', () => {
    it('should calculate percentiles for already sorted arrays', () => {
      expect(presortedPercentile([10, 20, 30, 40, 50], 0.5)).to.equal(30)
      expect(presortedPercentile([10, 20, 30, 40], 0.5)).to.equal(25)
    })
  })

  describe('percentage', () => {
    it('should calculate the percentage of matching values', () => {
      const isEven = (n: number) => n % 2 === 0
      expect(percentage([1, 2, 3, 4, 5], isEven)).to.equal(40)
      expect(percentage([2, 4, 6], isEven)).to.equal(100)
      expect(percentage([1, 3, 5], isEven)).to.equal(0)
    })

    it('should return undefined for empty arrays', () => {
      expect(percentage([], () => true)).to.be.undefined
    })
  })
})
