/**
 * Firebase function for registering a device
 */

import { z } from 'zod';
import { deviceConverter } from '../models/device.js';
import { NotificationService } from '../services/notificationService.js';

export const registerDeviceInputSchema = deviceConverter.schema;
export type RegisterDeviceInput = z.input<typeof registerDeviceInputSchema>;
export type RegisterDeviceOutput = undefined;

/**
 * Create a register device function handler
 * @param notificationService The notification service
 */
export function createRegisterDeviceHandler(notificationService: NotificationService) {
  return async (
    userId: string,
    data: RegisterDeviceInput
  ): Promise<RegisterDeviceOutput> => {
    const device = deviceConverter.schema.parse(data);
    await notificationService.registerDevice(userId, device);
  };
}