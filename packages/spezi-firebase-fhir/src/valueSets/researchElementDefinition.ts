//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * ResearchElementDefinition Type
 * http://hl7.org/fhir/ValueSet/research-element-type
 */
export const researchElementDefinitionTypeSchema = z.enum([
  'population',
  'exposure',
  'outcome',
])

/**
 * ResearchElementDefinition Type
 * http://hl7.org/fhir/ValueSet/research-element-type
 */
export type ResearchElementDefinitionType = z.infer<
  typeof researchElementDefinitionTypeSchema
>

/**
 * Variable Type
 * http://hl7.org/fhir/ValueSet/variable-type
 */
export const variableTypeSchema = z.enum([
  'dichotomous',
  'continuous',
  'descriptive',
])

/**
 * Variable Type
 * http://hl7.org/fhir/ValueSet/variable-type
 */
export type VariableType = z.infer<typeof variableTypeSchema>
