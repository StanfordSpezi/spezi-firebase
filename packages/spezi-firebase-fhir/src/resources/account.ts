//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AccountCoverage,
  type AccountGuarantor,
  type Account,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  booleanSchema,
  positiveIntSchema,
} from '../elements/index.js'
import { accountStatusSchema } from '../valueSets/index.js'

const accountCoverageSchema: ZodType<AccountCoverage> =
  backboneElementSchema.extend({
    coverage: referenceSchema,
    priority: positiveIntSchema.optional(),
  })

const accountGuarantorSchema: ZodType<AccountGuarantor> =
  backboneElementSchema.extend({
    party: referenceSchema,
    onHold: booleanSchema.optional(),
    _onHold: elementSchema.optional(),
    period: periodSchema.optional(),
  })

/**
 * Zod schema for FHIR Account resource (untyped version).
 */
export const untypedAccountSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Account').readonly(),
    identifier: identifierSchema.array().optional(),
    status: accountStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    subject: referenceSchema.array().optional(),
    servicePeriod: periodSchema.optional(),
    coverage: accountCoverageSchema.array().optional(),
    owner: referenceSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    guarantor: accountGuarantorSchema.array().optional(),
    partOf: referenceSchema.optional(),
  }),
) satisfies ZodType<Account>

/**
 * Zod schema for FHIR Account resource.
 */
export const accountSchema: ZodType<Account> = untypedAccountSchema

/**
 * Wrapper class for FHIR Account resources.
 * Provides convenience methods to parse and access common Account fields
 * such as identifiers and display strings.
 */
export class FhirAccount extends FhirDomainResource<Account> {
  // Static Functions

  /**
   * Parses an Account resource from unknown data.
   *
   * @param value - The data to parse and validate against the Account schema
   * @returns A FhirAccount instance containing the validated resource
   */
  public static parse(value: unknown): FhirAccount {
    return new FhirAccount(accountSchema.parse(value))
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   * Uses the generic FhirDomainResource helper under the hood.
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
   * Gets the account type as human-readable display text.
   * Falls back to the first coding display if text is not present.
   *
   * @returns The account type display text, if available
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }
}
