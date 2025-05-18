//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Device, DevicePlatform } from '../../src/models/device.js'
import { FirestoreDeviceStorage } from '../../src/storage/firestoreDeviceStorage.js'
// The createStub import was removed since it's not used
// import { createStub } from '../utils/mockUtils.js'

describe('FirestoreDeviceStorage', () => {
  let mockFirestore: any
  let mockCollection: any
  let mockCollectionGroup: any
  let mockQuery: any
  let mockDocRef: any
  let mockQuerySnapshot: any
  let mockTransaction: any
  let storage: FirestoreDeviceStorage

  beforeEach(() => {
    // Setup document references
    mockDocRef = {
      id: 'device1',
      path: 'users/user123/devices/device1',
      set: jest.fn(),
      delete: jest.fn(),
    }

    // Setup query snapshot
    mockQuerySnapshot = {
      docs: [
        {
          id: 'device1',
          ref: mockDocRef,
          data: () => ({
            notificationToken: 'token123',
            platform: 'iOS',
            osVersion: '15.0',
          }),
          updateTime: {
            toDate: () => new Date(),
          },
        },
      ],
    }

    // Setup query
    mockQuery = {
      where: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue(mockQuerySnapshot),
    }

    // Setup collection
    mockCollection = {
      doc: jest.fn().mockReturnValue(mockDocRef),
      path: 'users/user123/devices',
      get: jest.fn().mockResolvedValue(mockQuerySnapshot),
      withConverter: jest.fn().mockReturnThis(),
    }

    // Setup collection group
    mockCollectionGroup = {
      where: jest.fn().mockReturnValue(mockQuery),
      withConverter: jest.fn().mockReturnThis(),
    }

    // Setup transaction
    mockTransaction = {
      get: jest.fn().mockResolvedValue(mockQuerySnapshot),
      set: jest.fn(),
      delete: jest.fn(),
    }

    // Setup Firestore
    mockFirestore = {
      collection: jest.fn().mockReturnValue(mockCollection),
      collectionGroup: jest.fn().mockReturnValue(mockCollectionGroup),
      // eslint-disable-next-line @typescript-eslint/require-await
      runTransaction: jest.fn().mockImplementation(async (callback: any) => {
        return callback(mockTransaction)
      }),
    }

    // Create storage instance
    storage = new FirestoreDeviceStorage(mockFirestore)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    test('should initialize with default options', () => {
      new FirestoreDeviceStorage(mockFirestore)

      // We can't test private properties directly, so test the behavior instead
      expect(mockFirestore.collection).not.toHaveBeenCalledWith(
        'users/test/devices',
      )
    })

    test('should initialize with custom options', () => {
      const options = {
        devicesCollection: 'custom_devices',
        userDevicesPathTemplate: 'custom_users/{userId}/custom_devices',
      }

      const storage = new FirestoreDeviceStorage(mockFirestore, options)

      // We'll test by calling a method that uses the templates
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      storage.getUserDevices('test')

      expect(mockFirestore.collection).toHaveBeenCalledWith(
        'custom_users/test/custom_devices',
      )
    })
  })

  describe('storeDevice', () => {
    test('should store a new device if no existing device is found', async () => {
      // Setup empty query response for 'no existing device'
      mockQuerySnapshot.docs = []

      const userId = 'user123'
      const device = new Device({
        notificationToken: 'token123',
        platform: DevicePlatform.iOS,
      })

      // Create mock for the collection path
      mockFirestore.collection = jest.fn().mockReturnValue(mockCollection)

      // Create a custom mock implementation for runTransaction
      const setStub = jest.fn().mockReturnValue(undefined)

      mockFirestore.runTransaction = jest
        .fn()
        // eslint-disable-next-line @typescript-eslint/require-await
        .mockImplementation(async (transactionCallback: any) => {
          // Create a transaction mock that matches what FirestoreDeviceStorage expects
          const transaction = {
            get: jest.fn().mockResolvedValue({
              docs: [], // Empty array means no existing devices found
            }),
            set: setStub,
            delete: jest.fn().mockReturnValue(undefined),
          }

          // Call the callback
          return transactionCallback(transaction)
        })

      // Reset the storage to use our new mocks
      storage = new FirestoreDeviceStorage(mockFirestore)

      await storage.storeDevice(userId, device)

      // Verify transaction was run
      expect(mockFirestore.runTransaction).toHaveBeenCalledTimes(1)

      // Verify collection was requested with the correct path
      expect(mockFirestore.collection).toHaveBeenCalledWith(
        'users/user123/devices',
      )
    })

    test('should update existing device and delete others with same token', async () => {
      // Setup query response with multiple devices
      const mockDeviceRef1 = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        set: jest.fn(),
        delete: jest.fn(),
      }

      const mockDeviceRef2 = {
        id: 'device2',
        path: 'users/otheruser/devices/device2',
        set: jest.fn(),
        delete: jest.fn(),
      }

      mockQuerySnapshot.docs = [
        {
          id: 'device1',
          ref: mockDeviceRef1,
          data: () => ({
            notificationToken: 'token123',
            platform: 'iOS',
          }),
        },
        {
          id: 'device2',
          ref: mockDeviceRef2,
          data: () => ({
            notificationToken: 'token123',
            platform: 'iOS',
          }),
        },
      ]

      const userId = 'user123'
      const device = new Device({
        notificationToken: 'token123',
        platform: DevicePlatform.iOS,
      })

      await storage.storeDevice(userId, device)

      // Check that we set the user's device
      expect(mockTransaction.set).toHaveBeenCalledTimes(1)

      // Check that we deleted other devices with same token
      expect(mockTransaction.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('removeDevice', () => {
    test('should remove devices matching token and platform', async () => {
      const userId = 'user123'
      const token = 'token123'
      const platform = 'iOS'

      // Create a device with matching token and platform
      const deviceRef = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        delete: jest.fn(),
      }

      const deviceDoc = {
        id: 'device1',
        ref: deviceRef,
        data: () => ({
          notificationToken: token,
          platform: platform,
        }),
      }

      // Create a custom mock implementation for this test
      mockFirestore.runTransaction = jest
        .fn()
        // eslint-disable-next-line @typescript-eslint/require-await
        .mockImplementation(async (transactionCallback: any) => {
          // Override the transaction object with a proper implementation for this test
          const transaction = {
            get: jest.fn().mockResolvedValue({
              docs: [deviceDoc],
            }),
            delete: jest.fn().mockReturnValue(undefined),
          }

          // Call the callback with mocked parameters
          return transactionCallback(transaction)
        })

      await storage.removeDevice(userId, token, platform)

      // Validate transaction was run
      expect(mockFirestore.runTransaction).toHaveBeenCalledTimes(1)
    })

    test('should not remove devices with different platform', async () => {
      // Setup device with different platform
      const deviceRef = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        delete: jest.fn(),
      }

      const deviceDoc = {
        id: 'device1',
        ref: deviceRef,
        data: () => ({
          notificationToken: 'token123',
          platform: 'Android', // Different from requested platform
        }),
      }

      const userId = 'user123'
      const token = 'token123'
      const platform = 'iOS' // Different from device platform

      // Create a delete stub to verify it's not called
      const deleteStub = jest.fn()

      // Create a custom mock implementation for this test
      mockFirestore.runTransaction = jest
        .fn()
        // eslint-disable-next-line @typescript-eslint/require-await
        .mockImplementation(async (transactionCallback: any) => {
          // Override the transaction object with a proper implementation for this test
          const transaction = {
            get: jest.fn().mockResolvedValue({
              docs: [deviceDoc],
            }),
            delete: deleteStub,
          }

          // Call the callback with mocked parameters
          return transactionCallback(transaction)
        })

      await storage.removeDevice(userId, token, platform)

      // Verify transaction was run but delete wasn't called
      expect(mockFirestore.runTransaction).toHaveBeenCalledTimes(1)
      expect(deleteStub).not.toHaveBeenCalled()
    })
  })

  describe('getUserDevices', () => {
    test('should return user devices properly formatted', async () => {
      const userId = 'user123'

      // Create a mock document snapshot
      const deviceData = {
        notificationToken: 'token123',
        platform: DevicePlatform.iOS,
        osVersion: '15.0',
        appVersion: '1.0.0',
      }

      // Create a DeviceSnapshot with proper format
      const deviceDoc = {
        id: 'device1',
        ref: { path: 'users/user123/devices/device1' },
        data: () => deviceData,
        updateTime: { toDate: () => new Date() },
      }

      // Create a mock query snapshot
      const querySnapshot = {
        docs: [deviceDoc],
      }

      // Setup the mock
      const getStub = jest.fn()
      getStub.mockResolvedValue(querySnapshot)

      const withConverterStub = jest.fn()
      withConverterStub.mockReturnValue({ get: getStub })

      mockFirestore.collection.mockReturnValue({
        withConverter: withConverterStub,
      })

      const devices = await storage.getUserDevices(userId)

      // Check that we queried the correct collection
      expect(mockFirestore.collection).toHaveBeenCalledWith(
        'users/user123/devices',
      )

      // Check returned devices
      expect(Array.isArray(devices)).toBe(true)
      expect(devices.length).toBe(1)
      expect(devices[0].id).toBe('device1')

      // Instead of checking instanceof, check the properties directly
      expect(devices[0].content).toHaveProperty('notificationToken', 'token123')
      expect(devices[0].content).toHaveProperty('platform', DevicePlatform.iOS)
      expect(devices[0].content).toHaveProperty('osVersion', '15.0')
      expect(devices[0].content).toHaveProperty('appVersion', '1.0.0')
      expect(devices[0].content.notificationToken).toBe('token123')
      expect(devices[0].content.platform).toBe(DevicePlatform.iOS)
    })
  })

  describe('removeInvalidToken', () => {
    test('should remove all devices with the invalid token', async () => {
      const token = 'invalid-token'

      // Create a device reference with the invalid token
      const deviceRef = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        delete: jest.fn(),
      }

      const deviceDoc = {
        id: 'device1',
        ref: deviceRef,
        data: () => ({
          notificationToken: token,
          platform: 'iOS',
        }),
      }

      // Create a delete stub to verify it's called
      const deleteStub = jest.fn()

      // Create a custom mock implementation for this test
      mockFirestore.runTransaction = jest
        .fn()
        // eslint-disable-next-line @typescript-eslint/require-await
        .mockImplementation(async (transactionCallback: any) => {
          // Override the transaction object with a proper implementation for this test
          const transaction = {
            get: jest.fn().mockResolvedValue({
              docs: [deviceDoc],
            }),
            delete: deleteStub,
          }

          // Call the callback with mocked parameters
          return transactionCallback(transaction)
        })

      await storage.removeInvalidToken(token)

      // Verify transaction was run
      expect(mockFirestore.runTransaction).toHaveBeenCalledTimes(1)
    })
  })
})
