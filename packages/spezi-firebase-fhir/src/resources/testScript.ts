//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { TestScript } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedTestScriptSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('TestScript').readonly(),
    })
    .passthrough(),
)

export const testScriptSchema = untypedTestScriptSchema

export class FhirTestScript extends FhirDomainResource<TestScript> {
  // Static Functions

  public static parse(value: unknown): FhirTestScript {
    const parsed = testScriptSchema.parse(value)
    return new FhirTestScript(parsed as unknown as TestScript)
  }
}
