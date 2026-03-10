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
export const advanceDateByDays = (date: Date, days: number): Date =>
  advanceDateBySeconds(date, days * 24 * 60 * 60);

/**
 * Advance a date by a specified number of hours.
 * @param date The date to advance
 * @param hours Number of hours to add
 * @returns New date advanced by the specified hours
 */
export const advanceDateByHours = (date: Date, hours: number): Date =>
  advanceDateBySeconds(date, hours * 60 * 60);

/**
 * Advance a date by a specified number of minutes.
 * @param date The date to advance
 * @param minutes Number of minutes to add
 * @returns New date advanced by the specified minutes
 */
export const advanceDateByMinutes = (date: Date, minutes: number): Date =>
  advanceDateBySeconds(date, minutes * 60);

/**
 * Advance a date by a specified number of seconds.
 * @param date The date to advance
 * @param seconds Number of seconds to add
 * @returns New date advanced by the specified seconds
 */
export const advanceDateBySeconds = (date: Date, seconds: number): Date =>
  new Date(date.getTime() + seconds * 1000);
