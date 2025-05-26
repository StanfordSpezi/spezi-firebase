//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  createUnregisterDeviceHandler,
  type UnregisterDeviceInput,
} from '../../src/functions/unregisterDevice.js'
import { DevicePlatform } from '../../src/models/device.js'
import { createStub } from '../utils/mockUtils.js'

describe('unregisterDevice Function', () => {
  let mockNotificationService: any
  let unregisterDeviceHandler: (
    userId: string,
    data: UnregisterDeviceInput,
  ) => Promise<undefined>

  beforeEach(() => {
    mockNotificationService = {
      unregisterDevice: createStub(undefined).resolves(),
    }

    unregisterDeviceHandler = createUnregisterDeviceHandler(
      mockNotificationService,
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should validate and unregister a valid device request', async () => {
    const userId = 'user123'
    const input: UnregisterDeviceInput = {
      notificationToken: 'token123',
      platform: DevicePlatform.iOS,
    }

    await unregisterDeviceHandler(userId, input)

    expect(mockNotificationService.unregisterDevice).toHaveBeenCalledTimes(1)
    expect(mockNotificationService.unregisterDevice.mock.calls[0][0]).toBe(
      userId,
    )
    expect(mockNotificationService.unregisterDevice.mock.calls[0][1]).toBe(
      input.notificationToken,
    )
    expect(mockNotificationService.unregisterDevice.mock.calls[0][2]).toBe(
      input.platform,
    )
  })

  test('should throw an error for missing notificationToken', async () => {
    const userId = 'user123'
    const input = {
      platform: DevicePlatform.iOS,
    }

    try {
      await unregisterDeviceHandler(userId, input as any)
      // Should not reach here
      // If we get here, the test should fail
      expect(false).toBe(true)
    } catch (error) {
      expect(error).toBeDefined()
      expect(mockNotificationService.unregisterDevice).not.toHaveBeenCalled()
    }
  })

  test('should throw an error for missing platform', async () => {
    const userId = 'user123'
    const input = {
      notificationToken: 'token123',
    }

    try {
      await unregisterDeviceHandler(userId, input as any)
      // Should not reach here
      // If we get here, the test should fail
      expect(false).toBe(true)
    } catch (error) {
      expect(error).toBeDefined()
      expect(mockNotificationService.unregisterDevice).not.toHaveBeenCalled()
    }
  })

  test('should accept any string as platform', async () => {
    const userId = 'user123'
    const input: UnregisterDeviceInput = {
      notificationToken: 'token123',
      platform: 'CustomPlatform', // Can be any string now
    }

    await unregisterDeviceHandler(userId, input)

    expect(mockNotificationService.unregisterDevice).toHaveBeenCalledTimes(1)
    expect(mockNotificationService.unregisterDevice.mock.calls[0][2]).toBe(
      'CustomPlatform',
    )
  })
})
