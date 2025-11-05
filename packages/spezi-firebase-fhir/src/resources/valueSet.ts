//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  ValueSetComposeIncludeConceptDesignation,
  type ValueSet,
  type ValueSetExpansionContains,
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
  identifierSchema,
  intSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  filterOperatorSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const valueSetComposeIncludeConceptDesignationSchema: ZodType<ValueSetComposeIncludeConceptDesignation> =
  backboneElementSchema.extend({
    language: stringSchema.optional(),
    _language: elementSchema.optional(),
    use: codingSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  })

const valueSetExpansionContainsSchema: ZodType<ValueSetExpansionContains> =
  backboneElementSchema.extend({
    system: urlSchema.optional(),
    _system: elementSchema.optional(),
    abstract: booleanSchema.optional(),
    _abstract: elementSchema.optional(),
    inactive: booleanSchema.optional(),
    _inactive: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    code: stringSchema.optional(),
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    designation: valueSetComposeIncludeConceptDesignationSchema
      .array()
      .optional(),
    get contains() {
      return valueSetExpansionContainsSchema.array().optional()
    },
  })

export const untypedValueSetSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ValueSet').readonly(),
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
    immutable: booleanSchema.optional(),
    _immutable: elementSchema.optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    compose: backboneElementSchema
      .extend({
        lockedDate: dateTimeSchema.optional(),
        _lockedDate: elementSchema.optional(),
        inactive: booleanSchema.optional(),
        _inactive: elementSchema.optional(),
        include: backboneElementSchema
          .extend({
            system: urlSchema.optional(),
            _system: elementSchema.optional(),
            version: stringSchema.optional(),
            _version: elementSchema.optional(),
            concept: backboneElementSchema
              .extend({
                code: stringSchema,
                _code: elementSchema.optional(),
                display: stringSchema.optional(),
                _display: elementSchema.optional(),
                designation: backboneElementSchema
                  .extend({
                    language: stringSchema.optional(),
                    _language: elementSchema.optional(),
                    use: codingSchema.optional(),
                    value: stringSchema,
                    _value: elementSchema.optional(),
                  })
                  .array()
                  .optional(),
              })
              .array()
              .optional(),
            filter: backboneElementSchema
              .extend({
                property: stringSchema,
                _property: elementSchema.optional(),
                op: filterOperatorSchema,
                _op: elementSchema.optional(),
                value: stringSchema,
                _value: elementSchema.optional(),
              })
              .array()
              .optional(),
            valueSet: urlSchema.array().optional(),
            _valueSet: elementSchema.array().optional(),
          })
          .array(),
        exclude: backboneElementSchema
          .extend({
            system: urlSchema.optional(),
            _system: elementSchema.optional(),
            version: stringSchema.optional(),
            _version: elementSchema.optional(),
            concept: backboneElementSchema
              .extend({
                code: stringSchema,
                _code: elementSchema.optional(),
                display: stringSchema.optional(),
                _display: elementSchema.optional(),
                designation: backboneElementSchema
                  .extend({
                    language: stringSchema.optional(),
                    _language: elementSchema.optional(),
                    use: codingSchema.optional(),
                    value: stringSchema,
                    _value: elementSchema.optional(),
                  })
                  .array()
                  .optional(),
              })
              .array()
              .optional(),
            filter: backboneElementSchema
              .extend({
                property: stringSchema,
                _property: elementSchema.optional(),
                op: filterOperatorSchema,
                _op: elementSchema.optional(),
                value: stringSchema,
                _value: elementSchema.optional(),
              })
              .array()
              .optional(),
            valueSet: urlSchema.array().optional(),
            _valueSet: elementSchema.array().optional(),
          })
          .array()
          .optional(),
      })
      .optional(),
    expansion: backboneElementSchema
      .extend({
        identifier: urlSchema.optional(),
        _identifier: elementSchema.optional(),
        timestamp: dateTimeSchema,
        _timestamp: elementSchema.optional(),
        total: intSchema.optional(),
        offset: intSchema.optional(),
        parameter: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            valueString: stringSchema.optional(),
            _valueString: elementSchema.optional(),
            valueBoolean: booleanSchema.optional(),
            _valueBoolean: elementSchema.optional(),
            valueInteger: intSchema.optional(),
            valueDecimal: z.number().optional(),
            valueUri: urlSchema.optional(),
            _valueUri: elementSchema.optional(),
            valueCode: stringSchema.optional(),
            _valueCode: elementSchema.optional(),
            valueDateTime: dateTimeSchema.optional(),
            _valueDateTime: elementSchema.optional(),
          })
          .array()
          .optional(),
        contains: valueSetExpansionContainsSchema.array().optional(),
      })
      .optional(),
  }),
) satisfies ZodType<ValueSet>

export const valueSetSchema: ZodType<ValueSet> = untypedValueSetSchema

export class FhirValueSet extends FhirDomainResource<ValueSet> {
  // Static Functions

  public static parse(value: unknown): FhirValueSet {
    return new FhirValueSet(valueSetSchema.parse(value))
  }
}
