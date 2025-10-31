//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

export const searchParameterComparatorSchema = z.enum([
  'eq',
  'ne',
  'gt',
  'lt',
  'ge',
  'le',
  'sa',
  'eb',
  'ap',
])

export const searchParameterModifierSchema = z.enum([
  'missing',
  'exact',
  'contains',
  'not',
  'text',
  'in',
  'not-in',
  'below',
  'above',
  'type',
  'identifier',
  'ofType',
])

export const searchParameterTypeSchema = z.enum([
  'number',
  'date',
  'string',
  'token',
  'reference',
  'composite',
  'quantity',
  'uri',
  'special',
])

export const searchParameterXpathUsageSchema = z.enum([
  'normal',
  'phonetic',
  'nearby',
  'distance',
  'other',
])
