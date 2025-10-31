//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { codeSchema } from '../elements/index.js'

/**
 * ResearchElementDefinition Type
 * http://hl7.org/fhir/ValueSet/research-element-type
 */
export const researchElementDefinitionTypeSchema = z.lazy(() =>
  codeSchema.pipe(z.enum(['population', 'exposure', 'outcome'])),
)

/**
 * Variable Type
 * http://hl7.org/fhir/ValueSet/variable-type
 */
export const variableTypeSchema = z.lazy(() =>
  codeSchema.pipe(z.enum(['dichotomous', 'continuous', 'descriptive'])),
)
