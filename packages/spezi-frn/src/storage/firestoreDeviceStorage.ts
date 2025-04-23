/**
 * Firestore implementation of device storage
 */

import {
  DocumentReference,
  type Firestore,
  type Query,
  type Transaction,
} from 'firebase-admin/firestore'
import { type DeviceStorage, type Document } from './deviceStorage.js'
import { Device, type DevicePlatform, deviceConverter } from '../models/device.js'

/**
 * This class provides Firestore storage for device tokens
 */
export class FirestoreDeviceStorage implements DeviceStorage {
  // Properties
  private readonly firestore: Firestore
  private readonly devicesCollection: string
  private readonly userDevicesPathTemplate: string

  constructor(
    firestore: Firestore,
    options: {
      devicesCollection?: string
      userDevicesPathTemplate?: string
    } = {},
  ) {
    this.firestore = firestore
    this.devicesCollection = options.devicesCollection ?? 'devices'
    this.userDevicesPathTemplate =
      options.userDevicesPathTemplate ?? 'users/{userId}/devices'
  }

  /**
   * Get devices collection reference
   */
  private get devices(): Query {
    // We need to use type assertion here because the converter doesn't match Firestore's expected type
    return this.firestore
      .collectionGroup(this.devicesCollection)
      .withConverter(this.converter<Device>(deviceConverter.encode) as any)
  }

  /**
   * Get user devices collection reference
   * @param userId The user ID
   */
  private userDevices(userId: string) {
    const path = this.userDevicesPathTemplate.replace('{userId}', userId)
    return this.firestore.collection(path)
  }

  /**
   * Create a Firestore converter for a specific type
   * @param encoder Function to encode the type to Firestore
   */
  private converter<T>(encoder: (data: T) => Record<string, any>) {
    return {
      toFirestore: (data: T) => encoder(data),
      fromFirestore: (
        snapshot: FirebaseFirestore.QueryDocumentSnapshot<any>,
      ) => {
        const data = snapshot.data()
        return {
          id: snapshot.id,
          path: snapshot.ref.path,
          lastUpdate: snapshot.updateTime.toDate() ?? new Date(),
          content: data as unknown as T,
        } as Document<T>
      },
    }
  }

  /**
   * Run a transaction in Firestore
   * @param callback Transaction callback
   */
  private async runTransaction<T>(
    callback: (deviceQuery: Query<any>, transaction: Transaction) => Promise<T>,
  ): Promise<T> {
    return this.firestore.runTransaction(async (transaction) => {
      return callback(this.devices, transaction)
    })
  }

  /**
   * Store a device
   * @param userId The user ID
   * @param newDevice The device to store
   */
  async storeDevice(userId: string, newDevice: Device): Promise<void> {
    await this.runTransaction(async (deviceQuery, transaction) => {
      const devices = await transaction.get(
        deviceQuery.where(
          'notificationToken',
          '==',
          newDevice.notificationToken,
        ),
      )

      const userPath = this.userDevices(userId).path
      let didFindExistingDevice = false

      for (const device of devices.docs) {
        if (device.data().platform !== newDevice.platform) continue

        if (!didFindExistingDevice && device.ref.path.startsWith(userPath)) {
          transaction.set(device.ref, newDevice)
          didFindExistingDevice = true
        } else {
          transaction.delete(device.ref)
        }
      }

      if (!didFindExistingDevice) {
        // Create a new document with auto-generated ID
        const newDeviceCol = this.userDevices(userId)
        const newDeviceRef = newDeviceCol.doc()
        transaction.set(newDeviceRef, newDevice)
      }
    })
  }

  /**
   * Remove a device
   * @param userId The user ID (ignored in this implementation as we search all devices)
   * @param notificationToken The notification token to remove
   * @param platform The device platform
   */
  async removeDevice(
    _: string,
    notificationToken: string,
    platform: string,
  ): Promise<void> {
    await this.runTransaction(async (deviceQuery, transaction) => {
      const devices = await transaction.get(
        deviceQuery.where('notificationToken', '==', notificationToken),
      )

      for (const device of devices.docs) {
        if (device.data().platform !== platform) continue
        transaction.delete(device.ref)
      }
    })
  }

  /**
   * Get all devices for a user
   * @param userId The user ID
   */
  async getUserDevices(userId: string): Promise<Array<Document<Device>>> {
    // Get the devices collection and apply the converter
    const userDevicesCollection = this.userDevices(userId)
    const snapshot = await userDevicesCollection.get()

    return snapshot.docs.map((doc: any) => {
      const data = doc.data()
      return {
        id: doc.id,
        path: doc.ref.path,
        lastUpdate: doc.updateTime?.toDate() ?? new Date(),
        // Handle device data appropriately
        content: new Device({
          notificationToken: data.notificationToken,
          platform: data.platform as DevicePlatform,
          osVersion: data.osVersion ?? undefined,
          appVersion: data.appVersion ?? undefined,
          appBuild: data.appBuild ?? undefined,
          language: data.language ?? undefined,
          timeZone: data.timeZone ?? undefined,
        }),
      }
    })
  }

  /**
   * Remove an invalid token across all users
   * @param notificationToken The invalid token to remove
   */
  async removeInvalidToken(notificationToken: string): Promise<void> {
    await this.runTransaction(async (deviceQuery, transaction) => {
      const devices = await transaction.get(
        deviceQuery.where('notificationToken', '==', notificationToken),
      )

      for (const device of devices.docs) {
        transaction.delete(device.ref)
      }
    })
  }
}
