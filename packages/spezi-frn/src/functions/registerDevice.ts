/**
 * Firebase function for registering a device
 */

import { type z } from 'zod'
import { deviceConverter } from '../models/device.js'
import { type NotificationService } from '../services/notificationService.js'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const registerDeviceInputSchema = deviceConverter.schema
export type RegisterDeviceInput = z.input<typeof registerDeviceInputSchema>
export type RegisterDeviceOutput = undefined

/**
 * Create a register device function handler
 * @param notificationService The notification service
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
