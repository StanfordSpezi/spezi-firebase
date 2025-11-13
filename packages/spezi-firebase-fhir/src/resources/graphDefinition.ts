//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type GraphDefinitionLinkTarget,
  type GraphDefinitionLinkTargetCompartment,
  type GraphDefinition,
  type GraphDefinitionLink,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  intSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  compartmentDefinitionCodeSchema,
  graphDefinitionLinkTargetCompartmentRuleSchema,
  graphDefinitionLinkTargetCompartmentUseSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const graphDefinitionLinkTargetCompartmentSchema: ZodType<GraphDefinitionLinkTargetCompartment> =
  backboneElementSchema.extend({
    code: compartmentDefinitionCodeSchema,
    _code: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    expression: stringSchema.optional(),
    _expression: elementSchema.optional(),
    rule: graphDefinitionLinkTargetCompartmentRuleSchema,
    _rule: elementSchema.optional(),
    use: graphDefinitionLinkTargetCompartmentUseSchema,
    _use: elementSchema.optional(),
  })

const graphDefinitionLinkTargetSchema: ZodType<GraphDefinitionLinkTarget> =
  backboneElementSchema.extend({
    compartment: graphDefinitionLinkTargetCompartmentSchema.array().optional(),
    get link() {
      return graphDefinitionLinkSchema.array().optional()
    },
    params: stringSchema.optional(),
    _params: elementSchema.optional(),
    profile: urlSchema.optional(),
    _profile: elementSchema.optional(),
    type: stringSchema,
    _type: elementSchema.optional(),
  })

const graphDefinitionLinkSchema: ZodType<GraphDefinitionLink> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    max: stringSchema.optional(),
    _max: elementSchema.optional(),
    min: intSchema.optional(),
    path: stringSchema.optional(),
    _path: elementSchema.optional(),
    sliceName: stringSchema.optional(),
    _sliceName: elementSchema.optional(),
    target: graphDefinitionLinkTargetSchema.array().optional(),
  })

/**
 * Zod schema for FHIR GraphDefinition resource (untyped version).
 */
export const untypedGraphDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('GraphDefinition').readonly(),
    contact: contactDetailSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    link: graphDefinitionLinkSchema.array().optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    profile: urlSchema.optional(),
    _profile: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    start: stringSchema,
    _start: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  }),
) satisfies ZodType<GraphDefinition>

/**
 * Zod schema for FHIR GraphDefinition resource.
 */
export const graphDefinitionSchema: ZodType<GraphDefinition> =
  untypedGraphDefinitionSchema

/**
 * Wrapper class for FHIR GraphDefinition resources.
 * Provides utility methods for working with graph definitions that specify resource relationships.
 */
export class FhirGraphDefinition extends FhirDomainResource<GraphDefinition> {
  // Static Functions

  /**
   * Parses a GraphDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the GraphDefinition schema
   * @returns A FhirGraphDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirGraphDefinition {
    return new FhirGraphDefinition(graphDefinitionSchema.parse(value))
  }
}
