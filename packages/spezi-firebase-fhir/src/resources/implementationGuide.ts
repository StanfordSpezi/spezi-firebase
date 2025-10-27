//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ImplementationGuide } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codeSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  idSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
  uriSchema,
} from '../elements/index.js'

const implementationGuideStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export const untypedImplementationGuideSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImplementationGuide').readonly(),
    url: uriSchema,
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: implementationGuideStatusSchema,
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
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    packageId: idSchema,
    _packageId: elementSchema.optional(),
    license: z.string().optional(), // SPDXLicense
    _license: elementSchema.optional(),
    fhirVersion: z.string().array(), // FHIRVersion array
    _fhirVersion: elementSchema.array().optional(),
    dependsOn: backboneElementSchema
      .extend({
        uri: canonicalSchema,
        _uri: elementSchema.optional(),
        packageId: idSchema.optional(),
        _packageId: elementSchema.optional(),
        version: stringSchema.optional(),
        _version: elementSchema.optional(),
      })
      .array()
      .optional(),
    global: backboneElementSchema
      .extend({
        type: codeSchema,
        _type: elementSchema.optional(),
        profile: canonicalSchema,
        _profile: elementSchema.optional(),
      })
      .array()
      .optional(),
    definition: backboneElementSchema
      .extend({
        grouping: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
          })
          .array()
          .optional(),
        resource: backboneElementSchema
          .extend({
            reference: z.any(), // Reference
            fhirVersion: z.string().array().optional(), // FHIRVersion array
            _fhirVersion: elementSchema.array().optional(),
            name: stringSchema.optional(),
            _name: elementSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            exampleBoolean: booleanSchema.optional(),
            _exampleBoolean: elementSchema.optional(),
            exampleCanonical: canonicalSchema.optional(),
            _exampleCanonical: elementSchema.optional(),
            groupingId: idSchema.optional(),
            _groupingId: elementSchema.optional(),
          })
          .array()
          .optional(),
        page: backboneElementSchema
          .extend({
            nameUrl: urlSchema.optional(),
            _nameUrl: elementSchema.optional(),
            nameReference: z.any().optional(), // Reference
            title: stringSchema,
            _title: elementSchema.optional(),
            generation: z.enum(['html', 'markdown', 'xml', 'generated']),
            _generation: elementSchema.optional(),
            page: z.array(z.any()).optional(), // Recursive reference
          })
          .optional(),
        parameter: backboneElementSchema
          .extend({
            code: z.string(), // Code from GuideParameterCode
            _code: elementSchema.optional(),
            value: stringSchema,
            _value: elementSchema.optional(),
          })
          .array()
          .optional(),
        template: backboneElementSchema
          .extend({
            code: codeSchema,
            _code: elementSchema.optional(),
            source: stringSchema,
            _source: elementSchema.optional(),
            scope: stringSchema.optional(),
            _scope: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .optional(),
    manifest: backboneElementSchema
      .extend({
        rendering: urlSchema.optional(),
        _rendering: elementSchema.optional(),
        resource: backboneElementSchema
          .extend({
            reference: z.any(), // Reference
            exampleBoolean: booleanSchema.optional(),
            _exampleBoolean: elementSchema.optional(),
            exampleCanonical: canonicalSchema.optional(),
            _exampleCanonical: elementSchema.optional(),
            relativePath: urlSchema.optional(),
            _relativePath: elementSchema.optional(),
          })
          .array(),
        page: backboneElementSchema
          .extend({
            name: stringSchema,
            _name: elementSchema.optional(),
            title: stringSchema.optional(),
            _title: elementSchema.optional(),
            anchor: stringSchema.array().optional(),
            _anchor: elementSchema.array().optional(),
          })
          .array()
          .optional(),
        image: stringSchema.array().optional(),
        _image: elementSchema.array().optional(),
        other: stringSchema.array().optional(),
        _other: elementSchema.array().optional(),
      })
      .optional(),
  }),
) satisfies ZodType<ImplementationGuide>

export const implementationGuideSchema: ZodType<ImplementationGuide> =
  untypedImplementationGuideSchema

export class FhirImplementationGuide extends FhirDomainResource<ImplementationGuide> {
  public static parse(value: unknown): FhirImplementationGuide {
    return new FhirImplementationGuide(implementationGuideSchema.parse(value))
  }
}
