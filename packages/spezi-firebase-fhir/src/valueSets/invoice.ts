//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR InvoicePriceComponentType value set.
 * The type of price component in an invoice.
 */
export const invoicePriceComponentTypeSchema = z.enum([
  'base',
  'surcharge',
  'deduction',
  'discount',
  'tax',
  'informational',
])

/**
 * TypeScript type for FHIR InvoicePriceComponentType value set.
 */
export type InvoicePriceComponentType = z.infer<
  typeof invoicePriceComponentTypeSchema
>
