//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Firebase function for registering a device
 */

import { type z } from 'zod'
import { deviceConverter } from '../models/device.js'
import { type NotificationService } from '../services/notificationService.js'

/**
 * Zod schema for register device input validation
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const registerDeviceInputSchema = deviceConverter.schema

/**
 * Type for register device input data
 */
export type RegisterDeviceInput = z.input<typeof registerDeviceInputSchema>

/**
 * Type for register device output (undefined)
 */
export type RegisterDeviceOutput = undefined

/**
 * Create a register device function handler
 * @param notificationService The notification service
 * @returns A function that handles device registration
 */
export function createRegisterDeviceHandler(
  notificationService: NotificationService,
) {
  return async (
    userId: string,
    data: RegisterDeviceInput,
  ): Promise<RegisterDeviceOutput> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const device = deviceConverter.schema.parse(data)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await notificationService.registerDevice(userId, device)
  }
}
