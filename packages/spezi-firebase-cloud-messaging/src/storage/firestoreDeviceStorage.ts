//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Firestore implementation of device storage
 */

import {
  type Firestore,
  type Query,
  type Transaction,
} from 'firebase-admin/firestore'
import { type DeviceStorage, type Document } from './deviceStorage.js'
import { type Device, deviceConverter } from '../models/device.js'

/**
 * This class provides Firestore storage for device tokens
 */
export class FirestoreDeviceStorage implements DeviceStorage {
  // Properties
  private readonly firestore: Firestore
  private readonly devicesCollection: string
  private readonly userDevicesPathTemplate: string

  /**
   * Creates a new FirestoreDeviceStorage instance
   * @param firestore Firestore instance
   * @param options Configuration options
   * @param options.devicesCollection Name of the devices collection (default: 'devices')
   * @param options.userDevicesPathTemplate Path template for user devices (default: 'users/{userId}/devices')
   */
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
   * @returns Query for all devices across users
   */
  private get devices(): Query {
    // Need to use type assertion due to FirebaseFirestore's complex types
    return (
      this.firestore
        .collectionGroup(this.devicesCollection)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        .withConverter(this.converter<Device>(deviceConverter.encode) as any)
    )
  }

  /**
   * Get user devices collection reference
   * @param userId The user ID
   * @returns Collection reference for the user's devices
   */
  private userDevices(userId: string) {
    const path = this.userDevicesPathTemplate.replace('{userId}', userId)
    return this.firestore.collection(path)
  }

  /**
   * Create a Firestore converter for a specific type
   * @param encoder Function to encode the type to Firestore
   * @returns Firestore converter object
   */
  private converter<T>(encoder: (data: T) => Record<string, unknown>) {
    return {
      toFirestore: (data: T): Record<string, unknown> => encoder(data),
      fromFirestore: (
        snapshot: FirebaseFirestore.QueryDocumentSnapshot<
          Record<string, unknown>
        >,
      ): Document<T> => {
        const data = snapshot.data()
        return {
          id: snapshot.id,
          path: snapshot.ref.path,
          // Firestore's toDate() should always return a Date, but adding a fallback just in case
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          lastUpdate: snapshot.updateTime.toDate() || new Date(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          content: deviceConverter.schema.parse(data) as unknown as T,
        }
      },
    }
  }

  /**
   * Run a transaction in Firestore
   * @param callback Transaction callback
   * @returns Promise resolving to the callback result
   */
  private async runTransaction<T>(
    callback: (deviceQuery: Query, transaction: Transaction) => Promise<T>,
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
   * @param _ The user ID (ignored in this implementation as we search all devices)
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
        // Compare as strings to avoid type issues
        if (String(device.data().platform) !== platform) continue
        transaction.delete(device.ref)
      }
    })
  }

  /**
   * Get all devices for a user
   * @param userId The user ID
   * @returns Promise resolving to array of device documents
   */
  async getUserDevices(userId: string): Promise<Array<Document<Device>>> {
    // Get the devices collection and apply the converter
    const userDevicesCollection = this.userDevices(userId)
    const devicesRef = userDevicesCollection.withConverter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
      this.converter<Device>(deviceConverter.encode) as any,
    )
    const snapshot = await devicesRef.get()

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        path: doc.ref.path,
        // Firestore's toDate() should always return a Date, but adding a fallback just in case
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        lastUpdate: doc.updateTime.toDate() || new Date(),
        content: data,
      } as Document<Device>
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
