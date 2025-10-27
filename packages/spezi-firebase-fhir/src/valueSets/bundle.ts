//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The type of a bundle.
 * http://hl7.org/fhir/valueset-bundle-type.html
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

export type BundleType = z.infer<typeof bundleTypeSchema>

/**
 * The search mode of an entry in a bundle.
 * http://hl7.org/fhir/valueset-search-entry-mode.html
 */
export const bundleEntrySearchModeSchema = z.enum([
  'match',
  'include',
  'outcome',
])

export type BundleEntrySearchMode = z.infer<typeof bundleEntrySearchModeSchema>

/**
 * HTTP verbs (in the HTTP command line).
 * http://hl7.org/fhir/valueset-http-verb.html
 */
export const bundleEntryRequestMethodSchema = z.enum([
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
])

export type BundleEntryRequestMethod = z.infer<
  typeof bundleEntryRequestMethodSchema
>
