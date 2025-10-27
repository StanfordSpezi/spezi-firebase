//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Indicates the purpose of a bundle - how it was intended to be used.
 */
export const bundleTypeSchema = z.enum([
  'document',
  'message',
  'transaction',
  'transaction-response',
  'batch',
  'batch-response',
  'history',
  'searchset',
  'collection',
])

/**
 * HTTP verbs (in the HTTP command line).
 */
export const bundleEntryRequestMethodSchema = z.enum([
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
])

/**
 * Why a match was found.
 */
export const bundleEntrySearchModeSchema = z.enum([
  'match',
  'include',
  'outcome',
])
