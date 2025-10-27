//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The type of link between this patient resource and another patient resource.
 * http://hl7.org/fhir/valueset-link-type.html
 */
export const patientLinkTypeSchema = z.enum([
  'replaced-by',
  'replaces',
  'refer',
  'seealso',
])

export type PatientLinkType = z.infer<typeof patientLinkTypeSchema>
