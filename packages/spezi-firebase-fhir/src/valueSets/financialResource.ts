//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the resource instance.
 * http://hl7.org/fhir/valueset-fm-status.html
 */
export const financialResourceStatusSchema = z.enum([
  'active',
  'cancelled',
  'draft',
  'entered-in-error',
])

/**
 * A code specifying the state of the resource instance.
 * http://hl7.org/fhir/valueset-fm-status.html
 */
export type FinancialResourceStatus = z.infer<
  typeof financialResourceStatusSchema
>

/**
 * A code specifying the state of a ChargeItemDefinition.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const chargeItemDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

/**
 * A code specifying the state of a ChargeItemDefinition.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export type ChargeItemDefinitionStatus = z.infer<
  typeof chargeItemDefinitionStatusSchema
>

/**
 * Codes identifying the lifecycle stage of an Invoice.
 * http://hl7.org/fhir/valueset-invoice-status.html
 */
export const invoiceStatusSchema = z.enum([
  'draft',
  'issued',
  'balanced',
  'cancelled',
  'entered-in-error',
])

/**
 * Codes identifying the lifecycle stage of an Invoice.
 * http://hl7.org/fhir/valueset-invoice-status.html
 */
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>

/**
 * Codes identifying the lifecycle stage of an InsurancePlan.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const insurancePlanStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

/**
 * Codes identifying the lifecycle stage of an InsurancePlan.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export type InsurancePlanStatus = z.infer<typeof insurancePlanStatusSchema>

/**
 * The processing outcome for the request.
 * http://hl7.org/fhir/valueset-remittance-outcome.html
 */
export const remittanceOutcomeSchema = z.enum([
  'queued',
  'complete',
  'error',
  'partial',
])

/**
 * The processing outcome for the request.
 * http://hl7.org/fhir/valueset-remittance-outcome.html
 */
export type RemittanceOutcome = z.infer<typeof remittanceOutcomeSchema>
