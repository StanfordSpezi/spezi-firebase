//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR MessageDefinitionCategory value set.
 * The category of message.
 */
export const messageDefinitionCategorySchema = z.enum([
  'consequence',
  'currency',
  'notification',
])

/**
 * TypeScript type for FHIR MessageDefinitionCategory value set.
 */
export type MessageDefinitionCategory = z.infer<
  typeof messageDefinitionCategorySchema
>

/**
 * Zod schema for FHIR MessageDefinitionResponseRequired value set.
 * Whether a response is required for a message.
 */
export const messageDefinitionResponseRequiredSchema = z.enum([
  'always',
  'on-error',
  'never',
  'on-success',
])

/**
 * TypeScript type for FHIR MessageDefinitionResponseRequired value set.
 */
export type MessageDefinitionResponseRequired = z.infer<
  typeof messageDefinitionResponseRequiredSchema
>
