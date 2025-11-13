//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR BindingStrength value set.
 * Indication of the degree of conformance expectations associated with a binding.
 */
export const bindingStrengthSchema = z.enum([
  'required',
  'extensible',
  'preferred',
  'example',
])

/**
 * TypeScript type for FHIR BindingStrength value set.
 */
export type BindingStrength = z.infer<typeof bindingStrengthSchema>

/**
 * Zod schema for FHIR OperationDefinitionKind value set.
 * Whether an operation is a normal operation or a query.
 */
export const operationDefinitionKindSchema = z.enum(['operation', 'query'])

/**
 * TypeScript type for FHIR OperationDefinitionKind value set.
 */
export type OperationDefinitionKind = z.infer<
  typeof operationDefinitionKindSchema
>

/**
 * Zod schema for FHIR OperationDefinitionParameterUse value set.
 * Whether an operation parameter is an input or an output parameter.
 */
export const operationDefinitionParameterUseSchema = z.enum(['in', 'out'])

/**
 * TypeScript type for FHIR OperationDefinitionParameterUse value set.
 */
export type OperationDefinitionParameterUse = z.infer<
  typeof operationDefinitionParameterUseSchema
>
