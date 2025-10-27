//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type BiologicallyDerivedProduct } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedBiologicallyDerivedProductSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('BiologicallyDerivedProduct').readonly(),
    })
    .passthrough(),
)

export const biologicallyDerivedProductSchema =
  untypedBiologicallyDerivedProductSchema

export class FhirBiologicallyDerivedProduct extends FhirDomainResource<BiologicallyDerivedProduct> {
  // Static Functions

  public static parse(value: unknown): FhirBiologicallyDerivedProduct {
    const parsed = biologicallyDerivedProductSchema.parse(value)
    return new FhirBiologicallyDerivedProduct(
      parsed as unknown as BiologicallyDerivedProduct,
    )
  }
}
