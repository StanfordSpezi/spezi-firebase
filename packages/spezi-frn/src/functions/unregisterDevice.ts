//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Firebase function for unregistering a device
 */

import { z } from 'zod'
import { DevicePlatform } from '../models/device.js'
import { type NotificationService } from '../services/notificationService.js'

export const unregisterDeviceInputSchema = z.object({
  notificationToken: z.string(),
  platform: z.nativeEnum(DevicePlatform),
})

export type UnregisterDeviceInput = z.input<typeof unregisterDeviceInputSchema>
export type UnregisterDeviceOutput = undefined

/**
 * Create an unregister device function handler
 * @param notificationService The notification service
 */
export function createUnregisterDeviceHandler(
  notificationService: NotificationService,
) {
  return async (
    userId: string,
    data: UnregisterDeviceInput,
  ): Promise<UnregisterDeviceOutput> => {
    const { notificationToken, platform } =
      unregisterDeviceInputSchema.parse(data)
    await notificationService.unregisterDevice(
      userId,
      notificationToken,
      platform,
    )
  }
}
