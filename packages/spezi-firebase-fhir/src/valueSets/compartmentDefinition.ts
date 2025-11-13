//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR CompartmentDefinitionCode value set.
 * Which type of compartment a compartment definition describes.
 */
export const compartmentDefinitionCodeSchema = z.enum([
  'Patient',
  'Encounter',
  'RelatedPerson',
  'Practitioner',
  'Device',
])
