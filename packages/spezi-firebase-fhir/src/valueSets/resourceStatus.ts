//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A status for resources like Device and Medication.
 * @see http://hl7.org/fhir/valueset-medication-status.html
 */
export const resourceStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
])
