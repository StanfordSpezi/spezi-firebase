//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Device model for managing notification registrations
 */

import { z } from 'zod'
import { SchemaConverter } from '../utils/schemaConverter.js'

/**
 * Standard platform identifiers for common device platforms.
 * These are provided for convenience but any string value can be used
 * when creating a device.
 */
export const DevicePlatform = {
  Android: 'Android',
  iOS: 'iOS',
  Web: 'Web',
  macOS: 'macOS',
  Windows: 'Windows',
  Linux: 'Linux',
} as const

/**
 * Schema converter for Device objects, providing validation and encoding
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deviceConverter = new SchemaConverter<Device, any>({
  schema: z
    .object({
      notificationToken: z.string(),
      platform: z.string(),
      osVersion: z.string().optional(),
      appVersion: z.string().optional(),
      appBuild: z.string().optional(),
      language: z.string().optional(),
      timeZone: z.string().optional(),
    })
    .transform((values) => new Device(values)),
  encode: (object: Device) => ({
    notificationToken: object.notificationToken,
    platform: object.platform,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    osVersion: object.osVersion ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    appVersion: object.appVersion ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    appBuild: object.appBuild ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    language: object.language ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    timeZone: object.timeZone ?? undefined,
  }),
})

/**
 * Represents a device registered for push notifications
 */
export class Device {
  // Properties
  readonly notificationToken: string
  readonly platform: string
  readonly osVersion?: string
  readonly appVersion?: string
  readonly appBuild?: string
  readonly language?: string
  readonly timeZone?: string

  /**
   * Creates a new Device instance
   * @param input Device properties
   * @param input.notificationToken The notification token for push notifications
   * @param input.platform The device platform (e.g., iOS, Android)
   * @param input.osVersion The operating system version
   * @param input.appVersion The application version
   * @param input.appBuild The application build number
   * @param input.language The preferred language code
   * @param input.timeZone The device time zone
   */
  // Constructor
  constructor(input: {
    notificationToken: string
    platform: string
    osVersion?: string
    appVersion?: string
    appBuild?: string
    language?: string
    timeZone?: string
  }) {
    this.notificationToken = input.notificationToken
    this.platform = input.platform
    this.osVersion = input.osVersion
    this.appVersion = input.appVersion
    this.appBuild = input.appBuild
    this.language = input.language
    this.timeZone = input.timeZone
  }
}
