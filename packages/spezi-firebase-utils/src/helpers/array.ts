//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Calculate the average of an array of numbers.
 * Returns undefined if the array is empty.
 * @param values Array of numbers to average
 * @returns The average value, or undefined if array is empty
 */
export function average(values: number[]): number | undefined {
  return values.length === 0 ?
      undefined
    : values.reduce((a, b) => a + b, 0) / values.length
}

/**
 * Split an array into chunks of the specified size.
 * @param array The array to split
 * @param size The size of each chunk
 * @returns Array of chunks
 */
export function chunks<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size),
  )
}

/**
 * Filter out undefined and null values from an array.
 * @param array Array that may contain undefined or null values
 * @returns Array with all undefined and null values removed
 */
export function compact<T>(array: Array<T | undefined | null>): T[] {
  return array.flatMap((value) =>
    value !== undefined && value !== null ? [value] : [],
  )
}

/**
 * Map an array to a new array, filtering out undefined and null results.
 * @param array The source array
 * @param map Mapping function that may return undefined or null
 * @returns Array of successfully mapped values
 */
export function compactMap<T, V>(
  array: T[],
  map: (arg0: T) => V | undefined | null,
): V[] {
  return array.flatMap((value) => {
    const mappedValue = map(value)
    return mappedValue !== undefined && mappedValue !== null ?
        [mappedValue]
      : []
  })
}

/**
 * Calculate the median of an array of numbers.
 * Returns undefined if the array is empty.
 * @param values Array of numbers
 * @returns The median value, or undefined if array is empty
 */
export function median(values: number[]): number | undefined {
  return presortedPercentile(
    [...values].sort((a, b) => a - b),
    0.5,
  )
}

/**
 * Calculate the median of an already sorted array of numbers.
 * Returns undefined if the array is empty.
 * @param values Sorted array of numbers
 * @returns The median value, or undefined if array is empty
 */
export function presortedMedian(values: number[]): number | undefined {
  return presortedPercentile(values, 0.5)
}

/**
 * Calculate a percentile of an array of numbers.
 * Returns undefined if the array is empty.
 * @param values Array of numbers
 * @param percentile Percentile value between 0 and 1
 * @returns The percentile value, or undefined if array is empty
 */
export function percentile(
  values: number[],
  percentile: number,
): number | undefined {
  return presortedPercentile(
    [...values].sort((a, b) => a - b),
    percentile,
  )
}

/**
 * Calculate a percentile of an already sorted array of numbers.
 * Returns undefined if the array is empty.
 * @param values Sorted array of numbers
 * @param percentile Percentile value between 0 and 1
 * @returns The percentile value, or undefined if array is empty
 */
export function presortedPercentile(
  values: number[],
  percentile: number,
): number | undefined {
  if (values.length === 0) return undefined
  const index = (values.length - 1) * percentile
  const lowerIndex = Math.floor(index)
  const upperIndex = Math.ceil(index)

  if (lowerIndex === upperIndex) {
    return values[lowerIndex]
  } else {
    const weight = index - lowerIndex
    return values[lowerIndex] * (1 - weight) + values[upperIndex] * weight
  }
}

/**
 * Calculate what percentage of values in an array match a given predicate.
 * Returns undefined if the array is empty.
 * @param values Array of values to check
 * @param filter Predicate function to test each value
 * @returns Percentage of matching values (0-100), or undefined if array is empty
 */
export function percentage<T>(
  values: T[],
  filter: (value: T) => boolean,
): number | undefined {
  const total = values.length
  if (total === 0) return undefined
  const count = values.filter(filter).length
  return (count / total) * 100
}
