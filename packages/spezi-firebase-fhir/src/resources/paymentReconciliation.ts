//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type PaymentReconciliationDetail,
  type PaymentReconciliationProcessNote,
  type Coding,
  type PaymentReconciliation,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  stringSchema,
  moneySchema,
  dateTimeSchema,
  periodSchema,
  dateSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
  noteTypeSchema,
} from '../valueSets/index.js'

const paymentReconciliationDetailSchema: ZodType<PaymentReconciliationDetail> =
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    predecessor: identifierSchema.optional(),
    type: codeableConceptSchema,
    request: referenceSchema.optional(),
    submitter: referenceSchema.optional(),
    response: referenceSchema.optional(),
    date: dateSchema.optional(),
    _date: elementSchema.optional(),
    responsible: referenceSchema.optional(),
    payee: referenceSchema.optional(),
    amount: moneySchema.optional(),
  })

const paymentReconciliationProcessNoteSchema: ZodType<PaymentReconciliationProcessNote> =
  backboneElementSchema.extend({
    type: noteTypeSchema.optional(),
    _type: elementSchema.optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR PaymentReconciliation resource (untyped version).
 */
export const untypedPaymentReconciliationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PaymentReconciliation').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    period: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    paymentIssuer: referenceSchema.optional(),
    request: referenceSchema.optional(),
    requestor: referenceSchema.optional(),
    outcome: remittanceOutcomeSchema.optional(),
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    paymentDate: dateSchema,
    _paymentDate: elementSchema.optional(),
    paymentAmount: moneySchema,
    paymentIdentifier: identifierSchema.optional(),
    detail: paymentReconciliationDetailSchema.array().optional(),
    formCode: codeableConceptSchema.optional(),
    processNote: paymentReconciliationProcessNoteSchema.array().optional(),
  }),
) satisfies ZodType<PaymentReconciliation>

/**
 * Zod schema for FHIR PaymentReconciliation resource.
 */
export const paymentReconciliationSchema: ZodType<PaymentReconciliation> =
  untypedPaymentReconciliationSchema

/**
 * Wrapper class for FHIR PaymentReconciliation resources.
 * Provides utility methods for working with payment reconciliations and financial settlements.
 */
export class FhirPaymentReconciliation extends FhirDomainResource<PaymentReconciliation> {
  // Static Functions

  /**
   * Parses a PaymentReconciliation resource from unknown data.
   *
   * @param value - The data to parse and validate against the PaymentReconciliation schema
   * @returns A FhirPaymentReconciliation instance containing the validated resource
   */
  public static parse(value: unknown): FhirPaymentReconciliation {
    return new FhirPaymentReconciliation(
      paymentReconciliationSchema.parse(value),
    )
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
