//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Codes indicating the level of authority/intentionality associated with a request.
 * http://hl7.org/fhir/ValueSet/request-intent
 */
export const requestIntentSchema = z.enum([
  'proposal',
  'plan',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

/**
 * Codes indicating the level of authority/intentionality associated with a request.
 * http://hl7.org/fhir/ValueSet/request-intent
 */
export type RequestIntent = z.infer<typeof requestIntentSchema>
