//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ExampleScenario } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedExampleScenarioSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ExampleScenario').readonly(),
    })
    .passthrough(),
)

export const exampleScenarioSchema = untypedExampleScenarioSchema

export class FhirExampleScenario extends FhirDomainResource<ExampleScenario> {
  // Static Functions

  public static parse(value: unknown): FhirExampleScenario {
    const parsed = exampleScenarioSchema.parse(value)
    return new FhirExampleScenario(parsed as unknown as ExampleScenario)
  }
}
