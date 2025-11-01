//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Type of clinical use definition
 * http://hl7.org/fhir/valueset-clinical-use-definition-type.html
 */
export const clinicalUseDefinitionTypeSchema = z.enum([
  'indication',
  'contraindication',
  'interaction',
  'undesirable-effect',
  'warning',
])

export type ClinicalUseDefinitionType = z.infer<
  typeof clinicalUseDefinitionTypeSchema
>
