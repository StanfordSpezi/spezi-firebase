import { expect } from 'chai'
import { createSandbox, type SinonSandbox } from 'sinon'
import {
  createRegisterDeviceHandler,
  type RegisterDeviceInput,
} from '../../src/functions/registerDevice.js'
import { Device, DevicePlatform } from '../../src/models/device.js'

describe('registerDevice Function', () => {
  let sandbox: SinonSandbox
  let mockNotificationService: any
  let registerDeviceHandler: (
    userId: string,
    data: RegisterDeviceInput,
  ) => Promise<undefined>

  beforeEach(() => {
    sandbox = createSandbox()

    mockNotificationService = {
      registerDevice: sandbox.stub().resolves(),
    }

    registerDeviceHandler = createRegisterDeviceHandler(mockNotificationService)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should validate and register a valid device request', async () => {
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

    expect(mockNotificationService.registerDevice.calledOnce).to.be.true

    // Check the device created
    const deviceArg = mockNotificationService.registerDevice.firstCall.args[1]
    expect(deviceArg).to.be.an.instanceOf(Device)
    expect(deviceArg.notificationToken).to.equal(input.notificationToken)
    expect(deviceArg.platform).to.equal(DevicePlatform.iOS)
    expect(deviceArg.osVersion).to.equal(input.osVersion)
  })

  it('should register a device with only required fields', async () => {
    const input: RegisterDeviceInput = {
      notificationToken: 'token123',
      platform: DevicePlatform.Android,
    }

    const userId = 'user123'
    await registerDeviceHandler(userId, input)

    expect(mockNotificationService.registerDevice.calledOnce).to.be.true

    // Check the device created
    const deviceArg = mockNotificationService.registerDevice.firstCall.args[1]
    expect(deviceArg).to.be.an.instanceOf(Device)
    expect(deviceArg.notificationToken).to.equal(input.notificationToken)
    expect(deviceArg.platform).to.equal(DevicePlatform.Android)
    expect(deviceArg.osVersion).to.be.undefined
    expect(deviceArg.appVersion).to.be.undefined
  })

  it('should throw an error for invalid platform', async () => {
    const input = {
      notificationToken: 'token123',
      platform: 'InvalidPlatform', // Not a valid platform
    }

    const userId = 'user123'

    try {
      await registerDeviceHandler(userId, input as any)
      // Should not reach here
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).to.exist
      expect(mockNotificationService.registerDevice.called).to.be.false
    }
  })

  it('should throw an error for missing required fields', async () => {
    // Missing notification token
    const input = {
      platform: DevicePlatform.iOS,
    }

    const userId = 'user123'

    try {
      await registerDeviceHandler(userId, input as any)
      // Should not reach here
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).to.exist
      expect(mockNotificationService.registerDevice.called).to.be.false
    }
  })
})
