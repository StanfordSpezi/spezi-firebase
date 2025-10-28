//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Degree of preference of a type of conditioned specimen.
 * http://hl7.org/fhir/valueset-specimen-contained-preference.html
 */
export const specimenDefinitionTypeTestedPreferenceSchema = z.enum([
  'preferred',
  'alternate',
])

export type SpecimenDefinitionTypeTestedPreference = z.infer<
  typeof specimenDefinitionTypeTestedPreferenceSchema
>
