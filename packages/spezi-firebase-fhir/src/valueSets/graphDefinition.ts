//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR GraphDefinitionLinkTargetCompartmentRule value set.
 * How the compartment must match for the relationship to be included.
 */
export const graphDefinitionLinkTargetCompartmentRuleSchema = z.enum([
  'identical',
  'matching',
  'different',
  'custom',
])

/**
 * TypeScript type for FHIR GraphDefinitionLinkTargetCompartmentRule value set.
 */
export type GraphDefinitionLinkTargetCompartmentRule = z.infer<
  typeof graphDefinitionLinkTargetCompartmentRuleSchema
>

/**
 * Zod schema for FHIR GraphDefinitionLinkTargetCompartmentUse value set.
 * Whether the compartment rule is used to test for membership or to limit membership.
 */
export const graphDefinitionLinkTargetCompartmentUseSchema = z.enum([
  'condition',
  'requirement',
])

/**
 * TypeScript type for FHIR GraphDefinitionLinkTargetCompartmentUse value set.
 */
export type GraphDefinitionLinkTargetCompartmentUse = z.infer<
  typeof graphDefinitionLinkTargetCompartmentUseSchema
>
