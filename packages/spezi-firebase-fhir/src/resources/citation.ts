//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  CitationCitedArtifact,
  CitationCitedArtifactAbstract,
  CitationCitedArtifactContributorship,
  CitationCitedArtifactContributorshipEntry,
  CitationCitedArtifactContributorshipEntryAffiliationInfo,
  CitationCitedArtifactContributorshipEntryContributionInstance,
  CitationCitedArtifactContributorshipSummary,
  CitationCitedArtifactPart,
  CitationCitedArtifactPublicationForm,
  CitationCitedArtifactPublicationFormPeriodicRelease,
  CitationCitedArtifactPublicationFormPeriodicReleaseDateOfPublication,
  CitationCitedArtifactPublicationFormPublishedIn,
  CitationCitedArtifactTitle,
  CitationCitedArtifactVersion,
  CitationCitedArtifactWebLocation,
  CitationClassification,
  CitationRelatesTo,
  CitationStatusDate,
  CitationSummary,
  type Citation,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  addressSchema,
  annotationSchema,
  attachmentSchema,
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
const citationSummarySchema: ZodType<CitationSummary> =
  backboneElementSchema.extend({
    style: codeableConceptSchema.optional(),
    text: markdownSchema,
    _text: elementSchema.optional(),
  })

const citationClassificationSchema: ZodType<CitationClassification> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    classifier: codeableConceptSchema.array().optional(),
  })

const citationStatusDateSchema: ZodType<CitationStatusDate> =
  backboneElementSchema.extend({
    activity: codeableConceptSchema,
    actual: booleanSchema.optional(),
    _actual: elementSchema.optional(),
    period: periodSchema,
  })

const citationRelatesToSchema: ZodType<CitationRelatesTo> =
  backboneElementSchema.extend({
    relationshipType: codeableConceptSchema,
    targetClassifier: codeableConceptSchema.array().optional(),
    targetUri: uriSchema.optional(),
    _targetUri: elementSchema.optional(),
    targetIdentifier: identifierSchema.optional(),
    targetReference: referenceSchema.optional(),
    targetAttachment: attachmentSchema.optional(),
  })

const citationCitedArtifactVersionSchema: ZodType<CitationCitedArtifactVersion> =
  backboneElementSchema.extend({
    value: stringSchema,
    _value: elementSchema.optional(),
    baseCitation: referenceSchema.optional(),
  })

const citationCitedArtifactTitleSchema: ZodType<CitationCitedArtifactTitle> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.array().optional(),
    language: codeableConceptSchema.optional(),
    text: markdownSchema,
    _text: elementSchema.optional(),
  })

const citationCitedArtifactAbstractSchema: ZodType<CitationCitedArtifactAbstract> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    language: codeableConceptSchema.optional(),
    text: markdownSchema,
    _text: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
  })

const citationCitedArtifactPartSchema: ZodType<CitationCitedArtifactPart> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    value: stringSchema.optional(),
    _value: elementSchema.optional(),
    baseCitation: referenceSchema.optional(),
  })

const citationCitedArtifactPublicationFormPublishedInSchema: ZodType<CitationCitedArtifactPublicationFormPublishedIn> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    identifier: identifierSchema.array().optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    publisher: referenceSchema.optional(),
    publisherLocation: stringSchema.optional(),
    _publisherLocation: elementSchema.optional(),
  })

const citationCitedArtifactPublicationFormPeriodicReleaseDateOfPublicationSchema: ZodType<CitationCitedArtifactPublicationFormPeriodicReleaseDateOfPublication> =
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
  })

const citationCitedArtifactPublicationFormPeriodicReleaseSchema: ZodType<CitationCitedArtifactPublicationFormPeriodicRelease> =
  backboneElementSchema.extend({
    citedMedium: codeableConceptSchema.optional(),
    volume: stringSchema.optional(),
    _volume: elementSchema.optional(),
    issue: stringSchema.optional(),
    _issue: elementSchema.optional(),
    dateOfPublication:
      citationCitedArtifactPublicationFormPeriodicReleaseDateOfPublicationSchema.optional(),
  })

const citationCitedArtifactPublicationFormSchema: ZodType<CitationCitedArtifactPublicationForm> =
  backboneElementSchema.extend({
    publishedIn:
      citationCitedArtifactPublicationFormPublishedInSchema.optional(),
    periodicRelease:
      citationCitedArtifactPublicationFormPeriodicReleaseSchema.optional(),
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
  })

const citationCitedArtifactWebLocationSchema: ZodType<CitationCitedArtifactWebLocation> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
  })

const citationCitedArtifactContributorshipEntryAffiliationInfoSchema: ZodType<CitationCitedArtifactContributorshipEntryAffiliationInfo> =
  backboneElementSchema.extend({
    affiliation: stringSchema.optional(),
    _affiliation: elementSchema.optional(),
    role: stringSchema.optional(),
    _role: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
  })

const citationCitedArtifactContributorshipEntryContributionInstance: ZodType<CitationCitedArtifactContributorshipEntryContributionInstance> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    time: dateTimeSchema.optional(),
    _time: elementSchema.optional(),
  })

const citationCitedArtifactContributorshipEntrySchema: ZodType<CitationCitedArtifactContributorshipEntry> =
  backboneElementSchema.extend({
    name: humanNameSchema.optional(),
    initials: stringSchema.optional(),
    _initials: elementSchema.optional(),
    collectiveName: stringSchema.optional(),
    _collectiveName: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    affiliationInfo:
      citationCitedArtifactContributorshipEntryAffiliationInfoSchema
        .array()
        .optional(),
    address: addressSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    contributionType: codeableConceptSchema.array().optional(),
    role: codeableConceptSchema.optional(),
    contributionInstance:
      citationCitedArtifactContributorshipEntryContributionInstance
        .array()
        .optional(),
    correspondingContact: booleanSchema.optional(),
    _correspondingContact: elementSchema.optional(),
    listOrder: positiveIntSchema.optional(),
    _listOrder: elementSchema.optional(),
  })

const citationCitedArtifactContributorshipSummarySchema: ZodType<CitationCitedArtifactContributorshipSummary> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    style: codeableConceptSchema.optional(),
    source: codeableConceptSchema.optional(),
    value: markdownSchema,
    _value: elementSchema.optional(),
  })

const citationCitedArtifactContributorshipSchema: ZodType<CitationCitedArtifactContributorship> =
  backboneElementSchema.extend({
    complete: booleanSchema.optional(),
    _complete: elementSchema.optional(),
    entry: citationCitedArtifactContributorshipEntrySchema.array().optional(),
    summary: citationCitedArtifactContributorshipSummarySchema
      .array()
      .optional(),
  })

const citationCitedArtifactSchema: ZodType<CitationCitedArtifact> =
  backboneElementSchema.extend({
    identifier: identifierSchema.array().optional(),
    relatedIdentifier: identifierSchema.array().optional(),
    dateAccessed: dateTimeSchema.optional(),
    _dateAccessed: elementSchema.optional(),
    version: citationCitedArtifactVersionSchema.optional(),
    currentState: codeableConceptSchema.array().optional(),
    statusDate: citationStatusDateSchema.array().optional(),
    title: citationCitedArtifactTitleSchema.array().optional(),
    abstract: citationCitedArtifactAbstractSchema.array().optional(),
    part: citationCitedArtifactPartSchema.optional(),
    relatesTo: citationRelatesToSchema.array().optional(),
    publicationForm: citationCitedArtifactPublicationFormSchema
      .array()
      .optional(),
    webLocation: citationCitedArtifactWebLocationSchema.array().optional(),
    classification: citationClassificationSchema.array().optional(),
    contributorship: citationCitedArtifactContributorshipSchema.optional(),
    note: annotationSchema.array().optional(),
  })

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
    note: annotationSchema.array().optional(),
    currentState: codeableConceptSchema.array().optional(),
    statusDate: citationStatusDateSchema.array().optional(),
    relatesTo: citationRelatesToSchema.array().optional(),
    citedArtifact: citationCitedArtifactSchema.optional(),
  }),
) satisfies ZodType<Citation>

export const citationSchema: ZodType<Citation> = untypedCitationSchema

export class FhirCitation extends FhirDomainResource<Citation> {
  // Static Functions

  public static parse(value: unknown): FhirCitation {
    return new FhirCitation(citationSchema.parse(value))
  }
}
