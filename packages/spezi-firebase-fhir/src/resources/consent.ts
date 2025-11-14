//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ConsentPolicy,
  type ConsentProvision,
  type ConsentProvisionActor,
  type ConsentProvisionData,
  type ConsentVerification,
  type Consent,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import {
  consentDataMeaningSchema,
  consentStatusSchema,
  consentProvisionTypeSchema,
} from '../valueSets/index.js'

const consentPolicySchema: ZodType<ConsentPolicy> =
  backboneElementSchema.extend({
    authority: stringSchema.optional(),
    _authority: elementSchema.optional(),
    uri: uriSchema.optional(),
    _uri: elementSchema.optional(),
  })

const consentVerificationSchema: ZodType<ConsentVerification> =
  backboneElementSchema.extend({
    verified: booleanSchema,
    _verified: elementSchema.optional(),
    verificationDate: dateTimeSchema.optional(),
    _verificationDate: elementSchema.optional(),
    verifiedWith: referenceSchema.optional(),
  })

const consentProvisionActorSchema: ZodType<ConsentProvisionActor> =
  backboneElementSchema.extend({
    role: codeableConceptSchema,
    reference: referenceSchema,
  })

const consentProvisionDataSchema: ZodType<ConsentProvisionData> =
  backboneElementSchema.extend({
    meaning: consentDataMeaningSchema,
    _meaning: elementSchema.optional(),
    reference: referenceSchema,
  })

const consentProvisionSchema: ZodType<ConsentProvision> =
  backboneElementSchema.extend({
    type: consentProvisionTypeSchema.optional(),
    _type: elementSchema.optional(),
    period: periodSchema.optional(),
    actor: consentProvisionActorSchema.array().optional(),
    action: codeableConceptSchema.array().optional(),
    securityLabel: codingSchema.array().optional(),
    purpose: codingSchema.array().optional(),
    class: codingSchema.array().optional(),
    code: codeableConceptSchema.array().optional(),
    dataPeriod: periodSchema.optional(),
    data: consentProvisionDataSchema.array().optional(),
    get provision() {
      return consentProvisionSchema.array().optional()
    },
  })

/**
 * Zod schema for FHIR Consent resource (untyped version).
 */
export const untypedConsentSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Consent').readonly(),
    identifier: identifierSchema.array().optional(),
    status: consentStatusSchema,
    _status: elementSchema.optional(),
    scope: codeableConceptSchema,
    category: codeableConceptSchema.array().min(1),
    patient: referenceSchema.optional(),
    dateTime: dateTimeSchema.optional(),
    _dateTime: elementSchema.optional(),
    performer: referenceSchema.array().optional(),
    organization: referenceSchema.array().optional(),
    sourceAttachment: attachmentSchema.optional(),
    sourceReference: referenceSchema.optional(),
    policy: consentPolicySchema.array().optional(),
    policyRule: codeableConceptSchema.optional(),
    verification: consentVerificationSchema.array().optional(),
    provision: consentProvisionSchema.optional(),
  }),
) satisfies ZodType<Consent>

/**
 * Zod schema for FHIR Consent resource.
 */
export const consentSchema: ZodType<Consent> = untypedConsentSchema

/**
 * Wrapper class for FHIR Consent resources.
 * Provides utility methods for working with patient consent records.
 */
export class FhirConsent extends FhirDomainResource<Consent> {
  /**
   * Parses a Consent resource from unknown data.
   *
   * @param value - The data to parse and validate against the Consent schema
   * @returns A FhirConsent instance containing the validated resource
   */
  public static parse(value: unknown): FhirConsent {
    return new FhirConsent(consentSchema.parse(value))
  }

  /**
   * Gets the date/time when consent was agreed to as a JavaScript Date object.
   *
   * @returns The consent date/time, if available
   */
  public get dateTime(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.dateTime)
  }

  /**
   * Gets the scope of the consent as display text.
   *
   * @returns The scope display text, if available
   */
  public get scopeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.scope)
  }

  /**
   * Gets human-readable display strings for all consent category CodeableConcepts.
   *
   * @returns Array of category display texts
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
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
