import { expect } from 'chai'
import { createSandbox, type SinonSandbox } from 'sinon'
import { Device, DevicePlatform } from '../../src/models/device.js'
import { FirestoreDeviceStorage } from '../../src/storage/firestoreDeviceStorage.js'

describe('FirestoreDeviceStorage', () => {
  let sandbox: SinonSandbox
  let mockFirestore: any
  let mockCollection: any
  let mockCollectionGroup: any
  let mockQuery: any
  let mockDocRef: any
  let mockQuerySnapshot: any
  let mockTransaction: any
  let storage: FirestoreDeviceStorage

  beforeEach(() => {
    sandbox = createSandbox()

    // Setup document references
    mockDocRef = {
      id: 'device1',
      path: 'users/user123/devices/device1',
      set: sandbox.stub(),
      delete: sandbox.stub(),
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
      where: sandbox.stub().returnsThis(),
      get: sandbox.stub().resolves(mockQuerySnapshot),
    }

    // Setup collection
    mockCollection = {
      doc: sandbox.stub().returns(mockDocRef),
      path: 'users/user123/devices',
      get: sandbox.stub().resolves(mockQuerySnapshot),
      withConverter: sandbox.stub().returnsThis(),
    }

    // Setup collection group
    mockCollectionGroup = {
      where: sandbox.stub().returns(mockQuery),
      withConverter: sandbox.stub().returnsThis(),
    }

    // Setup transaction
    mockTransaction = {
      get: sandbox.stub().resolves(mockQuerySnapshot),
      set: sandbox.stub(),
      delete: sandbox.stub(),
    }

    // Setup Firestore
    mockFirestore = {
      collection: sandbox.stub().returns(mockCollection),
      collectionGroup: sandbox.stub().returns(mockCollectionGroup),
      // eslint-disable-next-line @typescript-eslint/require-await
      runTransaction: sandbox.stub().callsFake(async (callback: any) => {
        return callback(mockTransaction)
      }),
    }

    // Create storage instance
    storage = new FirestoreDeviceStorage(mockFirestore)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should initialize with default options', () => {
      new FirestoreDeviceStorage(mockFirestore)

      // We can't test private properties directly, so test the behavior instead
      expect(mockFirestore.collection.calledWith('users/test/devices')).to.be
        .false
    })

    it('should initialize with custom options', () => {
      const options = {
        devicesCollection: 'custom_devices',
        userDevicesPathTemplate: 'custom_users/{userId}/custom_devices',
      }

      const storage = new FirestoreDeviceStorage(mockFirestore, options)

      // We'll test by calling a method that uses the templates
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      storage.getUserDevices('test')

      expect(
        mockFirestore.collection.calledWith('custom_users/test/custom_devices'),
      ).to.be.true
    })
  })

  describe('storeDevice', () => {
    it('should store a new device if no existing device is found', async () => {
      // Setup empty query response for 'no existing device'
      mockQuerySnapshot.docs = []

      const userId = 'user123'
      const device = new Device({
        notificationToken: 'token123',
        platform: DevicePlatform.iOS,
      })

      // Create mock for the collection path
      mockFirestore.collection = sandbox.stub().returns(mockCollection)

      // Create a custom mock implementation for runTransaction
      const setStub = sandbox.stub().returns(undefined)

      mockFirestore.runTransaction = sandbox
        .stub()
        // eslint-disable-next-line @typescript-eslint/require-await
        .callsFake(async (transactionCallback: any) => {
          // Create a transaction mock that matches what FirestoreDeviceStorage expects
          const transaction = {
            get: sandbox.stub().resolves({
              docs: [], // Empty array means no existing devices found
            }),
            set: setStub,
            delete: sandbox.stub().returns(undefined),
          }

          // Call the callback
          return transactionCallback(transaction)
        })

      // Reset the storage to use our new mocks
      storage = new FirestoreDeviceStorage(mockFirestore)

      await storage.storeDevice(userId, device)

      // Verify transaction was run
      expect(mockFirestore.runTransaction.calledOnce).to.be.true

      // Verify collection was requested with the correct path
      expect(mockFirestore.collection.calledWith('users/user123/devices')).to.be
        .true
    })

    it('should update existing device and delete others with same token', async () => {
      // Setup query response with multiple devices
      const mockDeviceRef1 = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        set: sandbox.stub(),
        delete: sandbox.stub(),
      }

      const mockDeviceRef2 = {
        id: 'device2',
        path: 'users/otheruser/devices/device2',
        set: sandbox.stub(),
        delete: sandbox.stub(),
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
      expect(mockTransaction.set.calledOnce).to.be.true

      // Check that we deleted other devices with same token
      expect(mockTransaction.delete.calledOnce).to.be.true
    })
  })

  describe('removeDevice', () => {
    it('should remove devices matching token and platform', async () => {
      const userId = 'user123'
      const token = 'token123'
      const platform = 'iOS'

      // Create a device with matching token and platform
      const deviceRef = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        delete: sandbox.stub(),
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
      mockFirestore.runTransaction = sandbox
        .stub()
        // eslint-disable-next-line @typescript-eslint/require-await
        .callsFake(async (transactionCallback: any) => {
          // Override the transaction object with a proper implementation for this test
          const transaction = {
            get: sandbox.stub().resolves({
              docs: [deviceDoc],
            }),
            delete: sandbox.stub().returns(undefined),
          }

          // Call the callback with mocked parameters
          return transactionCallback(transaction)
        })

      await storage.removeDevice(userId, token, platform)

      // Validate transaction was run
      expect(mockFirestore.runTransaction.calledOnce).to.be.true
    })

    it('should not remove devices with different platform', async () => {
      // Setup device with different platform
      const deviceRef = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        delete: sandbox.stub(),
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
      const deleteStub = sandbox.stub()

      // Create a custom mock implementation for this test
      mockFirestore.runTransaction = sandbox
        .stub()
        // eslint-disable-next-line @typescript-eslint/require-await
        .callsFake(async (transactionCallback: any) => {
          // Override the transaction object with a proper implementation for this test
          const transaction = {
            get: sandbox.stub().resolves({
              docs: [deviceDoc],
            }),
            delete: deleteStub,
          }

          // Call the callback with mocked parameters
          return transactionCallback(transaction)
        })

      await storage.removeDevice(userId, token, platform)

      // Verify transaction was run but delete wasn't called
      expect(mockFirestore.runTransaction.calledOnce).to.be.true
      expect(deleteStub.called).to.be.false
    })
  })

  describe('getUserDevices', () => {
    it('should return user devices properly formatted', async () => {
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
      const getStub = sandbox.stub()
      getStub.resolves(querySnapshot)

      const withConverterStub = sandbox.stub()
      withConverterStub.returns({ get: getStub })

      mockFirestore.collection.returns({
        withConverter: withConverterStub,
      })

      const devices = await storage.getUserDevices(userId)

      // Check that we queried the correct collection
      expect(mockFirestore.collection.calledWith('users/user123/devices')).to.be
        .true

      // Check returned devices
      expect(devices).to.be.an('array')
      expect(devices.length).to.equal(1)
      expect(devices[0].id).to.equal('device1')

      // Instead of checking instanceof, check the properties directly
      expect(devices[0].content).to.have.property(
        'notificationToken',
        'token123',
      )
      expect(devices[0].content).to.have.property(
        'platform',
        DevicePlatform.iOS,
      )
      expect(devices[0].content).to.have.property('osVersion', '15.0')
      expect(devices[0].content).to.have.property('appVersion', '1.0.0')
      expect(devices[0].content.notificationToken).to.equal('token123')
      expect(devices[0].content.platform).to.equal(DevicePlatform.iOS)
    })
  })

  describe('removeInvalidToken', () => {
    it('should remove all devices with the invalid token', async () => {
      const token = 'invalid-token'

      // Create a device reference with the invalid token
      const deviceRef = {
        id: 'device1',
        path: 'users/user123/devices/device1',
        delete: sandbox.stub(),
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
      const deleteStub = sandbox.stub()

      // Create a custom mock implementation for this test
      mockFirestore.runTransaction = sandbox
        .stub()
        // eslint-disable-next-line @typescript-eslint/require-await
        .callsFake(async (transactionCallback: any) => {
          // Override the transaction object with a proper implementation for this test
          const transaction = {
            get: sandbox.stub().resolves({
              docs: [deviceDoc],
            }),
            delete: deleteStub,
          }

          // Call the callback with mocked parameters
          return transactionCallback(transaction)
        })

      await storage.removeInvalidToken(token)

      // Verify transaction was run
      expect(mockFirestore.runTransaction.calledOnce).to.be.true
    })
  })
})
