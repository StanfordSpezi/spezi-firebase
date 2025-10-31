//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

export const subscriptionStatusStatusSchema = z.enum([
  'requested',
  'active',
  'error',
  'off',
])

export const subscriptionStatusTypeSchema = z.enum([
  'handshake',
  'heartbeat',
  'event-notification',
  'query-status',
  'query-event',
])
