//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type StructureMap } from 'fhir/r4b.js'
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
  idSchema,
  intSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
} from '../elements/index.js'

const structureMapStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export const untypedStructureMapSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('StructureMap').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    identifier: z.any().array().optional(), // Identifier
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: structureMapStatusSchema,
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
        url: canonicalSchema,
        _url: elementSchema.optional(),
        mode: z.enum(['source', 'queried', 'target', 'produced']),
        _mode: elementSchema.optional(),
        alias: stringSchema.optional(),
        _alias: elementSchema.optional(),
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
      })
      .array()
      .optional(),
    import: canonicalSchema.array().optional(),
    _import: elementSchema.array().optional(),
    group: backboneElementSchema
      .extend({
        name: idSchema,
        _name: elementSchema.optional(),
        extends: idSchema.optional(),
        _extends: elementSchema.optional(),
        typeMode: z.enum(['none', 'types', 'type-and-types']),
        _typeMode: elementSchema.optional(),
        documentation: stringSchema.optional(),
        _documentation: elementSchema.optional(),
        input: backboneElementSchema
          .extend({
            name: idSchema,
            _name: elementSchema.optional(),
            type: stringSchema.optional(),
            _type: elementSchema.optional(),
            mode: z.enum(['source', 'target']),
            _mode: elementSchema.optional(),
            documentation: stringSchema.optional(),
            _documentation: elementSchema.optional(),
          })
          .array(),
        rule: z
          .lazy(() =>
            backboneElementSchema.extend({
              name: idSchema,
              _name: elementSchema.optional(),
              source: backboneElementSchema
                .extend({
                  context: idSchema,
                  _context: elementSchema.optional(),
                  min: intSchema.optional(),
                  _min: elementSchema.optional(),
                  max: stringSchema.optional(),
                  _max: elementSchema.optional(),
                  type: stringSchema.optional(),
                  _type: elementSchema.optional(),
                  defaultValueBase64Binary: z.any().optional(),
                  defaultValueBoolean: booleanSchema.optional(),
                  _defaultValueBoolean: elementSchema.optional(),
                  element: stringSchema.optional(),
                  _element: elementSchema.optional(),
                  listMode: z.enum(['first', 'not_first', 'last', 'not_last', 'only_one']).optional(),
                  _listMode: elementSchema.optional(),
                  variable: idSchema.optional(),
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
                  context: idSchema.optional(),
                  _context: elementSchema.optional(),
                  contextType: z.enum(['type', 'variable']).optional(),
                  _contextType: elementSchema.optional(),
                  element: stringSchema.optional(),
                  _element: elementSchema.optional(),
                  variable: idSchema.optional(),
                  _variable: elementSchema.optional(),
                  listMode: z.enum(['first', 'share', 'last', 'single']).array().optional(),
                  _listMode: elementSchema.array().optional(),
                  listRuleId: idSchema.optional(),
                  _listRuleId: elementSchema.optional(),
                  transform: z.enum(['create', 'copy', 'truncate', 'escape', 'cast', 'append', 'translate', 'reference', 'dateOp', 'uuid', 'pointer', 'evaluate', 'cc', 'c', 'qty', 'id', 'cp']).optional(),
                  _transform: elementSchema.optional(),
                  parameter: backboneElementSchema
                    .extend({
                      valueId: idSchema.optional(),
                      _valueId: elementSchema.optional(),
                      valueString: stringSchema.optional(),
                      _valueString: stringSchema.optional(),
                      valueBoolean: booleanSchema.optional(),
                      _valueBoolean: elementSchema.optional(),
                      valueInteger: intSchema.optional(),
                      valueDecimal: z.number().optional(),
                    })
                    .array()
                    .optional(),
                })
                .array()
                .optional(),
              rule: z.array(z.any()).optional(), // Recursive reference
              dependent: backboneElementSchema
                .extend({
                  name: idSchema,
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
          .array(),
      })
      .array(),
  }),
) satisfies ZodType<StructureMap>

export const structureMapSchema: ZodType<StructureMap> =
  untypedStructureMapSchema

export class FhirStructureMap extends FhirDomainResource<StructureMap> {
  public static parse(value: unknown): FhirStructureMap {
    return new FhirStructureMap(structureMapSchema.parse(value))
  }
}
