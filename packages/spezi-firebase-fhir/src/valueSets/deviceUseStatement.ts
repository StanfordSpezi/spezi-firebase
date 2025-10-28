//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A coded concept indicating the current status of the Device Usage.
 * http://hl7.org/fhir/valueset-device-statement-status.html
 */
export const deviceUseStatementStatusSchema = z.enum([
  'active',
  'completed',
  'entered-in-error',
  'intended',
  'stopped',
  'on-hold',
])

export type DeviceUseStatementStatus = z.infer<
  typeof deviceUseStatementStatusSchema
>
