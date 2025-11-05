//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  TerminologyCapabilitiesClosure,
  TerminologyCapabilitiesCodeSystem,
  TerminologyCapabilitiesCodeSystemVersion,
  TerminologyCapabilitiesCodeSystemVersionFilter,
  TerminologyCapabilitiesExpansion,
  TerminologyCapabilitiesExpansionParameter,
  TerminologyCapabilitiesImplementation,
  TerminologyCapabilitiesSoftware,
  TerminologyCapabilitiesTranslation,
  TerminologyCapabilitiesValidateCode,
  type TerminologyCapabilities,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  capabilityStatementKindSchema,
  codeSearchSupportSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const terminologyCapabilitiesSoftwareSchema: ZodType<TerminologyCapabilitiesSoftware> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  })

const terminologyCapabilitiesImplementationSchema: ZodType<TerminologyCapabilitiesImplementation> =
  backboneElementSchema.extend({
    description: stringSchema,
    _description: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
  })

const terminologyCapabilitiesCodeSystemVersionFilterSchema: ZodType<TerminologyCapabilitiesCodeSystemVersionFilter> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    op: stringSchema.array(),
    _op: elementSchema.array().optional(),
  })

const terminologyCapabilitiesCodeSystemVersionSchema: ZodType<TerminologyCapabilitiesCodeSystemVersion> =
  backboneElementSchema.extend({
    code: stringSchema.optional(),
    _code: elementSchema.optional(),
    isDefault: booleanSchema.optional(),
    _isDefault: elementSchema.optional(),
    compositional: booleanSchema.optional(),
    _compositional: elementSchema.optional(),
    language: stringSchema.array().optional(),
    _language: elementSchema.array().optional(),
    filter: terminologyCapabilitiesCodeSystemVersionFilterSchema
      .array()
      .optional(),
    property: stringSchema.array().optional(),
    _property: elementSchema.array().optional(),
  })

const terminologyCapabilitiesCodeSystemSchema: ZodType<TerminologyCapabilitiesCodeSystem> =
  backboneElementSchema.extend({
    uri: urlSchema.optional(),
    _uri: elementSchema.optional(),
    version: terminologyCapabilitiesCodeSystemVersionSchema.array().optional(),
    subsumption: booleanSchema.optional(),
    _subsumption: elementSchema.optional(),
  })

const terminologyCapabilitiesExpansionParameterSchema: ZodType<TerminologyCapabilitiesExpansionParameter> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
  })

const terminologyCapabilitiesExpansionSchema: ZodType<TerminologyCapabilitiesExpansion> =
  backboneElementSchema.extend({
    hierarchical: booleanSchema.optional(),
    _hierarchical: elementSchema.optional(),
    paging: booleanSchema.optional(),
    _paging: elementSchema.optional(),
    incomplete: booleanSchema.optional(),
    _incomplete: elementSchema.optional(),
    parameter: terminologyCapabilitiesExpansionParameterSchema
      .array()
      .optional(),
    textFilter: stringSchema.optional(),
    _textFilter: elementSchema.optional(),
  })

const terminologyCapabilitiesValidateCodeSchema: ZodType<TerminologyCapabilitiesValidateCode> =
  backboneElementSchema.extend({
    translations: booleanSchema,
    _translations: elementSchema.optional(),
  })

const terminologyCapabilitiesTranslationSchema: ZodType<TerminologyCapabilitiesTranslation> =
  backboneElementSchema.extend({
    needsMap: booleanSchema,
    _needsMap: elementSchema.optional(),
  })

const terminologyCapabilitiesClosureSchema: ZodType<TerminologyCapabilitiesClosure> =
  backboneElementSchema.extend({
    translation: booleanSchema.optional(),
    _translation: elementSchema.optional(),
  })

export const untypedTerminologyCapabilitiesSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TerminologyCapabilities').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
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
    date: dateTimeSchema,
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
    kind: capabilityStatementKindSchema,
    _kind: elementSchema.optional(),
    software: terminologyCapabilitiesSoftwareSchema.optional(),
    implementation: terminologyCapabilitiesImplementationSchema.optional(),
    lockedDate: booleanSchema.optional(),
    _lockedDate: elementSchema.optional(),
    codeSystem: terminologyCapabilitiesCodeSystemSchema.array().optional(),
    expansion: terminologyCapabilitiesExpansionSchema.optional(),
    codeSearch: codeSearchSupportSchema.optional(),
    _codeSearch: elementSchema.optional(),
    validateCode: terminologyCapabilitiesValidateCodeSchema.optional(),
    translation: terminologyCapabilitiesTranslationSchema.optional(),
    closure: terminologyCapabilitiesClosureSchema.optional(),
  }),
) satisfies ZodType<TerminologyCapabilities>

export const terminologyCapabilitiesSchema: ZodType<TerminologyCapabilities> =
  untypedTerminologyCapabilitiesSchema

export class FhirTerminologyCapabilities extends FhirDomainResource<TerminologyCapabilities> {
  // Static Functions

  public static parse(value: unknown): FhirTerminologyCapabilities {
    return new FhirTerminologyCapabilities(
      terminologyCapabilitiesSchema.parse(value),
    )
  }
}
