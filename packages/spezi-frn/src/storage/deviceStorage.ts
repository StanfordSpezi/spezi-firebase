/**
 * Interface for device token storage
 */

import { type Device } from '../models/device.js'

export interface Document<T> {
  id: string
  path: string
  lastUpdate: Date
  content: T
}

export interface DeviceStorage {
  /**
   * Store a device
   * @param userId The user ID
   * @param device The device to store
   */
  storeDevice(userId: string, device: Device): Promise<void>

  /**
   * Remove a device
   * @param userId The user ID
   * @param notificationToken The notification token to remove
   * @param platform The device platform
   */
  removeDevice(
    userId: string,
    notificationToken: string,
    platform: string,
  ): Promise<void>

  /**
   * Get all devices for a user
   * @param userId The user ID
   * @returns Array of device documents
   */
  getUserDevices(userId: string): Promise<Array<Document<Device>>>

  /**
   * Remove an invalid token across all users
   * @param notificationToken The invalid token to remove
   */
  removeInvalidToken(notificationToken: string): Promise<void>
}
