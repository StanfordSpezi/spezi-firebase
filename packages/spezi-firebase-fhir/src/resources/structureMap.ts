//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type StructureMap, type StructureMapGroupRule } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  base64BinarySchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  markdownSchema,
  positiveIntSchema,
  stringSchema,
  timeSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  publicationStatusSchema,
  structureMapGroupInputModeSchema,
  structureMapGroupTypeModeSchema,
  structureMapModelModeSchema,
  structureMapSourceListModeSchema,
  structureMapTargetContextTypeSchema,
  structureMapTargetListModeSchema,
  structureMapTransformSchema,
} from '../valueSets/index.js'

const structureMapGroupRuleSchema: ZodType<StructureMapGroupRule> = z.lazy(() =>
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    source: backboneElementSchema
      .extend({
        context: stringSchema,
        _context: elementSchema.optional(),
        min: intSchema.optional(),
        max: stringSchema.optional(),
        _max: elementSchema.optional(),
        type: stringSchema.optional(),
        _type: elementSchema.optional(),
        defaultValueBase64Binary: base64BinarySchema.optional(),
        _defaultValueBase64Binary: elementSchema.optional(),
        defaultValueBoolean: booleanSchema.optional(),
        _defaultValueBoolean: elementSchema.optional(),
        defaultValueCanonical: urlSchema.optional(),
        _defaultValueCanonical: elementSchema.optional(),
        defaultValueCode: stringSchema.optional(),
        _defaultValueCode: elementSchema.optional(),
        defaultValueDate: dateSchema.optional(),
        _defaultValueDate: elementSchema.optional(),
        defaultValueDateTime: dateTimeSchema.optional(),
        _defaultValueDateTime: elementSchema.optional(),
        defaultValueDecimal: decimalSchema.optional(),
        defaultValueId: stringSchema.optional(),
        _defaultValueId: elementSchema.optional(),
        defaultValueInstant: instantSchema.optional(),
        _defaultValueInstant: elementSchema.optional(),
        defaultValueInteger: intSchema.optional(),
        defaultValueMarkdown: markdownSchema.optional(),
        _defaultValueMarkdown: elementSchema.optional(),
        defaultValueOid: stringSchema.optional(),
        _defaultValueOid: elementSchema.optional(),
        defaultValuePositiveInt: positiveIntSchema.optional(),
        defaultValueString: stringSchema.optional(),
        _defaultValueString: elementSchema.optional(),
        defaultValueTime: timeSchema.optional(),
        _defaultValueTime: elementSchema.optional(),
        defaultValueUnsignedInt: intSchema.optional(),
        defaultValueUri: urlSchema.optional(),
        _defaultValueUri: elementSchema.optional(),
        defaultValueUrl: urlSchema.optional(),
        _defaultValueUrl: elementSchema.optional(),
        defaultValueUuid: stringSchema.optional(),
        _defaultValueUuid: elementSchema.optional(),
        element: stringSchema.optional(),
        _element: elementSchema.optional(),
        listMode: structureMapSourceListModeSchema.optional(),
        _listMode: elementSchema.optional(),
        variable: stringSchema.optional(),
        _variable: elementSchema.optional(),
        condition: stringSchema.optional(),
        _condition: elementSchema.optional(),
        check: stringSchema.optional(),
        _check: elementSchema.optional(),
        logMessage: stringSchema.optional(),
        _logMessage: elementSchema.optional(),
      })
      .array(),
    target: backboneElementSchema
      .extend({
        context: stringSchema.optional(),
        _context: elementSchema.optional(),
        contextType: structureMapTargetContextTypeSchema.optional(),
        _contextType: elementSchema.optional(),
        element: stringSchema.optional(),
        _element: elementSchema.optional(),
        variable: stringSchema.optional(),
        _variable: elementSchema.optional(),
        listMode: structureMapTargetListModeSchema.array().optional(),
        _listMode: elementSchema.array().optional(),
        listRuleId: stringSchema.optional(),
        _listRuleId: elementSchema.optional(),
        transform: structureMapTransformSchema.optional(),
        _transform: elementSchema.optional(),
        parameter: backboneElementSchema
          .extend({
            valueId: stringSchema.optional(),
            _valueId: elementSchema.optional(),
            valueString: stringSchema.optional(),
            _valueString: elementSchema.optional(),
            valueBoolean: booleanSchema.optional(),
            _valueBoolean: elementSchema.optional(),
            valueInteger: intSchema.optional(),
            valueDecimal: decimalSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    get rule() {
      return structureMapGroupRuleSchema.array().optional()
    },
    dependent: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        variable: stringSchema.array(),
        _variable: elementSchema.array().optional(),
      })
      .array()
      .optional(),
    documentation: stringSchema.optional(),
    _documentation: elementSchema.optional(),
  }),
)

export const untypedStructureMapSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('StructureMap').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
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
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    structure: backboneElementSchema
      .extend({
        url: urlSchema,
        _url: elementSchema.optional(),
        mode: structureMapModelModeSchema,
        _mode: elementSchema.optional(),
        alias: stringSchema.optional(),
        _alias: elementSchema.optional(),
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
      })
      .array()
      .optional(),
    import: urlSchema.array().optional(),
    _import: elementSchema.array().optional(),
    group: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        extends: stringSchema.optional(),
        _extends: elementSchema.optional(),
        typeMode: structureMapGroupTypeModeSchema,
        _typeMode: elementSchema.optional(),
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
        input: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            type: stringSchema.optional(),
            _type: elementSchema.optional(),
            mode: structureMapGroupInputModeSchema,
            _mode: elementSchema.optional(),
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array(),
        rule: structureMapGroupRuleSchema.array(),
      })
      .array(),
  }),
) satisfies ZodType<StructureMap>

export const structureMapSchema: ZodType<StructureMap> =
  untypedStructureMapSchema

export class FhirStructureMap extends FhirDomainResource<StructureMap> {
  // Static Functions

  public static parse(value: unknown): FhirStructureMap {
    return new FhirStructureMap(structureMapSchema.parse(value))
  }
}
