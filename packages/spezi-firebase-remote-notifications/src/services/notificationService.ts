//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Interface for notification service
 */

import { type Device } from '../models/device.js'
import { type Message } from '../models/message.js'
import { type Document } from '../storage/deviceStorage.js'

export interface NotificationService {
  /**
   * Register a device for notifications
   * @param userId The user ID
   * @param device The device to register
   */
  registerDevice(userId: string, device: Device): Promise<void>

  /**
   * Unregister a device from notifications
   * @param userId The user ID
   * @param notificationToken The notification token
   * @param platform The device platform
   */
  unregisterDevice(
    userId: string,
    notificationToken: string,
    platform: string,
  ): Promise<void>

  /**
   * Send a notification to a user
   * @param userId The user ID
   * @param notification The notification content
   * @param options Additional options for the notification
   */
  sendNotification(
    userId: string,
    notification: {
      title: Record<string, string>
      body: Record<string, string>
      data?: Record<string, string>
    },
    options?: {
      language?: string
    },
  ): Promise<void>

  /**
   * Send a notification based on a message
   * @param userId The user ID to send to
   * @param message The message to send
   * @param options Additional options
   */
  sendMessageNotification(
    userId: string,
    message: Document<Message>,
    options?: {
      language?: string
    },
  ): Promise<void>
}
