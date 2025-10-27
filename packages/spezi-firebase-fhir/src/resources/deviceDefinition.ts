//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DeviceDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedDeviceDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceDefinition').readonly(),
  }).passthrough(),
)

export const deviceDefinitionSchema = untypedDeviceDefinitionSchema

export class FhirDeviceDefinition extends FhirDomainResource<DeviceDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceDefinition {
    const parsed = deviceDefinitionSchema.parse(value)
    return new FhirDeviceDefinition(parsed as unknown as DeviceDefinition)
  }
}
