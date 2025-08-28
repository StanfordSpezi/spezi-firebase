//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Advance a date by a specified number of days.
 */
export function advanceDateByDays(date: Date, days: number): Date {
  return advanceDateBySeconds(date, days * 24 * 60 * 60)
}

/**
 * Advance a date by a specified number of hours.
 */
export function advanceDateByHours(date: Date, hours: number): Date {
  return advanceDateBySeconds(date, hours * 60 * 60)
}

/**
 * Advance a date by a specified number of minutes.
 */
export function advanceDateByMinutes(date: Date, minutes: number): Date {
  return advanceDateBySeconds(date, minutes * 60)
}

/**
 * Advance a date by a specified number of seconds.
 */
export function advanceDateBySeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000)
}
