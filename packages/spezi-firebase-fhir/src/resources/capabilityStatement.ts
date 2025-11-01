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
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  capabilityStatementKindSchema,
  conditionalDeleteStatusSchema,
  conditionalReadStatusSchema,
  documentModeSchema,
  eventCapabilityModeSchema,
  publicationStatusSchema,
  referencePolicySchema,
  resourceVersionPolicySchema,
  restfulCapabilityModeSchema,
  systemRestfulInteractionSchema,
  typeRestfulInteractionSchema,
} from '../valueSets/index.js'

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
    instantiates: urlSchema.array().optional(),
    _instantiates: elementSchema.array().optional(),
    imports: urlSchema.array().optional(),
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
        custodian: referenceSchema.optional(),
      })
      .optional(),
    fhirVersion: stringSchema,
    _fhirVersion: elementSchema.optional(),
    format: stringSchema.array(),
    _format: elementSchema.array().optional(),
    patchFormat: stringSchema.array().optional(),
    _patchFormat: elementSchema.array().optional(),
    implementationGuide: urlSchema.array().optional(),
    _implementationGuide: elementSchema.array().optional(),
    rest: backboneElementSchema
      .extend({
        mode: restfulCapabilityModeSchema,
        _mode: elementSchema.optional(),
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
        security: backboneElementSchema
          .extend({
            cors: booleanSchema.optional(),
            _cors: elementSchema.optional(),
            service: codeableConceptSchema.array().optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
          })
          .optional(),
        resource: backboneElementSchema
          .extend({
            type: z.enum([
              'string',
              'number',
              'date',
              'uri',
              'token',
              'reference',
              'composite',
              'quantity',
              'special',
            ]),
            _type: elementSchema.optional(),
            profile: urlSchema.optional(),
            _profile: elementSchema.optional(),
            supportedProfile: urlSchema.array().optional(),
            _supportedProfile: elementSchema.array().optional(),
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
            interaction: backboneElementSchema
              .extend({
                code: typeRestfulInteractionSchema,
                _code: elementSchema.optional(),
                documentation: stringSchema.optional(),
                _documentation: elementSchema.optional(),
              })
              .array()
              .optional(),
            versioning: resourceVersionPolicySchema.optional(),
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
            referencePolicy: referencePolicySchema.array().optional(),
            _referencePolicy: elementSchema.array().optional(),
            searchInclude: stringSchema.array().optional(),
            _searchInclude: elementSchema.array().optional(),
            searchRevInclude: stringSchema.array().optional(),
            _searchRevInclude: elementSchema.array().optional(),
            searchParam: backboneElementSchema
              .extend({
                name: stringSchema,
                _name: elementSchema.optional(),
                definition: urlSchema.optional(),
                _definition: elementSchema.optional(),
                type: z.enum([
                  'string',
                  'number',
                  'date',
                  'uri',
                  'token',
                  'reference',
                  'composite',
                  'quantity',
                  'special',
                ]),
                _type: elementSchema.optional(),
                documentation: stringSchema.optional(),
                _documentation: elementSchema.optional(),
              })
              .array()
              .optional(),
            operation: backboneElementSchema
              .extend({
                name: stringSchema,
                _name: elementSchema.optional(),
                definition: urlSchema,
                _definition: elementSchema.optional(),
                documentation: stringSchema.optional(),
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
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        searchParam: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            definition: urlSchema.optional(),
            _definition: elementSchema.optional(),
            type: z.enum([
              'string',
              'number',
              'date',
              'uri',
              'token',
              'reference',
              'composite',
              'quantity',
              'special',
            ]),
            _type: elementSchema.optional(),
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        operation: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            definition: urlSchema,
            _definition: elementSchema.optional(),
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array()
          .optional(),
        compartment: urlSchema.array().optional(),
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
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
        supportedMessage: backboneElementSchema
          .extend({
            mode: eventCapabilityModeSchema,
            _mode: elementSchema.optional(),
            definition: urlSchema,
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
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
        profile: urlSchema,
        _profile: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
)

export const capabilityStatementSchema: ZodType<CapabilityStatement> =
  untypedCapabilityStatementSchema

export class FhirCapabilityStatement extends FhirDomainResource<CapabilityStatement> {
  public static parse(value: unknown): FhirCapabilityStatement {
    return new FhirCapabilityStatement(capabilityStatementSchema.parse(value))
  }
}
