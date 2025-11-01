//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type TerminologyCapabilities } from 'fhir/r4b.js'
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
    software: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        version: stringSchema.optional(),
        _version: elementSchema.optional(),
      })
      .optional(),
    implementation: backboneElementSchema
      .extend({
        description: stringSchema,
        _description: elementSchema.optional(),
        url: urlSchema.optional(),
        _url: elementSchema.optional(),
      })
      .optional(),
    lockedDate: booleanSchema.optional(),
    _lockedDate: elementSchema.optional(),
    codeSystem: backboneElementSchema
      .extend({
        uri: urlSchema.optional(),
        _uri: elementSchema.optional(),
        version: backboneElementSchema
          .extend({
            code: stringSchema.optional(),
            _code: elementSchema.optional(),
            isDefault: booleanSchema.optional(),
            _isDefault: elementSchema.optional(),
            compositional: booleanSchema.optional(),
            _compositional: elementSchema.optional(),
            language: stringSchema.array().optional(),
            _language: elementSchema.array().optional(),
            filter: backboneElementSchema
              .extend({
                code: stringSchema,
                _code: elementSchema.optional(),
                op: stringSchema.array(),
                _op: elementSchema.array().optional(),
              })
              .array()
              .optional(),
            property: stringSchema.array().optional(),
            _property: elementSchema.array().optional(),
          })
          .array()
          .optional(),
        subsumption: booleanSchema.optional(),
        _subsumption: elementSchema.optional(),
      })
      .array()
      .optional(),
    expansion: backboneElementSchema
      .extend({
        hierarchical: booleanSchema.optional(),
        _hierarchical: elementSchema.optional(),
        paging: booleanSchema.optional(),
        _paging: elementSchema.optional(),
        incomplete: booleanSchema.optional(),
        _incomplete: elementSchema.optional(),
        parameter: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        textFilter: stringSchema.optional(),
        _textFilter: elementSchema.optional(),
      })
      .optional(),
    codeSearch: codeSearchSupportSchema.optional(),
    _codeSearch: elementSchema.optional(),
    validateCode: backboneElementSchema
      .extend({
        translations: booleanSchema,
        _translations: elementSchema.optional(),
      })
      .optional(),
    translation: backboneElementSchema
      .extend({
        needsMap: booleanSchema,
        _needsMap: elementSchema.optional(),
      })
      .optional(),
    closure: backboneElementSchema
      .extend({
        translation: booleanSchema.optional(),
        _translation: elementSchema.optional(),
      })
      .optional(),
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
