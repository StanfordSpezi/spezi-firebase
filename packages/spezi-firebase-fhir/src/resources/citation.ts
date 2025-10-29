//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Citation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  addressSchema,
  annotationSchema,
  backboneElementSchema,
  base64BinarySchema,
  booleanSchema,
  codeableConceptSchema,
  codeSchema,
  contactDetailSchema,
  contactPointSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  positiveIntSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import { publicationStatusSchema } from '../valueSets/index.js'

// Define Citation sub-schemas using getter properties for self-referencing
const citationSummarySchema = z.lazy(() =>
  backboneElementSchema.extend({
    style: codeableConceptSchema.optional(),
    text: markdownSchema,
    _text: elementSchema.optional(),
  }),
)

const citationClassificationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    classifier: codeableConceptSchema.array().optional(),
  }),
)

const citationStatusDateSchema = z.lazy(() =>
  backboneElementSchema.extend({
    activity: codeableConceptSchema,
    actual: booleanSchema.optional(),
    _actual: elementSchema.optional(),
    period: periodSchema,
  }),
)

const citationRelatesToSchema = z.lazy(() =>
  backboneElementSchema.extend({
    relationshipType: codeableConceptSchema,
    targetClassifier: codeableConceptSchema.array().optional(),
    targetUri: uriSchema.optional(),
    _targetUri: elementSchema.optional(),
    targetIdentifier: identifierSchema.optional(),
    targetReference: referenceSchema.optional(),
    targetAttachment: z
      .object({
        contentType: codeSchema.optional(),
        _contentType: elementSchema.optional(),
        language: codeSchema.optional(),
        _language: elementSchema.optional(),
        data: base64BinarySchema.optional(),
        _data: elementSchema.optional(),
        url: uriSchema.optional(),
        _url: elementSchema.optional(),
        size: unsignedIntSchema.optional(),
        _size: elementSchema.optional(),
        hash: base64BinarySchema.optional(),
        _hash: elementSchema.optional(),
        title: stringSchema.optional(),
        _title: elementSchema.optional(),
        creation: dateTimeSchema.optional(),
        _creation: elementSchema.optional(),
      })
      .optional(),
  }),
)

export const untypedCitationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Citation').readonly(),
    url: uriSchema.optional(),
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
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    summary: citationSummarySchema.array().optional(),
    classification: citationClassificationSchema.array().optional(),
    note: z
      .lazy(() => annotationSchema)
      .array()
      .optional(),
    currentState: codeableConceptSchema.array().optional(),
    statusDate: citationStatusDateSchema.array().optional(),
    relatesTo: citationRelatesToSchema.array().optional(),
    citedArtifact: z
      .lazy(() =>
        backboneElementSchema.extend({
          identifier: identifierSchema.array().optional(),
          relatedIdentifier: identifierSchema.array().optional(),
          dateAccessed: dateTimeSchema.optional(),
          _dateAccessed: elementSchema.optional(),
          version: z
            .lazy(() =>
              backboneElementSchema.extend({
                value: stringSchema,
                _value: elementSchema.optional(),
                baseCitation: referenceSchema.optional(),
              }),
            )
            .optional(),
          currentState: codeableConceptSchema.array().optional(),
          statusDate: citationStatusDateSchema.array().optional(),
          title: z
            .lazy(() =>
              backboneElementSchema.extend({
                type: codeableConceptSchema.array().optional(),
                language: codeableConceptSchema.optional(),
                text: markdownSchema,
                _text: elementSchema.optional(),
              }),
            )
            .array()
            .optional(),
          abstract: z
            .lazy(() =>
              backboneElementSchema.extend({
                type: codeableConceptSchema.optional(),
                language: codeableConceptSchema.optional(),
                text: markdownSchema,
                _text: elementSchema.optional(),
                copyright: markdownSchema.optional(),
                _copyright: elementSchema.optional(),
              }),
            )
            .array()
            .optional(),
          part: z
            .lazy(() =>
              backboneElementSchema.extend({
                type: codeableConceptSchema.optional(),
                value: stringSchema.optional(),
                _value: elementSchema.optional(),
                baseCitation: referenceSchema.optional(),
              }),
            )
            .optional(),
          relatesTo: citationRelatesToSchema.array().optional(),
          publicationForm: z
            .lazy(() =>
              backboneElementSchema.extend({
                publishedIn: z
                  .lazy(() =>
                    backboneElementSchema.extend({
                      type: codeableConceptSchema.optional(),
                      identifier: identifierSchema.array().optional(),
                      title: stringSchema.optional(),
                      _title: elementSchema.optional(),
                      publisher: referenceSchema.optional(),
                      publisherLocation: stringSchema.optional(),
                      _publisherLocation: elementSchema.optional(),
                    }),
                  )
                  .optional(),
                periodicRelease: z
                  .lazy(() =>
                    backboneElementSchema.extend({
                      citedMedium: codeableConceptSchema.optional(),
                      volume: stringSchema.optional(),
                      _volume: elementSchema.optional(),
                      issue: stringSchema.optional(),
                      _issue: elementSchema.optional(),
                      dateOfPublication: z
                        .lazy(() =>
                          backboneElementSchema.extend({
                            date: dateSchema.optional(),
                            _date: elementSchema.optional(),
                            year: stringSchema.optional(),
                            _year: elementSchema.optional(),
                            month: stringSchema.optional(),
                            _month: elementSchema.optional(),
                            day: stringSchema.optional(),
                            _day: elementSchema.optional(),
                            season: stringSchema.optional(),
                            _season: elementSchema.optional(),
                            text: stringSchema.optional(),
                            _text: elementSchema.optional(),
                          }),
                        )
                        .optional(),
                    }),
                  )
                  .optional(),
                articleDate: dateTimeSchema.optional(),
                _articleDate: elementSchema.optional(),
                lastRevisionDate: dateTimeSchema.optional(),
                _lastRevisionDate: elementSchema.optional(),
                language: codeableConceptSchema.array().optional(),
                accessionNumber: stringSchema.optional(),
                _accessionNumber: elementSchema.optional(),
                pageString: stringSchema.optional(),
                _pageString: elementSchema.optional(),
                firstPage: stringSchema.optional(),
                _firstPage: elementSchema.optional(),
                lastPage: stringSchema.optional(),
                _lastPage: elementSchema.optional(),
                pageCount: stringSchema.optional(),
                _pageCount: elementSchema.optional(),
                copyright: markdownSchema.optional(),
                _copyright: elementSchema.optional(),
              }),
            )
            .array()
            .optional(),
          webLocation: z
            .lazy(() =>
              backboneElementSchema.extend({
                type: codeableConceptSchema.optional(),
                url: uriSchema.optional(),
                _url: elementSchema.optional(),
              }),
            )
            .array()
            .optional(),
          classification: citationClassificationSchema.array().optional(),
          contributorship: z
            .lazy(() =>
              backboneElementSchema.extend({
                complete: booleanSchema.optional(),
                _complete: elementSchema.optional(),
                entry: z
                  .lazy(() =>
                    backboneElementSchema.extend({
                      name: humanNameSchema.optional(),
                      initials: stringSchema.optional(),
                      _initials: elementSchema.optional(),
                      collectiveName: stringSchema.optional(),
                      _collectiveName: elementSchema.optional(),
                      identifier: identifierSchema.array().optional(),
                      affiliationInfo: z
                        .lazy(() =>
                          backboneElementSchema.extend({
                            affiliation: stringSchema.optional(),
                            _affiliation: elementSchema.optional(),
                            role: stringSchema.optional(),
                            _role: elementSchema.optional(),
                            identifier: identifierSchema.array().optional(),
                          }),
                        )
                        .array()
                        .optional(),
                      address: z
                        .lazy(() => addressSchema)
                        .array()
                        .optional(),
                      telecom: z
                        .lazy(() => contactPointSchema)
                        .array()
                        .optional(),
                      contributionType: codeableConceptSchema
                        .array()
                        .optional(),
                      role: codeableConceptSchema.optional(),
                      contributionInstance: z
                        .lazy(() =>
                          backboneElementSchema.extend({
                            type: codeableConceptSchema,
                            time: dateTimeSchema.optional(),
                            _time: elementSchema.optional(),
                          }),
                        )
                        .array()
                        .optional(),
                      correspondingContact: booleanSchema.optional(),
                      _correspondingContact: elementSchema.optional(),
                      listOrder: positiveIntSchema.optional(),
                      _listOrder: elementSchema.optional(),
                    }),
                  )
                  .array()
                  .optional(),
                summary: z
                  .lazy(() =>
                    backboneElementSchema.extend({
                      type: codeableConceptSchema.optional(),
                      style: codeableConceptSchema.optional(),
                      source: codeableConceptSchema.optional(),
                      value: markdownSchema,
                      _value: elementSchema.optional(),
                    }),
                  )
                  .array()
                  .optional(),
              }),
            )
            .optional(),
          note: z
            .lazy(() => annotationSchema)
            .array()
            .optional(),
        }),
      )
      .optional(),
  }),
) satisfies ZodType<Citation>

export const citationSchema: ZodType<Citation> = untypedCitationSchema

export class FhirCitation extends FhirDomainResource<Citation> {
  // Static Functions

  public static parse(value: unknown): FhirCitation {
    return new FhirCitation(citationSchema.parse(value))
  }
}
