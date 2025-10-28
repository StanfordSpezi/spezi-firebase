//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Indicates the state of the consent.
 * http://hl7.org/fhir/valueset-consent-state-codes.html
 */
export const consentStatusSchema = z.enum([
  'draft',
  'proposed',
  'active',
  'rejected',
  'inactive',
  'entered-in-error',
])

export type ConsentStatus = z.infer<typeof consentStatusSchema>

/**
 * How a resource reference is interpreted when testing consent restrictions.
 * http://hl7.org/fhir/valueset-consent-data-meaning.html
 */
export const consentDataMeaningSchema = z.enum([
  'instance',
  'related',
  'dependents',
  'authoredby',
])

export type ConsentDataMeaning = z.infer<typeof consentDataMeaningSchema>
