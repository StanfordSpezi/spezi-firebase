//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type InvoiceLineItem,
  type InvoiceLineItemPriceComponent,
  type InvoiceParticipant,
  type Coding,
  type Invoice,
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
  annotationSchema,
  moneySchema,
  decimalSchema,
  dateTimeSchema,
  positiveIntSchema,
} from '../elements/index.js'
import {
  invoiceStatusSchema,
  priceComponentTypeSchema,
} from '../valueSets/index.js'

const invoiceParticipantSchema: ZodType<InvoiceParticipant> =
  backboneElementSchema.extend({
    role: codeableConceptSchema.optional(),
    actor: referenceSchema,
  })

const invoiceLineItemPriceComponentSchema: ZodType<InvoiceLineItemPriceComponent> =
  backboneElementSchema.extend({
    type: priceComponentTypeSchema,
    _type: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    factor: decimalSchema.optional(),
    amount: moneySchema.optional(),
  })

const invoiceLineItemSchema: ZodType<InvoiceLineItem> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema.optional(),
    chargeItemReference: referenceSchema.optional(),
    chargeItemCodeableConcept: codeableConceptSchema.optional(),
    priceComponent: invoiceLineItemPriceComponentSchema.array().optional(),
  })

/**
 * Zod schema for FHIR Invoice resource (untyped version).
 */
export const untypedInvoiceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Invoice').readonly(),
    identifier: identifierSchema.array().optional(),
    status: invoiceStatusSchema,
    _status: elementSchema.optional(),
    cancelledReason: stringSchema.optional(),
    _cancelledReason: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    recipient: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    participant: invoiceParticipantSchema.array().optional(),
    issuer: referenceSchema.optional(),
    account: referenceSchema.optional(),
    lineItem: invoiceLineItemSchema.array().optional(),
    totalPriceComponent: invoiceLineItemPriceComponentSchema.array().optional(),
    totalNet: moneySchema.optional(),
    totalGross: moneySchema.optional(),
    paymentTerms: stringSchema.optional(),
    _paymentTerms: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Invoice>

/**
 * Zod schema for FHIR Invoice resource.
 */
export const invoiceSchema: ZodType<Invoice> = untypedInvoiceSchema

/**
 * Wrapper class for FHIR Invoice resources.
 * Provides utility methods for working with invoices and billing information.
 */
export class FhirInvoice extends FhirDomainResource<Invoice> {
  // Static Functions

  /**
   * Parses an Invoice resource from unknown data.
   *
   * @param value - The data to parse and validate against the Invoice schema
   * @returns A FhirInvoice instance containing the validated resource
   */
  public static parse(value: unknown): FhirInvoice {
    return new FhirInvoice(invoiceSchema.parse(value))
  }

  /**
   * Gets the invoice date as a JavaScript Date object.
   *
   * @returns The invoice date, or undefined if not set
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided Coding
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }

  /**
   * Gets the invoice type as human-readable display text.
   *
   * @returns The invoice type display text, if available
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }

  /**
   * Gets all note texts from the invoice.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }
}
