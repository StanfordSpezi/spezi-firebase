//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DeviceRequest } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedDeviceRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceRequest').readonly(),
  }).passthrough(),
)

export const deviceRequestSchema = untypedDeviceRequestSchema

export class FhirDeviceRequest extends FhirDomainResource<DeviceRequest> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceRequest {
    const parsed = deviceRequestSchema.parse(value)
    return new FhirDeviceRequest(parsed as unknown as DeviceRequest)
  }
}
