/**
 * Firestore implementation of device storage
 */

import { DocumentReference, Firestore, Query, Transaction } from 'firebase-admin/firestore';
import { Device, DevicePlatform, deviceConverter } from '../models/device.js';
import { DeviceStorage, Document } from './deviceStorage.js';

/**
 * This class provides Firestore storage for device tokens
 */
export class FirestoreDeviceStorage implements DeviceStorage {
  // Properties
  private readonly firestore: Firestore;
  private readonly devicesCollection: string;
  private readonly userDevicesPathTemplate: string;

  constructor(
    firestore: Firestore, 
    options: { 
      devicesCollection?: string;
      userDevicesPathTemplate?: string;
    } = {}
  ) {
    this.firestore = firestore;
    this.devicesCollection = options.devicesCollection ?? 'devices';
    this.userDevicesPathTemplate = options.userDevicesPathTemplate ?? 'users/{userId}/devices';
  }

  /**
   * Get devices collection reference
   */
  private get devices(): Query<Device> {
    return this.firestore
      .collectionGroup(this.devicesCollection)
      .withConverter(this.converter<Device>(deviceConverter.encode));
  }

  /**
   * Get user devices collection reference
   * @param userId The user ID
   */
  private userDevices(userId: string): DocumentReference {
    const path = this.userDevicesPathTemplate.replace('{userId}', userId);
    return this.firestore.collection(path);
  }

  /**
   * Create a Firestore converter for a specific type
   * @param encoder Function to encode the type to Firestore
   */
  private converter<T>(encoder: (data: T) => Record<string, any>) {
    return {
      toFirestore: (data: T) => encoder(data),
      fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          path: snapshot.ref.path,
          lastUpdate: snapshot.updateTime?.toDate() ?? new Date(),
          content: data as T
        } as Document<T>;
      }
    };
  }

  /**
   * Run a transaction in Firestore
   * @param callback Transaction callback
   */
  private async runTransaction<T>(
    callback: (deviceQuery: Query<any>, transaction: Transaction) => Promise<T>
  ): Promise<T> {
    return this.firestore.runTransaction(async (transaction) => {
      return callback(this.devices, transaction);
    });
  }

  /**
   * Store a device
   * @param userId The user ID
   * @param newDevice The device to store
   */
  async storeDevice(userId: string, newDevice: Device): Promise<void> {
    await this.runTransaction(async (deviceQuery, transaction) => {
      const devices = await transaction.get(
        deviceQuery.where('notificationToken', '==', newDevice.notificationToken)
      );
      
      const userPath = this.userDevices(userId).path;
      let didFindExistingDevice = false;
      
      for (const device of devices.docs) {
        if (device.data().platform !== newDevice.platform) continue;
        
        if (!didFindExistingDevice && device.ref.path.startsWith(userPath)) {
          transaction.set(device.ref, newDevice);
          didFindExistingDevice = true;
        } else {
          transaction.delete(device.ref);
        }
      }

      if (!didFindExistingDevice) {
        const newDeviceRef = this.userDevices(userId).doc();
        transaction.set(newDeviceRef, newDevice);
      }
    });
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
    platform: string
  ): Promise<void> {
    await this.runTransaction(async (deviceQuery, transaction) => {
      const devices = await transaction.get(
        deviceQuery.where('notificationToken', '==', notificationToken)
      );
      
      for (const device of devices.docs) {
        if (device.data().platform !== platform) continue;
        transaction.delete(device.ref);
      }
    });
  }

  /**
   * Get all devices for a user
   * @param userId The user ID
   */
  async getUserDevices(userId: string): Promise<Document<Device>[]> {
    const userDevicesSnapshot = await this.userDevices(userId)
      .withConverter(this.converter<Device>(deviceConverter.encode))
      .get();
    
    return userDevicesSnapshot.docs.map(doc => ({
      id: doc.id,
      path: doc.ref.path,
      lastUpdate: doc.updateTime?.toDate() ?? new Date(),
      content: doc.data() as Device
    }));
  }

  /**
   * Remove an invalid token across all users
   * @param notificationToken The invalid token to remove
   */
  async removeInvalidToken(notificationToken: string): Promise<void> {
    await this.runTransaction(async (deviceQuery, transaction) => {
      const devices = await transaction.get(
        deviceQuery.where('notificationToken', '==', notificationToken)
      );
      
      for (const device of devices.docs) {
        transaction.delete(device.ref);
      }
    });
  }
}