//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { DeviceMetric } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedDeviceMetricSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('DeviceMetric').readonly(),
    })
    .passthrough(),
)

export const deviceMetricSchema = untypedDeviceMetricSchema

export class FhirDeviceMetric extends FhirDomainResource<DeviceMetric> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceMetric {
    const parsed = deviceMetricSchema.parse(value)
    return new FhirDeviceMetric(parsed as unknown as DeviceMetric)
  }
}
