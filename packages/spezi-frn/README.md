<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Spezi Firebase Remote Notifications

[![Build and Test](https://github.com/StanfordSpezi/spezi-firebase/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-firebase/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/spezi-firebase/graph/badge.svg)](https://codecov.io/gh/StanfordSpezi/spezi-firebase)

A standalone package for handling Firebase Cloud Messaging (FCM) remote notifications in Spezi applications. This package provides a complete solution for managing device registration, sending multi-language notifications, and handling message delivery across different platforms.

This package is part of the [Spezi Firebase](https://github.com/StanfordSpezi/spezi-firebase) project and depends on the `spezi-firebase-utils` package for core utilities.

## Features

- Device registration and token management
- Multi-language notification support
- Platform-specific message formatting (iOS, Android, Web)
- Support for rich notification content
- Token invalidation handling
- Firestore integration for device storage

## Installation

```bash
npm install @stanfordbdhg/spezi-firebase-remote-notifications
```

## Quick Start

```typescript
import { initializeApp, cert } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'
import { getFirestore } from 'firebase-admin/firestore'
import {
  FirebaseNotificationService,
  FirestoreDeviceStorage,
  Message,
  DevicePlatform,
  Device,
  LocalizedText,
} from '@stanfordbdhg/spezi-firebase-remote-notifications'

// Initialize Firebase
const app = initializeApp()
const messaging = getMessaging(app)
const firestore = getFirestore(app)

// Initialize device storage
const deviceStorage = new FirestoreDeviceStorage(firestore)

// Initialize notification service
const notificationService = new FirebaseNotificationService(
  messaging,
  deviceStorage,
)

// Register a device
await notificationService.registerDevice(
  'user123',
  new Device({
    notificationToken: 'fcm-token-123',
    platform: DevicePlatform.iOS,
    language: 'en',
    appVersion: '1.0.0',
  }),
)

// Send a notification
await notificationService.sendNotification('user123', {
  title: { en: 'Hello', de: 'Hallo' },
  body: {
    en: 'This is a test notification',
    de: 'Dies ist eine Test-Benachrichtigung',
  },
  data: { action: 'open_home' },
})

// Create and send a message notification
const message = Message.createInformation({
  title: { en: 'Information', de: 'Information' },
  description: {
    en: 'This is important information',
    de: 'Dies ist eine wichtige Information',
  },
  action: 'view_details',
  isDismissible: true,
  data: { itemId: '123' },
})

// Send a message-based notification
await notificationService.sendMessageNotification('user123', {
  id: 'message-123',
  path: '/messages/message-123',
  lastUpdate: new Date(),
  content: message,
})

// Unregister a device
await notificationService.unregisterDevice(
  'user123',
  'fcm-token-123',
  DevicePlatform.iOS,
)
```

## Firebase Functions Integration

This package includes helpers for creating Firebase Functions:

```typescript
import { onCall } from 'firebase-functions/v2/https'
import {
  createRegisterDeviceHandler,
  createUnregisterDeviceHandler,
  registerDeviceInputSchema,
  unregisterDeviceInputSchema,
} from '@stanfordbdhg/spezi-firebase-remote-notifications'

// Create function handlers
const registerDeviceHandler = createRegisterDeviceHandler(notificationService)
const unregisterDeviceHandler =
  createUnregisterDeviceHandler(notificationService)

// Create Firebase Functions
export const registerDevice = onCall(
  {
    schema: registerDeviceInputSchema,
  },
  async (request) => {
    const userId = request.auth?.uid
    if (!userId) throw new Error('Unauthorized')

    return registerDeviceHandler(userId, request.data)
  },
)

export const unregisterDevice = onCall(
  {
    schema: unregisterDeviceInputSchema,
  },
  async (request) => {
    const userId = request.auth?.uid
    if (!userId) throw new Error('Unauthorized')

    return unregisterDeviceHandler(userId, request.data)
  },
)
```

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/spezi-firebase/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/spezi-firebase/tree/main/CONTRIBUTORS.md) for a full list of all Spezi Firebase contributors.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)
