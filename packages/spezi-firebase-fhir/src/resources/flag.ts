//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type Flag } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedFlagSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Flag').readonly(),
    })
    .passthrough(),
)

export const flagSchema = untypedFlagSchema

export class FhirFlag extends FhirDomainResource<Flag> {
  // Static Functions

  public static parse(value: unknown): FhirFlag {
    const parsed = flagSchema.parse(value)
    return new FhirFlag(parsed as unknown as Flag)
  }
}
