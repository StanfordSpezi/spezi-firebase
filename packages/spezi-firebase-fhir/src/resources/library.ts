//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Library } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dataRequirementSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import { parameterDefinitionSchema } from '../elements/metaDataTypes/parameterDefinition.js'

export const untypedLibrarySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Library').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    subtitle: stringSchema.optional(),
    _subtitle: elementSchema.optional(),
    status: z.enum(['draft', 'active', 'retired', 'unknown']),
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    type: codeableConceptSchema,
    subjectCodeableConcept: codeableConceptSchema.optional(),
    subjectReference: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema,
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    topic: codeableConceptSchema.array().optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    parameter: parameterDefinitionSchema.array().optional(),
    dataRequirement: dataRequirementSchema.array().optional(),
    content: attachmentSchema.array().optional(),
  }),
) satisfies ZodType<Library>

export const librarySchema: ZodType<Library> = untypedLibrarySchema

export class FhirLibrary extends FhirDomainResource<Library> {
  // Static Functions

  public static parse(value: unknown): FhirLibrary {
    return new FhirLibrary(librarySchema.parse(value))
  }
}
