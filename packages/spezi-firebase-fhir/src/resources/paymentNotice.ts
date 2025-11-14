//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type PaymentNotice } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  moneySchema,
  dateTimeSchema,
  dateSchema,
} from '../elements/index.js'
import { financialResourceStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR PaymentNotice resource (untyped version).
 */
export const untypedPaymentNoticeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PaymentNotice').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    request: referenceSchema.optional(),
    response: referenceSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    provider: referenceSchema.optional(),
    payment: referenceSchema,
    paymentDate: dateSchema.optional(),
    _paymentDate: elementSchema.optional(),
    payee: referenceSchema.optional(),
    recipient: referenceSchema,
    amount: moneySchema,
    paymentStatus: codeableConceptSchema.optional(),
  }),
) satisfies ZodType<PaymentNotice>

/**
 * Zod schema for FHIR PaymentNotice resource.
 */
export const paymentNoticeSchema: ZodType<PaymentNotice> =
  untypedPaymentNoticeSchema

/**
 * Wrapper class for FHIR PaymentNotice resources.
 * Provides utility methods for working with payment notices and financial transactions.
 */
export class FhirPaymentNotice extends FhirDomainResource<PaymentNotice> {
  // Static Functions

  /**
   * Parses a PaymentNotice resource from unknown data.
   *
   * @param value - The data to parse and validate against the PaymentNotice schema
   * @returns A FhirPaymentNotice instance containing the validated resource
   */
  public static parse(value: unknown): FhirPaymentNotice {
    return new FhirPaymentNotice(paymentNoticeSchema.parse(value))
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
