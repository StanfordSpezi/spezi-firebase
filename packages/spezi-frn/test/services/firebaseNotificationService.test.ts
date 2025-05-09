//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { createSandbox, type SinonSandbox } from 'sinon'
import { Device, DevicePlatform } from '../../src/models/device.js'
import { Message } from '../../src/models/message.js'
import { FirebaseNotificationService } from '../../src/services/firebaseNotificationService.js'
import { type Document } from '../../src/storage/deviceStorage.js'

describe('FirebaseNotificationService', () => {
  let sandbox: SinonSandbox
  let mockMessaging: any
  let mockDeviceStorage: any
  let service: FirebaseNotificationService

  beforeEach(() => {
    sandbox = createSandbox()

    // Create mock messaging
    mockMessaging = {
      sendEach: sandbox.stub().resolves({
        responses: [{ success: true }],
      }),
    }

    // Create mock device storage
    mockDeviceStorage = {
      storeDevice: sandbox.stub().resolves(),
      removeDevice: sandbox.stub().resolves(),
      getUserDevices: sandbox.stub().resolves([]),
      removeInvalidToken: sandbox.stub().resolves(),
    }

    // Create service instance
    service = new FirebaseNotificationService(mockMessaging, mockDeviceStorage)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('registerDevice', () => {
    test('should call deviceStorage.storeDevice with correct parameters', async () => {
      const userId = 'user123'
      const device = new Device({
        notificationToken: 'token123',
        platform: DevicePlatform.iOS,
      })

      await service.registerDevice(userId, device)

      expect(mockDeviceStorage.storeDevice.calledOnce).toBe(true)
      expect(mockDeviceStorage.storeDevice.firstCall.args[0]).toBe(userId)
      expect(mockDeviceStorage.storeDevice.firstCall.args[1]).toBe(device)
    })
  })

  describe('unregisterDevice', () => {
    test('should call deviceStorage.removeDevice with correct parameters', async () => {
      const userId = 'user123'
      const token = 'token123'
      const platform = 'iOS'

      await service.unregisterDevice(userId, token, platform)

      expect(mockDeviceStorage.removeDevice.calledOnce).toBe(true)
      expect(mockDeviceStorage.removeDevice.firstCall.args[0]).toBe(userId)
      expect(mockDeviceStorage.removeDevice.firstCall.args[1]).toBe(token)
      expect(mockDeviceStorage.removeDevice.firstCall.args[2]).toBe(platform)
    })
  })

  describe('sendNotification', () => {
    let devices: Array<Document<Device>>

    beforeEach(() => {
      devices = [
        {
          id: 'device1',
          path: 'users/user123/devices/device1',
          lastUpdate: new Date(),
          content: new Device({
            notificationToken: 'ios-token',
            platform: DevicePlatform.iOS,
            language: 'en',
          }),
        },
        {
          id: 'device2',
          path: 'users/user123/devices/device2',
          lastUpdate: new Date(),
          content: new Device({
            notificationToken: 'android-token',
            platform: DevicePlatform.Android,
            language: 'de',
          }),
        },
      ]

      mockDeviceStorage.getUserDevices.resolves(devices)
    })

    test('should not send notifications if no devices are found', async () => {
      mockDeviceStorage.getUserDevices.resolves([])

      await service.sendNotification('user123', {
        title: { en: 'Test Title' },
        body: { en: 'Test Body' },
      })

      expect(mockMessaging.sendEach.called).toBe(false)
    })

    test('should create token messages for each device', async () => {
      await service.sendNotification('user123', {
        title: { en: 'Test Title', de: 'Testtitel' },
        body: { en: 'Test Body', de: 'Testtext' },
      })

      expect(mockMessaging.sendEach.calledOnce).toBe(true)

      const tokenMessages = mockMessaging.sendEach.firstCall.args[0]
      expect(Array.isArray(tokenMessages)).toBe(true)
      expect(tokenMessages.length).toBe(2)

      // Check iOS token message
      const iosMessage = tokenMessages.find((m: any) => m.token === 'ios-token')
      expect(iosMessage.notification.title).toBe('Test Title')
      expect(iosMessage.notification.body).toBe('Test Body')
      expect(iosMessage.apns).toBeDefined()

      // Check Android token message
      const androidMessage = tokenMessages.find(
        (m: any) => m.token === 'android-token',
      )
      expect(androidMessage.notification.title).toBe('Testtitel')
      expect(androidMessage.notification.body).toBe('Testtext')
      expect(androidMessage.android).toBeDefined()
    })

    test('should handle failed notifications and remove invalid tokens', async () => {
      mockMessaging.sendEach.resolves({
        responses: [
          { success: true },
          {
            success: false,
            error: { code: 'messaging/registration-token-not-registered' },
          },
        ],
      })

      await service.sendNotification('user123', {
        title: { en: 'Test Title' },
        body: { en: 'Test Body' },
      })

      expect(mockDeviceStorage.removeInvalidToken.calledOnce).toBe(true)
      expect(mockDeviceStorage.removeInvalidToken.firstCall.args[0]).toBe(
        'android-token',
      )
    })
  })

  describe('sendMessageNotification', () => {
    test('should convert Message to notification format and call sendNotification', async () => {
      const userId = 'user123'
      const message: Document<Message> = {
        id: 'msg1',
        path: 'path/to/message',
        lastUpdate: new Date(),
        content: Message.createInformation({
          title: {
            en: 'Info Title',
            de: 'Info Titel',
          },
          description: {
            en: 'Info Description',
            de: 'Info Beschreibung',
          },
          isDismissible: true,
          reference: 'ref123',
          data: {
            customKey: 'customValue',
          },
        }),
      }

      // Setup user devices to be returned
      mockDeviceStorage.getUserDevices.resolves([
        {
          id: 'device1',
          path: 'users/user123/devices/device1',
          lastUpdate: new Date(),
          content: new Device({
            notificationToken: 'ios-token',
            platform: DevicePlatform.iOS,
            language: 'en',
          }),
        },
      ])

      // Spy on sendNotification but allow it to run through to ensure correct behavior
      const sendNotificationSpy = sandbox.spy(service, 'sendNotification')

      await service.sendMessageNotification(userId, message)

      expect(sendNotificationSpy.calledOnce).toBe(true)

      const args = sendNotificationSpy.firstCall.args
      expect(args[0]).toBe(userId)

      // Check notification content
      const notification = args[1]
      expect(notification.title).toEqual(
        expect.objectContaining({
          en: 'Info Title',
          de: 'Info Titel',
        }),
      )

      expect(notification.body).toEqual(
        expect.objectContaining({
          en: 'Info Description',
          de: 'Info Beschreibung',
        }),
      )

      // Check data content
      expect(notification.data).toEqual(
        expect.objectContaining({
          messageId: 'msg1',
          messageType: 'Information',
          isDismissible: 'true',
          reference: 'ref123',
          customKey: 'customValue',
        }),
      )
    })
  })
})
