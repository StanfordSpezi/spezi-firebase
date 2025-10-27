//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type Invoice } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedInvoiceSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Invoice').readonly(),
    })
    .passthrough(),
)

export const invoiceSchema = untypedInvoiceSchema

export class FhirInvoice extends FhirDomainResource<Invoice> {
  // Static Functions

  public static parse(value: unknown): FhirInvoice {
    const parsed = invoiceSchema.parse(value)
    return new FhirInvoice(parsed as unknown as Invoice)
  }
}
