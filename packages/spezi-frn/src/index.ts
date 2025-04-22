/**
 * Firebase Notifications Package
 * A standalone package for handling Firebase Cloud Messaging (FCM) notifications
 */

// Models
export * from './models/device.js';
export * from './models/message.js';
export * from './models/localizedText.js';

// Storage
export * from './storage/deviceStorage.js';
export * from './storage/firestoreDeviceStorage.js';

// Services
export * from './services/notificationService.js';
export * from './services/firebaseNotificationService.js';

// Functions
export * from './functions/registerDevice.js';
export * from './functions/unregisterDevice.js';

// Utils
export * from './utils/dateConverter.js';
export * from './utils/lazy.js';
export * from './utils/optionalish.js';
export * from './utils/schemaConverter.js';