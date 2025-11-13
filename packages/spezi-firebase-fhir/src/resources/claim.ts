//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ClaimAccident,
  type ClaimCareTeam,
  type ClaimDiagnosis,
  type ClaimInsurance,
  type ClaimItem,
  type ClaimItemDetail,
  type ClaimPayee,
  type ClaimProcedure,
  type ClaimRelated,
  type ClaimSupportingInfo,
  type Claim,
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
  referenceSchema,
  stringSchema,
  periodSchema,
  dateTimeSchema,
  moneySchema,
  quantitySchema,
  decimalSchema,
  addressSchema,
  booleanSchema,
  positiveIntSchema,
  dateSchema,
  attachmentSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  claimUseSchema,
} from '../valueSets/index.js'

const claimRelatedSchema: ZodType<ClaimRelated> = backboneElementSchema.extend({
  claim: referenceSchema.optional(),
  relationship: codeableConceptSchema.optional(),
  reference: identifierSchema.optional(),
})

const claimPayeeSchema: ZodType<ClaimPayee> = backboneElementSchema.extend({
  type: codeableConceptSchema,
  party: referenceSchema.optional(),
})

const claimCareTeamSchema: ZodType<ClaimCareTeam> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    provider: referenceSchema,
    responsible: booleanSchema.optional(),
    _responsible: elementSchema.optional(),
    role: codeableConceptSchema.optional(),
    qualification: codeableConceptSchema.optional(),
  })

const claimSupportingInfoSchema: ZodType<ClaimSupportingInfo> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    category: codeableConceptSchema,
    code: codeableConceptSchema.optional(),
    timingDate: dateSchema.optional(),
    _timingDate: elementSchema.optional(),
    timingPeriod: periodSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueAttachment: attachmentSchema.optional(),
    valueReference: referenceSchema.optional(),
    reason: codeableConceptSchema.optional(),
  })

const claimDiagnosisSchema: ZodType<ClaimDiagnosis> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    diagnosisCodeableConcept: codeableConceptSchema.optional(),
    diagnosisReference: referenceSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    onAdmission: codeableConceptSchema.optional(),
    packageCode: codeableConceptSchema.optional(),
  })

const claimProcedureSchema: ZodType<ClaimProcedure> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    type: codeableConceptSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    procedureCodeableConcept: codeableConceptSchema.optional(),
    procedureReference: referenceSchema.optional(),
    udi: referenceSchema.array().optional(),
  })

const claimInsuranceSchema: ZodType<ClaimInsurance> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    focal: booleanSchema,
    _focal: elementSchema.optional(),
    identifier: identifierSchema.optional(),
    coverage: referenceSchema,
    businessArrangement: stringSchema.optional(),
    _businessArrangement: elementSchema.optional(),
    preAuthRef: stringSchema.array().optional(),
    _preAuthRef: elementSchema.array().optional(),
    claimResponse: referenceSchema.optional(),
  })

const claimAccidentSchema: ZodType<ClaimAccident> =
  backboneElementSchema.extend({
    date: dateSchema,
    _date: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    locationAddress: addressSchema.optional(),
    locationReference: referenceSchema.optional(),
  })

const claimItemDetailSchema: ZodType<ClaimItemDetail> =
  backboneElementSchema.extend({
    sequence: positiveIntSchema,
    revenue: codeableConceptSchema.optional(),
    category: codeableConceptSchema.optional(),
    productOrService: codeableConceptSchema,
    modifier: codeableConceptSchema.array().optional(),
    programCode: codeableConceptSchema.array().optional(),
    quantity: quantitySchema.optional(),
    unitPrice: moneySchema.optional(),
    factor: decimalSchema.optional(),
    net: moneySchema.optional(),
    udi: referenceSchema.array().optional(),
  })

const claimItemSchema: ZodType<ClaimItem> = backboneElementSchema.extend({
  sequence: positiveIntSchema,
  careTeamSequence: positiveIntSchema.array().optional(),
  diagnosisSequence: positiveIntSchema.array().optional(),
  procedureSequence: positiveIntSchema.array().optional(),
  informationSequence: positiveIntSchema.array().optional(),
  revenue: codeableConceptSchema.optional(),
  category: codeableConceptSchema.optional(),
  productOrService: codeableConceptSchema,
  modifier: codeableConceptSchema.array().optional(),
  programCode: codeableConceptSchema.array().optional(),
  servicedDate: dateSchema.optional(),
  _servicedDate: elementSchema.optional(),
  servicedPeriod: periodSchema.optional(),
  locationCodeableConcept: codeableConceptSchema.optional(),
  locationAddress: addressSchema.optional(),
  locationReference: referenceSchema.optional(),
  quantity: quantitySchema.optional(),
  unitPrice: moneySchema.optional(),
  factor: decimalSchema.optional(),
  net: moneySchema.optional(),
  udi: referenceSchema.array().optional(),
  bodySite: codeableConceptSchema.optional(),
  subSite: codeableConceptSchema.array().optional(),
  encounter: referenceSchema.array().optional(),
  detail: claimItemDetailSchema.array().optional(),
})

/**
 * Zod schema for FHIR Claim resource (untyped version).
 */
export const untypedClaimSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Claim').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema,
    subType: codeableConceptSchema.optional(),
    use: claimUseSchema,
    _use: elementSchema.optional(),
    patient: referenceSchema,
    billablePeriod: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    enterer: referenceSchema.optional(),
    insurer: referenceSchema.optional(),
    provider: referenceSchema,
    priority: codeableConceptSchema,
    fundsReserve: codeableConceptSchema.optional(),
    related: claimRelatedSchema.array().optional(),
    prescription: referenceSchema.optional(),
    originalPrescription: referenceSchema.optional(),
    payee: claimPayeeSchema.optional(),
    referral: referenceSchema.optional(),
    facility: referenceSchema.optional(),
    careTeam: claimCareTeamSchema.array().optional(),
    supportingInfo: claimSupportingInfoSchema.array().optional(),
    diagnosis: claimDiagnosisSchema.array().optional(),
    procedure: claimProcedureSchema.array().optional(),
    insurance: claimInsuranceSchema.array(),
    accident: claimAccidentSchema.optional(),
    item: claimItemSchema.array().optional(),
    total: moneySchema.optional(),
  }),
) satisfies ZodType<Claim>

/**
 * Zod schema for FHIR Claim resource.
 */
export const claimSchema: ZodType<Claim> = untypedClaimSchema

/**
 * Wrapper class for FHIR Claim resources.
 * Provides utility methods for working with billing claims.
 */
export class FhirClaim extends FhirDomainResource<Claim> {
  // Static Functions

  /**
   * Parses a Claim resource from unknown data.
   *
   * @param value - The data to parse and validate against the Claim schema
   * @returns A FhirClaim instance containing the validated resource
   */
  public static parse(value: unknown): FhirClaim {
    return new FhirClaim(claimSchema.parse(value))
  }

  /**
   * Gets the created date as a JavaScript Date object.
   *
   * @returns The created date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const created = claim.createdDate
   * console.log(`Claim created: ${created?.toLocaleDateString()}`)
   * ```
   */
  public get createdDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.created)
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

  /**
   * Gets the claim type display text.
   *
   * @returns The type display text, or undefined if not available
   *
   * @example
   * ```typescript
   * const type = claim.typeDisplay
   * console.log(`Claim type: ${type}`)
   * ```
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }
}
