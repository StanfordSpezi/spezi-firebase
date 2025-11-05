//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  OperationDefinitionOverload,
  OperationDefinitionParameterBinding,
  OperationDefinitionParameterReferencedFrom,
  type OperationDefinition,
  type OperationDefinitionParameter,
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
  intSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  bindingStrengthSchema,
  operationDefinitionKindSchema,
  operationDefinitionParameterUseSchema,
  publicationStatusSchema,
  searchParameterTypeSchema,
} from '../valueSets/index.js'

const operationDefinitionParameterBindingSchema: ZodType<OperationDefinitionParameterBinding> =
  backboneElementSchema.extend({
    strength: bindingStrengthSchema,
    _strength: elementSchema.optional(),
    valueSet: urlSchema,
    _valueSet: elementSchema.optional(),
  })

const operationDefinitionParameterReferencedFromSchema: ZodType<OperationDefinitionParameterReferencedFrom> =
  backboneElementSchema.extend({
    source: stringSchema,
    _source: elementSchema.optional(),
    sourceId: stringSchema.optional(),
    _sourceId: elementSchema.optional(),
  })

const operationDefinitionParameterSchema: ZodType<OperationDefinitionParameter> =
  backboneElementSchema.extend({
    binding: operationDefinitionParameterBindingSchema.optional(),
    documentation: markdownSchema.optional(),
    _documentation: elementSchema.optional(),
    max: stringSchema,
    _max: elementSchema.optional(),
    min: intSchema,
    name: stringSchema,
    _name: elementSchema.optional(),
    get part() {
      return operationDefinitionParameterSchema.array().optional()
    },
    referencedFrom: operationDefinitionParameterReferencedFromSchema
      .array()
      .optional(),
    searchType: searchParameterTypeSchema.optional(),
    _searchType: elementSchema.optional(),
    targetProfile: urlSchema.array().optional(),
    _targetProfile: elementSchema.array().optional(),
    type: stringSchema.optional(),
    _type: elementSchema.optional(),
    use: operationDefinitionParameterUseSchema,
    _use: elementSchema.optional(),
  })

const operationDefinitionOverloadSchema: ZodType<OperationDefinitionOverload> =
  backboneElementSchema.extend({
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    parameterName: stringSchema.array().optional(),
    _parameterName: elementSchema.array().optional(),
  })

export const untypedOperationDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OperationDefinition').readonly(),
    affectsState: booleanSchema.optional(),
    _affectsState: elementSchema.optional(),
    base: urlSchema.optional(),
    _base: elementSchema.optional(),
    code: stringSchema,
    _code: elementSchema.optional(),
    comment: markdownSchema.optional(),
    _comment: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    inputProfile: urlSchema.optional(),
    _inputProfile: elementSchema.optional(),
    instance: booleanSchema,
    _instance: elementSchema.optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    kind: operationDefinitionKindSchema,
    _kind: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    outputProfile: urlSchema.optional(),
    _outputProfile: elementSchema.optional(),
    overload: operationDefinitionOverloadSchema.array().optional(),
    parameter: operationDefinitionParameterSchema.array().optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    resource: stringSchema.array().optional(),
    _resource: elementSchema.array().optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    system: booleanSchema,
    _system: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    type: booleanSchema,
    _type: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  }),
) satisfies ZodType<OperationDefinition>

export const operationDefinitionSchema: ZodType<OperationDefinition> =
  untypedOperationDefinitionSchema

export class FhirOperationDefinition extends FhirDomainResource<OperationDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirOperationDefinition {
    return new FhirOperationDefinition(operationDefinitionSchema.parse(value))
  }
}
