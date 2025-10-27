//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DeviceUseStatement } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedDeviceUseStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceUseStatement').readonly(),
  }).passthrough(),
)

export const deviceUseStatementSchema = untypedDeviceUseStatementSchema

export class FhirDeviceUseStatement extends FhirDomainResource<DeviceUseStatement> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceUseStatement {
    const parsed = deviceUseStatementSchema.parse(value)
    return new FhirDeviceUseStatement(parsed as unknown as DeviceUseStatement)
  }
}
