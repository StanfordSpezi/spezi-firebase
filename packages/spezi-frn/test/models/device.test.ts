//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expect } from 'chai'
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
    it('should create a Device instance with required properties', () => {
      const device = new Device({
        notificationToken: validDeviceData.notificationToken,
        platform: validDeviceData.platform,
      })

      expect(device).to.be.an.instanceOf(Device)
      expect(device.notificationToken).to.equal(
        validDeviceData.notificationToken,
      )
      expect(device.platform).to.equal(validDeviceData.platform)
      expect(device.osVersion).to.be.undefined
      expect(device.appVersion).to.be.undefined
      expect(device.appBuild).to.be.undefined
      expect(device.language).to.be.undefined
      expect(device.timeZone).to.be.undefined
    })

    it('should create a Device instance with all properties', () => {
      const device = new Device(validDeviceData)

      expect(device).to.be.an.instanceOf(Device)
      expect(device.notificationToken).to.equal(
        validDeviceData.notificationToken,
      )
      expect(device.platform).to.equal(validDeviceData.platform)
      expect(device.osVersion).to.equal(validDeviceData.osVersion)
      expect(device.appVersion).to.equal(validDeviceData.appVersion)
      expect(device.appBuild).to.equal(validDeviceData.appBuild)
      expect(device.language).to.equal(validDeviceData.language)
      expect(device.timeZone).to.equal(validDeviceData.timeZone)
    })
  })

  describe('Device Converter', () => {
    it('should encode a Device instance properly', () => {
      const device = new Device(validDeviceData)
      const encoded = deviceConverter.encode(device)

      expect(encoded).to.be.an('object')
      expect(encoded.notificationToken).to.equal(
        validDeviceData.notificationToken,
      )
      expect(encoded.platform).to.equal(validDeviceData.platform)
      expect(encoded.osVersion).to.equal(validDeviceData.osVersion)
      expect(encoded.appVersion).to.equal(validDeviceData.appVersion)
      expect(encoded.appBuild).to.equal(validDeviceData.appBuild)
      expect(encoded.language).to.equal(validDeviceData.language)
      expect(encoded.timeZone).to.equal(validDeviceData.timeZone)
    })

    it('should handle undefined optional properties correctly', () => {
      const device = new Device({
        notificationToken: validDeviceData.notificationToken,
        platform: validDeviceData.platform,
      })

      const encoded = deviceConverter.encode(device)

      expect(encoded).to.be.an('object')
      expect(encoded.notificationToken).to.equal(
        validDeviceData.notificationToken,
      )
      expect(encoded.platform).to.equal(validDeviceData.platform)
      expect(encoded.osVersion).to.be.undefined
      expect(encoded.appVersion).to.be.undefined
      expect(encoded.appBuild).to.be.undefined
      expect(encoded.language).to.be.undefined
      expect(encoded.timeZone).to.be.undefined
    })
  })
})
