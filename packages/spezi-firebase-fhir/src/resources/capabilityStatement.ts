//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CapabilityStatementDocument,
  type CapabilityStatementImplementation,
  type CapabilityStatementMessaging,
  type CapabilityStatementMessagingEndpoint,
  type CapabilityStatementMessagingSupportedMessage,
  type CapabilityStatementRest,
  type CapabilityStatementRestInteraction,
  type CapabilityStatementRestResource,
  type CapabilityStatementRestResourceInteraction,
  type CapabilityStatementRestResourceOperation,
  type CapabilityStatementRestResourceSearchParam,
  type CapabilityStatementRestSecurity,
  type CapabilityStatementSoftware,
  type CapabilityStatement,
} from 'fhir/r4b.js'
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
  searchParameterTypeSchema,
} from '../valueSets/index.js'

const capabilityStatementSoftwareSchema: ZodType<CapabilityStatementSoftware> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    releaseDate: dateTimeSchema.optional(),
    _releaseDate: elementSchema.optional(),
  })

const capabilityStatementImplementationSchema: ZodType<CapabilityStatementImplementation> =
  backboneElementSchema.extend({
    description: stringSchema,
    _description: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    custodian: referenceSchema.optional(),
  })

const capabilityStatementRestSecuritySchema: ZodType<CapabilityStatementRestSecurity> =
  backboneElementSchema.extend({
    cors: booleanSchema.optional(),
    _cors: elementSchema.optional(),
    service: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
  })

const capabilityStatementRestResourceInteractionSchema: ZodType<CapabilityStatementRestResourceInteraction> =
  backboneElementSchema.extend({
    code: typeRestfulInteractionSchema,
    _code: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
  })

const capabilityStatementRestResourceSearchParamSchema: ZodType<CapabilityStatementRestResourceSearchParam> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    definition: urlSchema.optional(),
    _definition: elementSchema.optional(),
    type: searchParameterTypeSchema,
    _type: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
  })

const capabilityStatementRestResourceOperationSchema: ZodType<CapabilityStatementRestResourceOperation> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    definition: urlSchema,
    _definition: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
  })

const capabilityStatementRestResourceSchema: ZodType<CapabilityStatementRestResource> =
  backboneElementSchema.extend({
    type: searchParameterTypeSchema,
    _type: elementSchema.optional(),
    profile: urlSchema.optional(),
    _profile: elementSchema.optional(),
    supportedProfile: urlSchema.array().optional(),
    _supportedProfile: elementSchema.array().optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
    interaction: capabilityStatementRestResourceInteractionSchema
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
    searchParam: capabilityStatementRestResourceSearchParamSchema
      .array()
      .optional(),
    operation: capabilityStatementRestResourceOperationSchema
      .array()
      .optional(),
  })

const capabilityStatementRestInteractionSchema: ZodType<CapabilityStatementRestInteraction> =
  backboneElementSchema.extend({
    code: systemRestfulInteractionSchema,
    _code: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
  })

const capabilityStatementRestSchema: ZodType<CapabilityStatementRest> =
  backboneElementSchema.extend({
    mode: restfulCapabilityModeSchema,
    _mode: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
    security: capabilityStatementRestSecuritySchema.optional(),
    resource: capabilityStatementRestResourceSchema.array().optional(),
    interaction: capabilityStatementRestInteractionSchema.array().optional(),
    searchParam: capabilityStatementRestResourceSearchParamSchema
      .array()
      .optional(),
    operation: capabilityStatementRestResourceOperationSchema
      .array()
      .optional(),
    compartment: urlSchema.array().optional(),
    _compartment: elementSchema.array().optional(),
  })

const capabilityStatementMessagingEndpointSchema: ZodType<CapabilityStatementMessagingEndpoint> =
  backboneElementSchema.extend({
    protocol: codingSchema,
    address: urlSchema,
    _address: elementSchema.optional(),
  })

const capabilityStatementMessagingSupportedMessageSchema: ZodType<CapabilityStatementMessagingSupportedMessage> =
  backboneElementSchema.extend({
    mode: eventCapabilityModeSchema,
    _mode: elementSchema.optional(),
    definition: urlSchema,
    _definition: elementSchema.optional(),
  })

const capabilityStatementMessagingSchema: ZodType<CapabilityStatementMessaging> =
  backboneElementSchema.extend({
    endpoint: capabilityStatementMessagingEndpointSchema.array().optional(),
    reliableCache: unsignedIntSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
    supportedMessage: capabilityStatementMessagingSupportedMessageSchema
      .array()
      .optional(),
  })

const capabilityStatementDocumentSchema: ZodType<CapabilityStatementDocument> =
  backboneElementSchema.extend({
    mode: documentModeSchema,
    _mode: elementSchema.optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
    profile: urlSchema,
    _profile: elementSchema.optional(),
  })

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
    software: capabilityStatementSoftwareSchema.optional(),
    implementation: capabilityStatementImplementationSchema.optional(),
    fhirVersion: stringSchema,
    _fhirVersion: elementSchema.optional(),
    format: stringSchema.array(),
    _format: elementSchema.array().optional(),
    patchFormat: stringSchema.array().optional(),
    _patchFormat: elementSchema.array().optional(),
    implementationGuide: urlSchema.array().optional(),
    _implementationGuide: elementSchema.array().optional(),
    rest: capabilityStatementRestSchema.array().optional(),
    messaging: capabilityStatementMessagingSchema.array().optional(),
    document: capabilityStatementDocumentSchema.array().optional(),
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
