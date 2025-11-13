//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type EvidenceVariableCategory,
  type EvidenceVariableCharacteristicTimeFromStart,
  type EvidenceVariable,
  type EvidenceVariableCharacteristic,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dataRequirementSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  expressionSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  triggerDefinitionSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  evidenceVariableHandlingSchema,
  groupMeasureSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const evidenceVariableCharacteristicTimeFromStartSchema: ZodType<EvidenceVariableCharacteristicTimeFromStart> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    quantity: quantitySchema.optional(),
    range: rangeSchema.optional(),
    note: annotationSchema.array().optional(),
  })

const evidenceVariableCharacteristicSchema: ZodType<EvidenceVariableCharacteristic> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    definitionReference: referenceSchema.optional(),
    definitionCanonical: canonicalSchema.optional(),
    _definitionCanonical: elementSchema.optional(),
    definitionCodeableConcept: codeableConceptSchema.optional(),
    definitionExpression: expressionSchema.optional(),
    definitionDataRequirement: dataRequirementSchema.optional(),
    definitionTriggerDefinition: triggerDefinitionSchema.optional(),
    method: codeableConceptSchema.optional(),
    device: referenceSchema.optional(),
    exclude: booleanSchema.optional(),
    _exclude: elementSchema.optional(),
    timeFromStart: evidenceVariableCharacteristicTimeFromStartSchema.optional(),
    groupMeasure: groupMeasureSchema.optional(),
    _groupMeasure: elementSchema.optional(),
  })

const evidenceVariableCategorySchema: ZodType<EvidenceVariableCategory> =
  backboneElementSchema.extend({
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueRange: rangeSchema.optional(),
  })

/**
 * Zod schema for FHIR EvidenceVariable resource (untyped version).
 */
export const untypedEvidenceVariableSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EvidenceVariable').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    shortTitle: stringSchema.optional(),
    _shortTitle: elementSchema.optional(),
    subtitle: stringSchema.optional(),
    _subtitle: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    useContext: usageContextSchema.array().optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    actual: booleanSchema.optional(),
    _actual: elementSchema.optional(),
    characteristic: evidenceVariableCharacteristicSchema.array().optional(),
    handling: evidenceVariableHandlingSchema.optional(),
    _handling: elementSchema.optional(),
    category: evidenceVariableCategorySchema.array().optional(),
  }),
) satisfies ZodType<EvidenceVariable>

/**
 * Zod schema for FHIR EvidenceVariable resource.
 */
export const evidenceVariableSchema: ZodType<EvidenceVariable> =
  untypedEvidenceVariableSchema

/**
 * Wrapper class for FHIR EvidenceVariable resources.
 * Provides utility methods for working with evidence variables used in research and clinical studies.
 */
export class FhirEvidenceVariable extends FhirDomainResource<EvidenceVariable> {
  // Static Functions

  /**
   * Parses an EvidenceVariable resource from unknown data.
   *
   * @param value - The data to parse and validate against the EvidenceVariable schema
   * @returns A FhirEvidenceVariable instance containing the validated resource
   */
  public static parse(value: unknown): FhirEvidenceVariable {
    return new FhirEvidenceVariable(evidenceVariableSchema.parse(value))
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
