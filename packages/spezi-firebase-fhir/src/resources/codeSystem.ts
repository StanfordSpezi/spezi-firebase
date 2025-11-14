//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CodeSystemConceptDesignation,
  type CodeSystemConceptProperty,
  type CodeSystemFilter,
  type CodeSystemProperty,
  type CodeSystem,
  type CodeSystemConcept,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  stringSchema,
  uriSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  codeSystemContentSchema,
  codeSystemHierarchyMeaningSchema,
  codeSystemPropertyTypeSchema,
  filterOperatorSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const codeSystemConceptDesignationSchema: ZodType<CodeSystemConceptDesignation> =
  backboneElementSchema.extend({
    language: stringSchema.optional(),
    _language: elementSchema.optional(),
    use: codingSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  })

const codeSystemConceptPropertySchema: ZodType<CodeSystemConceptProperty> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    valueCode: stringSchema.optional(),
    _valueCode: elementSchema.optional(),
    valueCoding: codingSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueInteger: intSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valueDecimal: decimalSchema.optional(),
  })

const codeSystemConceptSchema: ZodType<CodeSystemConcept> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    definition: stringSchema.optional(),
    _definition: elementSchema.optional(),
    designation: codeSystemConceptDesignationSchema.array().optional(),
    property: codeSystemConceptPropertySchema.array().optional(),
    get concept() {
      return codeSystemConceptSchema.array().optional()
    },
  })

const codeSystemFilterSchema: ZodType<CodeSystemFilter> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    operator: filterOperatorSchema.array(),
    _operator: elementSchema.array().optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  })

const codeSystemPropertySchema: ZodType<CodeSystemProperty> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    type: codeSystemPropertyTypeSchema,
    _type: elementSchema.optional(),
    uri: uriSchema.optional(),
    _uri: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR CodeSystem resource (untyped version).
 */
export const untypedCodeSystemSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CodeSystem').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    caseSensitive: booleanSchema.optional(),
    _caseSensitive: elementSchema.optional(),
    valueSet: urlSchema.optional(),
    _valueSet: elementSchema.optional(),
    hierarchyMeaning: codeSystemHierarchyMeaningSchema.optional(),
    _hierarchyMeaning: elementSchema.optional(),
    compositional: booleanSchema.optional(),
    _compositional: elementSchema.optional(),
    versionNeeded: booleanSchema.optional(),
    _versionNeeded: elementSchema.optional(),
    content: codeSystemContentSchema,
    _content: elementSchema.optional(),
    supplements: urlSchema.optional(),
    _supplements: elementSchema.optional(),
    count: intSchema.optional(),
    filter: codeSystemFilterSchema.array().optional(),
    property: codeSystemPropertySchema.array().optional(),
    concept: codeSystemConceptSchema.array().optional(),
  }),
) satisfies ZodType<CodeSystem>

/**
 * Zod schema for FHIR CodeSystem resource.
 */
export const codeSystemSchema: ZodType<CodeSystem> = untypedCodeSystemSchema

/**
 * Wrapper class for FHIR CodeSystem resources.
 * Provides utility methods for working with code systems and terminology definitions.
 */
export class FhirCodeSystem extends FhirDomainResource<CodeSystem> {
  // Static Functions

  /**
   * Parses a CodeSystem resource from unknown data.
   *
   * @param value - The data to parse and validate against the CodeSystem schema
   * @returns A FhirCodeSystem instance containing the validated resource
   */
  public static parse(value: unknown): FhirCodeSystem {
    return new FhirCodeSystem(codeSystemSchema.parse(value))
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
