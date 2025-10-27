//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CapabilityStatement } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
  codeSchema,
  unsignedIntSchema,
} from '../elements/index.js'

const capabilityStatementStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const capabilityStatementKindSchema = z.enum([
  'instance',
  'capability',
  'requirements',
])

const fhirVersionSchema = z.enum([
  '0.01',
  '0.05',
  '0.06',
  '0.11',
  '0.0.80',
  '0.0.81',
  '0.0.82',
  '0.4.0',
  '0.5.0',
  '1.0.0',
  '1.0.1',
  '1.0.2',
  '1.1.0',
  '1.4.0',
  '1.6.0',
  '1.8.0',
  '3.0.0',
  '3.0.1',
  '3.3.0',
  '3.5.0',
  '4.0.0',
  '4.0.1',
  '4.3.0',
])

const restfulCapabilityModeSchema = z.enum(['client', 'server'])

const typeRestfulInteractionSchema = z.enum([
  'read',
  'vread',
  'update',
  'patch',
  'delete',
  'history-instance',
  'history-type',
  'create',
  'search-type',
])

const systemRestfulInteractionSchema = z.enum([
  'transaction',
  'batch',
  'search-system',
  'history-system',
])

const conditionalReadStatusSchema = z.enum([
  'not-supported',
  'modified-since',
  'not-match',
  'full-support',
])

const conditionalDeleteStatusSchema = z.enum([
  'not-supported',
  'single',
  'multiple',
])

const referenceHandlingPolicySchema = z.enum([
  'literal',
  'logical',
  'resolves',
  'enforced',
  'local',
])

const searchParamTypeSchema = z.enum([
  'number',
  'date',
  'string',
  'token',
  'reference',
  'composite',
  'quantity',
  'uri',
  'special',
])

const eventCapabilityModeSchema = z.enum(['sender', 'receiver'])

const documentModeSchema = z.enum(['producer', 'consumer'])

export const untypedCapabilityStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CapabilityStatement').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: capabilityStatementStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema,
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    kind: capabilityStatementKindSchema,
    _kind: elementSchema.optional(),
    instantiates: canonicalSchema.array().optional(),
    _instantiates: elementSchema.array().optional(),
    imports: canonicalSchema.array().optional(),
    _imports: elementSchema.array().optional(),
    software: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        version: stringSchema.optional(),
        _version: elementSchema.optional(),
        releaseDate: dateTimeSchema.optional(),
        _releaseDate: elementSchema.optional(),
      })
      .optional(),
    implementation: backboneElementSchema
      .extend({
        description: stringSchema,
        _description: elementSchema.optional(),
        url: urlSchema.optional(),
        _url: elementSchema.optional(),
        custodian: z.any().optional(), // Reference to Organization
      })
      .optional(),
    fhirVersion: fhirVersionSchema,
    _fhirVersion: elementSchema.optional(),
    format: codeSchema.array(),
    _format: elementSchema.array().optional(),
    patchFormat: codeSchema.array().optional(),
    _patchFormat: elementSchema.array().optional(),
    implementationGuide: canonicalSchema.array().optional(),
    _implementationGuide: elementSchema.array().optional(),
    rest: backboneElementSchema
      .extend({
        mode: restfulCapabilityModeSchema,
        _mode: elementSchema.optional(),
        documentation: markdownSchema.optional(),
        _documentation: elementSchema.optional(),
        security: backboneElementSchema
          .extend({
            cors: booleanSchema.optional(),
            _cors: elementSchema.optional(),
            service: codeableConceptSchema.array().optional(),
            description: markdownSchema.optional(),
            _description: elementSchema.optional(),
          })
          .optional(),
        resource: backboneElementSchema
          .extend({
            type: codeSchema,
            _type: elementSchema.optional(),
            profile: canonicalSchema.optional(),
            _profile: elementSchema.optional(),
            supportedProfile: canonicalSchema.array().optional(),
            _supportedProfile: elementSchema.array().optional(),
            documentation: markdownSchema.optional(),
            _documentation: elementSchema.optional(),
            interaction: backboneElementSchema
              .extend({
                code: typeRestfulInteractionSchema,
                _code: elementSchema.optional(),
                documentation: markdownSchema.optional(),
                _documentation: elementSchema.optional(),
              })
              .array()
              .optional(),
            versioning: z
              .enum(['no-version', 'versioned', 'versioned-update'])
              .optional(),
            _versioning: elementSchema.optional(),
            readHistory: booleanSchema.optional(),
            _readHistory: elementSchema.optional(),
            updateCreate: booleanSchema.optional(),
            _updateCreate: elementSchema.optional(),
            conditionalCreate: booleanSchema.optional(),
            _conditionalCreate: elementSchema.optional(),
            conditionalRead: conditionalReadStatusSchema.optional(),
            _conditionalRead: elementSchema.optional(),
            conditionalUpdate: booleanSchema.optional(),
            _conditionalUpdate: elementSchema.optional(),
            conditionalDelete: conditionalDeleteStatusSchema.optional(),
            _conditionalDelete: elementSchema.optional(),
            referencePolicy: referenceHandlingPolicySchema.array().optional(),
            _referencePolicy: elementSchema.array().optional(),
            searchInclude: stringSchema.array().optional(),
            _searchInclude: elementSchema.array().optional(),
            searchRevInclude: stringSchema.array().optional(),
            _searchRevInclude: elementSchema.array().optional(),
            searchParam: backboneElementSchema
              .extend({
                name: stringSchema,
                _name: elementSchema.optional(),
                definition: canonicalSchema.optional(),
                _definition: elementSchema.optional(),
                type: searchParamTypeSchema,
                _type: elementSchema.optional(),
                documentation: markdownSchema.optional(),
                _documentation: elementSchema.optional(),
              })
              .array()
              .optional(),
            operation: backboneElementSchema
              .extend({
                name: stringSchema,
                _name: elementSchema.optional(),
                definition: canonicalSchema,
                _definition: elementSchema.optional(),
                documentation: markdownSchema.optional(),
                _documentation: elementSchema.optional(),
              })
              .array()
              .optional(),
          })
          .array()
          .optional(),
        interaction: backboneElementSchema
          .extend({
            code: systemRestfulInteractionSchema,
            _code: elementSchema.optional(),
            documentation: markdownSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        searchParam: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            definition: canonicalSchema.optional(),
            _definition: elementSchema.optional(),
            type: searchParamTypeSchema,
            _type: elementSchema.optional(),
            documentation: markdownSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        operation: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            definition: canonicalSchema,
            _definition: elementSchema.optional(),
            documentation: markdownSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        compartment: canonicalSchema.array().optional(),
        _compartment: elementSchema.array().optional(),
      })
      .array()
      .optional(),
    messaging: backboneElementSchema
      .extend({
        endpoint: backboneElementSchema
          .extend({
            protocol: codingSchema,
            address: urlSchema,
            _address: elementSchema.optional(),
          })
          .array()
          .optional(),
        reliableCache: unsignedIntSchema.optional(),
        documentation: markdownSchema.optional(),
        _documentation: elementSchema.optional(),
        supportedMessage: backboneElementSchema
          .extend({
            mode: eventCapabilityModeSchema,
            _mode: elementSchema.optional(),
            definition: canonicalSchema,
            _definition: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    document: backboneElementSchema
      .extend({
        mode: documentModeSchema,
        _mode: elementSchema.optional(),
        documentation: markdownSchema.optional(),
        _documentation: elementSchema.optional(),
        profile: canonicalSchema,
        _profile: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<CapabilityStatement>

export const capabilityStatementSchema: ZodType<CapabilityStatement> =
  untypedCapabilityStatementSchema

export class FhirCapabilityStatement extends FhirDomainResource<CapabilityStatement> {
  // Static Functions

  public static parse(value: unknown): FhirCapabilityStatement {
    return new FhirCapabilityStatement(capabilityStatementSchema.parse(value))
  }
}
