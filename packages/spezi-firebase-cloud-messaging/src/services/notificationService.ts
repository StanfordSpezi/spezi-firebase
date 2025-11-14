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

/**
 * Service interface for managing device notifications
 */
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
   * @param notification.title Localized titles
   * @param notification.body Localized body text
   * @param notification.data Optional custom data
   * @param options Additional options for the notification
   * @param options.language Preferred language for the notification
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
   * @param options.language Preferred language for the notification
   */
  sendMessageNotification(
    userId: string,
    message: Document<Message>,
    options?: {
      language?: string
    },
  ): Promise<void>
}
