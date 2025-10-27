//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type MolecularSequence } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedMolecularSequenceSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('MolecularSequence').readonly(),
    })
    .passthrough(),
)

export const molecularSequenceSchema = untypedMolecularSequenceSchema

export class FhirMolecularSequence extends FhirDomainResource<MolecularSequence> {
  // Static Functions

  public static parse(value: unknown): FhirMolecularSequence {
    const parsed = molecularSequenceSchema.parse(value)
    return new FhirMolecularSequence(parsed as unknown as MolecularSequence)
  }
}
