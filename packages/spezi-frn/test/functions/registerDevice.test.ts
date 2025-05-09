//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  createRegisterDeviceHandler,
  type RegisterDeviceInput,
} from '../../src/functions/registerDevice.js'
import { Device, DevicePlatform } from '../../src/models/device.js'
import { createStub } from '../utils/mockUtils.js'

describe('registerDevice Function', () => {
  let mockNotificationService: any
  let registerDeviceHandler: (
    userId: string,
    data: RegisterDeviceInput,
  ) => Promise<undefined>

  beforeEach(() => {
    mockNotificationService = {
      registerDevice: createStub(undefined).resolves(),
    }

    registerDeviceHandler = createRegisterDeviceHandler(mockNotificationService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should validate and register a valid device request', async () => {
    const input: RegisterDeviceInput = {
      notificationToken: 'token123',
      platform: DevicePlatform.iOS,
      osVersion: '15.0',
      appVersion: '1.0.0',
      appBuild: '100',
      language: 'en-US',
      timeZone: 'America/Los_Angeles',
    }

    const userId = 'user123'
    await registerDeviceHandler(userId, input)

    expect(mockNotificationService.registerDevice).toHaveBeenCalledTimes(1)

    // Check the device created
    const deviceArg = mockNotificationService.registerDevice.mock.calls[0][1]
    expect(deviceArg).toBeInstanceOf(Device)
    expect(deviceArg.notificationToken).toBe(input.notificationToken)
    expect(deviceArg.platform).toBe(DevicePlatform.iOS)
    expect(deviceArg.osVersion).toBe(input.osVersion)
  })

  test('should register a device with only required fields', async () => {
    const input: RegisterDeviceInput = {
      notificationToken: 'token123',
      platform: DevicePlatform.Android,
    }

    const userId = 'user123'
    await registerDeviceHandler(userId, input)

    expect(mockNotificationService.registerDevice).toHaveBeenCalledTimes(1)

    // Check the device created
    const deviceArg = mockNotificationService.registerDevice.mock.calls[0][1]
    expect(deviceArg).toBeInstanceOf(Device)
    expect(deviceArg.notificationToken).toBe(input.notificationToken)
    expect(deviceArg.platform).toBe(DevicePlatform.Android)
    expect(deviceArg.osVersion).toBeUndefined()
    expect(deviceArg.appVersion).toBeUndefined()
  })

  test('should accept any string as platform', async () => {
    const input: RegisterDeviceInput = {
      notificationToken: 'token123',
      platform: 'CustomPlatform', // Can be any string now
    }

    const userId = 'user123'
    await registerDeviceHandler(userId, input)

    expect(mockNotificationService.registerDevice).toHaveBeenCalledTimes(1)

    // Check the device created
    const deviceArg = mockNotificationService.registerDevice.mock.calls[0][1]
    expect(deviceArg).toBeInstanceOf(Device)
    expect(deviceArg.platform).toBe('CustomPlatform')
  })

  test('should throw an error for missing required fields', async () => {
    // Missing notification token
    const input = {
      platform: DevicePlatform.iOS,
    }

    const userId = 'user123'

    try {
      await registerDeviceHandler(userId, input as any)
      // Should not reach here
      // If we get here, the test should fail
      expect(false).toBe(true)
    } catch (error) {
      expect(error).toBeDefined()
      expect(mockNotificationService.registerDevice).not.toHaveBeenCalled()
    }
  })
})
