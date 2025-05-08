//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  Device,
  DevicePlatform,
  deviceConverter,
} from '../../src/models/device.js'

describe('Device Model', () => {
  const validDeviceData = {
    notificationToken: 'test-token-123',
    platform: DevicePlatform.iOS,
    osVersion: '15.0',
    appVersion: '1.0.0',
    appBuild: '1',
    language: 'en',
    timeZone: 'America/Los_Angeles',
  }

  describe('Constructor', () => {
    test('should create a Device instance with required properties', () => {
      const device = new Device({
        notificationToken: validDeviceData.notificationToken,
        platform: validDeviceData.platform,
      })

      expect(device).toBeInstanceOf(Device)
      expect(device.notificationToken).toBe(validDeviceData.notificationToken)
      expect(device.platform).toBe(validDeviceData.platform)
      expect(device.osVersion).toBeUndefined()
      expect(device.appVersion).toBeUndefined()
      expect(device.appBuild).toBeUndefined()
      expect(device.language).toBeUndefined()
      expect(device.timeZone).toBeUndefined()
    })

    test('should create a Device instance with all properties', () => {
      const device = new Device(validDeviceData)

      expect(device).toBeInstanceOf(Device)
      expect(device.notificationToken).toBe(validDeviceData.notificationToken)
      expect(device.platform).toBe(validDeviceData.platform)
      expect(device.osVersion).toBe(validDeviceData.osVersion)
      expect(device.appVersion).toBe(validDeviceData.appVersion)
      expect(device.appBuild).toBe(validDeviceData.appBuild)
      expect(device.language).toBe(validDeviceData.language)
      expect(device.timeZone).toBe(validDeviceData.timeZone)
    })
  })

  describe('Device Converter', () => {
    test('should encode a Device instance properly', () => {
      const device = new Device(validDeviceData)
      const encoded = deviceConverter.encode(device)

      expect(encoded).toBeObject()
      expect(encoded.notificationToken).toBe(validDeviceData.notificationToken)
      expect(encoded.platform).toBe(validDeviceData.platform)
      expect(encoded.osVersion).toBe(validDeviceData.osVersion)
      expect(encoded.appVersion).toBe(validDeviceData.appVersion)
      expect(encoded.appBuild).toBe(validDeviceData.appBuild)
      expect(encoded.language).toBe(validDeviceData.language)
      expect(encoded.timeZone).toBe(validDeviceData.timeZone)
    })

    test('should handle undefined optional properties correctly', () => {
      const device = new Device({
        notificationToken: validDeviceData.notificationToken,
        platform: validDeviceData.platform,
      })

      const encoded = deviceConverter.encode(device)

      expect(encoded).toBeObject()
      expect(encoded.notificationToken).toBe(validDeviceData.notificationToken)
      expect(encoded.platform).toBe(validDeviceData.platform)
      expect(encoded.osVersion).toBeUndefined()
      expect(encoded.appVersion).toBeUndefined()
      expect(encoded.appBuild).toBeUndefined()
      expect(encoded.language).toBeUndefined()
      expect(encoded.timeZone).toBeUndefined()
    })
  })
})
