//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Type of price component for charge items.
 * http://hl7.org/fhir/valueset-invoice-priceComponentType.html
 */
export const priceComponentTypeSchema = z.enum([
  'base',
  'surcharge',
  'deduction',
  'discount',
  'tax',
  'informational',
])

/**
 * Type of price component for charge items.
 * http://hl7.org/fhir/valueset-invoice-priceComponentType.html
 */
export type PriceComponentType = z.infer<typeof priceComponentTypeSchema>
