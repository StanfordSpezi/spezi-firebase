//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//


import { createSandbox, type SinonSandbox } from 'sinon'
import {
  createUnregisterDeviceHandler,
  type UnregisterDeviceInput,
} from '../../src/functions/unregisterDevice.js'
import { DevicePlatform } from '../../src/models/device.js'

describe('unregisterDevice Function', () => {
  let sandbox: SinonSandbox
  let mockNotificationService: any
  let unregisterDeviceHandler: (
    userId: string,
    data: UnregisterDeviceInput,
  ) => Promise<undefined>

  beforeEach(() => {
    sandbox = createSandbox()

    mockNotificationService = {
      unregisterDevice: sandbox.stub().resolves(),
    }

    unregisterDeviceHandler = createUnregisterDeviceHandler(
      mockNotificationService,
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('should validate and unregister a valid device request', async () => {
    const userId = 'user123'
    const input: UnregisterDeviceInput = {
      notificationToken: 'token123',
      platform: DevicePlatform.iOS,
    }

    await unregisterDeviceHandler(userId, input)

    expect(mockNotificationService.unregisterDevice.calledOnce).toBe(true)
    expect(mockNotificationService.unregisterDevice.firstCall.args[0]).to.equal(
      userId,
    )
    expect(mockNotificationService.unregisterDevice.firstCall.args[1]).to.equal(
      input.notificationToken,
    )
    expect(mockNotificationService.unregisterDevice.firstCall.args[2]).to.equal(
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
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).to.exist
      expect(mockNotificationService.unregisterDevice.called).toBe(false)
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
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).to.exist
      expect(mockNotificationService.unregisterDevice.called).toBe(false)
    }
  })

  test('should accept any string as platform', async () => {
    const userId = 'user123'
    const input: UnregisterDeviceInput = {
      notificationToken: 'token123',
      platform: 'CustomPlatform', // Can be any string now
    }

    await unregisterDeviceHandler(userId, input)

    expect(mockNotificationService.unregisterDevice.calledOnce).toBe(true)
    expect(mockNotificationService.unregisterDevice.firstCall.args[2]).to.equal(
      'CustomPlatform'
    )
  })
})
