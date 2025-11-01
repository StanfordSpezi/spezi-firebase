//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ImplementationGuide,
  type ImplementationGuideDependsOn,
  type ImplementationGuideDefinition,
  type ImplementationGuideDefinitionGrouping,
  type ImplementationGuideDefinitionPage,
  type ImplementationGuideDefinitionParameter,
  type ImplementationGuideDefinitionResource,
  type ImplementationGuideDefinitionTemplate,
  type ImplementationGuideGlobal,
  type ImplementationGuideManifest,
  type ImplementationGuideManifestPage,
  type ImplementationGuideManifestResource,
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
  referenceSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  guidePageGenerationSchema,
  guideParameterCodeSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const implementationGuideDependsOnSchema: ZodType<ImplementationGuideDependsOn> =
  z.lazy(() =>
    backboneElementSchema.extend({
      uri: urlSchema,
      _uri: elementSchema.optional(),
      packageId: stringSchema.optional(),
      _packageId: elementSchema.optional(),
      version: stringSchema.optional(),
      _version: elementSchema.optional(),
    }),
  )

const implementationGuideGlobalSchema: ZodType<ImplementationGuideGlobal> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: stringSchema,
      _type: elementSchema.optional(),
      profile: urlSchema,
      _profile: elementSchema.optional(),
    }),
  )

const implementationGuideDefinitionResourceSchema: ZodType<ImplementationGuideDefinitionResource> =
  z.lazy(() =>
    backboneElementSchema.extend({
      reference: referenceSchema,
      fhirVersion: z.array(stringSchema).optional(),
      _fhirVersion: elementSchema.array().optional(),
      name: stringSchema.optional(),
      _name: elementSchema.optional(),
      description: stringSchema.optional(),
      _description: elementSchema.optional(),
      exampleBoolean: booleanSchema.optional(),
      _exampleBoolean: elementSchema.optional(),
      exampleCanonical: urlSchema.optional(),
      _exampleCanonical: elementSchema.optional(),
      groupingId: stringSchema.optional(),
      _groupingId: elementSchema.optional(),
    }),
  )

const implementationGuideDefinitionPageSchema: ZodType<ImplementationGuideDefinitionPage> =
  z.lazy(() =>
    backboneElementSchema.extend({
      nameUrl: urlSchema.optional(),
      _nameUrl: elementSchema.optional(),
      nameReference: referenceSchema.optional(),
      title: stringSchema,
      _title: elementSchema.optional(),
      generation: guidePageGenerationSchema,
      _generation: elementSchema.optional(),
      page: z
        .lazy(() => implementationGuideDefinitionPageSchema.array())
        .optional(),
    }),
  )

const implementationGuideDefinitionParameterSchema: ZodType<ImplementationGuideDefinitionParameter> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: guideParameterCodeSchema,
      _code: elementSchema.optional(),
      value: stringSchema,
      _value: elementSchema.optional(),
    }),
  )

const implementationGuideDefinitionTemplateSchema: ZodType<ImplementationGuideDefinitionTemplate> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: stringSchema,
      _code: elementSchema.optional(),
      source: stringSchema,
      _source: elementSchema.optional(),
      scope: stringSchema.optional(),
      _scope: elementSchema.optional(),
    }),
  )

const implementationGuideDefinitionGroupingSchema: ZodType<ImplementationGuideDefinitionGrouping> =
  z.lazy(() =>
    backboneElementSchema.extend({
      name: stringSchema,
      _name: elementSchema.optional(),
      description: stringSchema.optional(),
      _description: elementSchema.optional(),
    }),
  )

const implementationGuideDefinitionSchema: ZodType<ImplementationGuideDefinition> =
  z.lazy(() =>
    backboneElementSchema.extend({
      grouping: implementationGuideDefinitionGroupingSchema.array().optional(),
      resource: implementationGuideDefinitionResourceSchema.array(),
      page: implementationGuideDefinitionPageSchema.optional(),
      parameter: implementationGuideDefinitionParameterSchema
        .array()
        .optional(),
      template: implementationGuideDefinitionTemplateSchema.array().optional(),
    }),
  )

const implementationGuideManifestResourceSchema: ZodType<ImplementationGuideManifestResource> =
  z.lazy(() =>
    backboneElementSchema.extend({
      reference: referenceSchema,
      exampleBoolean: booleanSchema.optional(),
      _exampleBoolean: elementSchema.optional(),
      exampleCanonical: urlSchema.optional(),
      _exampleCanonical: elementSchema.optional(),
      relativePath: urlSchema.optional(),
      _relativePath: elementSchema.optional(),
    }),
  )

const implementationGuideManifestPageSchema: ZodType<ImplementationGuideManifestPage> =
  z.lazy(() =>
    backboneElementSchema.extend({
      name: stringSchema,
      _name: elementSchema.optional(),
      title: stringSchema.optional(),
      _title: elementSchema.optional(),
      anchor: stringSchema.array().optional(),
      _anchor: elementSchema.array().optional(),
    }),
  )

const implementationGuideManifestSchema: ZodType<ImplementationGuideManifest> =
  z.lazy(() =>
    backboneElementSchema.extend({
      rendering: urlSchema.optional(),
      _rendering: elementSchema.optional(),
      resource: implementationGuideManifestResourceSchema.array(),
      page: implementationGuideManifestPageSchema.array().optional(),
      image: stringSchema.array().optional(),
      _image: elementSchema.array().optional(),
      other: stringSchema.array().optional(),
      _other: elementSchema.array().optional(),
    }),
  )

export const untypedImplementationGuideSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImplementationGuide').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
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
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    packageId: stringSchema,
    _packageId: elementSchema.optional(),
    license: stringSchema.optional(),
    _license: elementSchema.optional(),
    fhirVersion: z.array(stringSchema),
    _fhirVersion: elementSchema.array().optional(),
    dependsOn: implementationGuideDependsOnSchema.array().optional(),
    global: implementationGuideGlobalSchema.array().optional(),
    definition: implementationGuideDefinitionSchema.optional(),
    manifest: implementationGuideManifestSchema.optional(),
  }),
) satisfies ZodType<ImplementationGuide>

export const implementationGuideSchema: ZodType<ImplementationGuide> =
  untypedImplementationGuideSchema

export class FhirImplementationGuide extends FhirDomainResource<ImplementationGuide> {
  public static parse(value: unknown): FhirImplementationGuide {
    return new FhirImplementationGuide(implementationGuideSchema.parse(value))
  }
}
