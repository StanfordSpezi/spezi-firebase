//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CoverageClass,
  type CoverageCostToBeneficiary,
  type CoverageCostToBeneficiaryException,
  type Coverage,
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
  quantitySchema,
  moneySchema,
  positiveIntSchema,
  stringSchema,
  booleanSchema,
} from '../elements/index.js'
import { coverageStatusSchema } from '../valueSets/index.js'

const coverageClassSchema: ZodType<CoverageClass> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    value: stringSchema,
    _value: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
  })

const coverageCostToBeneficiaryExceptionSchema: ZodType<CoverageCostToBeneficiaryException> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    period: periodSchema.optional(),
  })

const coverageCostToBeneficiarySchema: ZodType<CoverageCostToBeneficiary> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueMoney: moneySchema.optional(),
    exception: coverageCostToBeneficiaryExceptionSchema.array().optional(),
  })

/**
 * Zod schema for FHIR Coverage resource (untyped version).
 */
export const untypedCoverageSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Coverage').readonly(),
    identifier: identifierSchema.array().optional(),
    status: coverageStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    policyHolder: referenceSchema.optional(),
    subscriber: referenceSchema.optional(),
    subscriberId: stringSchema.optional(),
    _subscriberId: elementSchema.optional(),
    beneficiary: referenceSchema,
    dependent: stringSchema.optional(),
    _dependent: elementSchema.optional(),
    relationship: codeableConceptSchema.optional(),
    period: periodSchema.optional(),
    payor: referenceSchema.array(),
    class: coverageClassSchema.array().optional(),
    order: positiveIntSchema.optional(),
    network: stringSchema.optional(),
    _network: elementSchema.optional(),
    costToBeneficiary: coverageCostToBeneficiarySchema.array().optional(),
    subrogation: booleanSchema.optional(),
    _subrogation: elementSchema.optional(),
    contract: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Coverage>

/**
 * Zod schema for FHIR Coverage resource.
 */
export const coverageSchema: ZodType<Coverage> = untypedCoverageSchema

/**
 * Wrapper class for FHIR Coverage resources.
 * Provides utility methods for working with insurance coverage information.
 */
export class FhirCoverage extends FhirDomainResource<Coverage> {
  // Static Functions

  /**
   * Parses a Coverage resource from unknown data.
   *
   * @param value - The data to parse and validate against the Coverage schema
   * @returns A FhirCoverage instance containing the validated resource
   */
  public static parse(value: unknown): FhirCoverage {
    return new FhirCoverage(coverageSchema.parse(value))
  }

  /**
   * Gets the coverage period start date as a JavaScript Date object.
   *
   * @returns The period start date, if available
   */
  public get periodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period?.start)
  }

  /**
   * Gets the coverage period end date as a JavaScript Date object.
   *
   * @returns The period end date, if available
   */
  public get periodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period?.end)
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
}
