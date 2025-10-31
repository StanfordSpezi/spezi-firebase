//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

export const subscriptionTopicCanFilterByModifierSchema = z.enum([
  '=',
  'eq',
  'ne',
  'gt',
  'lt',
  'ge',
  'le',
  'sa',
  'eb',
  'ap',
  'above',
  'below',
  'in',
  'not-in',
  'of-type',
])

export const subscriptionTopicResourceTriggerInteractionSchema = z.enum([
  'create',
  'update',
  'delete',
])

export const subscriptionTopicResourceTriggerQueryCriteriaResultSchema = z.enum(
  ['test-passes', 'test-fails'],
)
