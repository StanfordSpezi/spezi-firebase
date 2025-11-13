//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Firebase implementation of notification service
 */

import { type Messaging, type TokenMessage } from 'firebase-admin/messaging'
import { type NotificationService } from './notificationService.js'
import { DevicePlatform, type Device } from '../models/device.js'
import { type Message } from '../models/message.js'
import { type DeviceStorage, type Document } from '../storage/deviceStorage.js'

/**
 * Firebase implementation of the NotificationService interface
 */
export class FirebaseNotificationService implements NotificationService {
  // Properties
  private readonly messaging: Messaging
  private readonly deviceStorage: DeviceStorage

  /**
   * Creates a new FirebaseNotificationService instance
   * @param messaging Firebase messaging instance
   * @param deviceStorage Device storage implementation
   */
  // Constructor
  constructor(messaging: Messaging, deviceStorage: DeviceStorage) {
    this.messaging = messaging
    this.deviceStorage = deviceStorage
  }

  /**
   * Register a device for notifications
   * @param userId The user ID
   * @param device The device to register
   */
  async registerDevice(userId: string, device: Device): Promise<void> {
    await this.deviceStorage.storeDevice(userId, device)
  }

  /**
   * Unregister a device from notifications
   * @param userId The user ID
   * @param notificationToken The notification token
   * @param platform The device platform
   */
  async unregisterDevice(
    userId: string,
    notificationToken: string,
    platform: string,
  ): Promise<void> {
    await this.deviceStorage.removeDevice(userId, notificationToken, platform)
  }

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
  async sendNotification(
    userId: string,
    notification: {
      title: Record<string, string>
      body: Record<string, string>
      data?: Record<string, string>
    },
    options?: {
      language?: string
    },
  ): Promise<void> {
    const devices = await this.deviceStorage.getUserDevices(userId)

    if (devices.length === 0) return

    // Create notifications for each device
    const notifications: TokenMessage[] = []

    for (const device of devices) {
      const preferredLanguage =
        device.content.language ?? options?.language ?? 'en'

      // Get localized strings
      // Using nullish coalescing to handle missing language variations
      const title =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        notification.title[preferredLanguage] ??
        notification.title.en ??
        'Message'
      // Using nullish coalescing to handle missing language variations
      const body =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        notification.body[preferredLanguage] ?? notification.body.en ?? ''

      // Create token message for this device
      if (device.content.notificationToken) {
        const tokenMessage: TokenMessage = {
          token: device.content.notificationToken,
          notification: {
            title,
            body,
          },
          data: notification.data ?? {},
        }

        // Add platform-specific configurations
        if (device.content.platform === DevicePlatform.Android) {
          tokenMessage.android = {
            notification: {
              title,
              body,
            },
            data: notification.data ?? {},
          }
        } else if (device.content.platform === DevicePlatform.iOS) {
          tokenMessage.apns = {
            payload: {
              aps: {
                alert: {
                  title,
                  body,
                },
              },
            },
          }

          // Add custom data to the apns payload if present
          if (notification.data && tokenMessage.apns.payload) {
            tokenMessage.apns.payload = {
              aps: tokenMessage.apns.payload.aps,
              ...notification.data,
            }
          }
        }

        notifications.push(tokenMessage)
      }
    }

    if (notifications.length === 0) return

    const batchResponse = await this.messaging.sendEach(notifications)

    await Promise.all(
      batchResponse.responses.map(async (individualResponse, index) => {
        if (!individualResponse.success) {
          console.error(
            `Failed to send notification: ${String(individualResponse.error)}`,
          )
        }

        // Handle token invalid error
        if (
          individualResponse.error?.code ===
          'messaging/registration-token-not-registered'
        ) {
          const tokenToRemove = devices[index].content.notificationToken
          if (tokenToRemove) {
            await this.deviceStorage.removeInvalidToken(tokenToRemove)
          }
        }
      }),
    )
  }

  /**
   * Send a notification based on a message
   * @param userId The user ID to send to
   * @param message The message to send
   * @param options Additional options
   * @param options.language Preferred language for the notification
   * @returns Promise that resolves when notification is sent
   */
  async sendMessageNotification(
    userId: string,
    message: Document<Message>,
    options?: {
      language?: string
    },
  ): Promise<void> {
    const devices = await this.deviceStorage.getUserDevices(userId)

    if (devices.length === 0) return

    // Convert LocalizedText objects to Record<string, string>
    const title: Record<string, string> = {}
    // message.content.title is possibly undefined, but linter thinks it's always truthy
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (message.content.title) {
      if (typeof message.content.title.content === 'string') {
        title.en = message.content.title.content
      } else {
        Object.entries(message.content.title.content).forEach(
          ([lang, text]) => {
            title[lang] = text
          },
        )
      }
    }

    const body: Record<string, string> = {}
    if (message.content.description) {
      if (typeof message.content.description.content === 'string') {
        body.en = message.content.description.content
      } else {
        Object.entries(message.content.description.content).forEach(
          ([lang, text]) => {
            body[lang] = text
          },
        )
      }
    }

    // Construct data to include in the notification
    const data: Record<string, string> = {
      messageId: message.id,
      messageType: message.content.type,
      isDismissible: message.content.isDismissible ? 'true' : 'false',
    }

    // Add action and reference if available
    if (message.content.action) {
      data.action = message.content.action
    }

    if (message.content.reference) {
      data.reference = message.content.reference
    }

    // Add any custom data from the message
    if (message.content.data) {
      Object.entries(message.content.data).forEach(([key, value]) => {
        data[key] = value
      })
    }

    await this.sendNotification(userId, { title, body, data }, options)
  }
}
