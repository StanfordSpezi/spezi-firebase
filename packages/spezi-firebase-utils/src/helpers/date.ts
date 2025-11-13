//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Advance a date by a specified number of days.
 * @param date The date to advance
 * @param days Number of days to add
 * @returns New date advanced by the specified days
 */
export function advanceDateByDays(date: Date, days: number): Date {
  return advanceDateBySeconds(date, days * 24 * 60 * 60)
}

/**
 * Advance a date by a specified number of hours.
 * @param date The date to advance
 * @param hours Number of hours to add
 * @returns New date advanced by the specified hours
 */
export function advanceDateByHours(date: Date, hours: number): Date {
  return advanceDateBySeconds(date, hours * 60 * 60)
}

/**
 * Advance a date by a specified number of minutes.
 * @param date The date to advance
 * @param minutes Number of minutes to add
 * @returns New date advanced by the specified minutes
 */
export function advanceDateByMinutes(date: Date, minutes: number): Date {
  return advanceDateBySeconds(date, minutes * 60)
}

/**
 * Advance a date by a specified number of seconds.
 * @param date The date to advance
 * @param seconds Number of seconds to add
 * @returns New date advanced by the specified seconds
 */
export function advanceDateBySeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000)
}
