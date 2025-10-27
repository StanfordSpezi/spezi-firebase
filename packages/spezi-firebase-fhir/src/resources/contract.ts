//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type Contract } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedContractSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Contract').readonly(),
    })
    .passthrough(),
)

export const contractSchema = untypedContractSchema

export class FhirContract extends FhirDomainResource<Contract> {
  // Static Functions

  public static parse(value: unknown): FhirContract {
    const parsed = contractSchema.parse(value)
    return new FhirContract(parsed as unknown as Contract)
  }
}
