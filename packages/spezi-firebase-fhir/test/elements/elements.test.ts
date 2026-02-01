// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { expectTypeOf } from 'expect-type'
import {
  type Address,
  type Annotation,
  type Attachment,
  type BackboneElement,
  type CodeableConcept,
  type CodeableReference,
  type Coding,
  type ContactDetail,
  type ContactPoint,
  type Contributor,
  type DataRequirement,
  type DomainResource,
  type Dosage,
  type Element,
  type Expression,
  type Extension,
  type HumanName,
  type Identifier,
  type MarketingStatus,
  type Meta,
  type Money,
  type Narrative,
  type ParameterDefinition,
  type Period,
  type Quantity,
  type Range,
  type Ratio,
  type RatioRange,
  type Reference,
  type RelatedArtifact,
  type Resource,
  type SampledData,
  type Signature,
  type Timing,
  type TriggerDefinition,
  type UsageContext,
} from 'fhir/r4b.js'
import { type z } from 'zod'
import {
  type backboneElementSchema,
  type domainResourceSchema,
  type elementSchema,
  type resourceSchema,
  type untypedAddressSchema,
  type untypedAnnotationSchema,
  type untypedAttachmentSchema,
  type untypedCodeableConceptSchema,
  type untypedCodeableReferenceSchema,
  type untypedCodingSchema,
  type untypedContactDetailSchema,
  type untypedContactPointSchema,
  type untypedContributorSchema,
  type untypedDataRequirementSchema,
  type untypedDosageSchema,
  type untypedExpressionSchema,
  type untypedExtensionSchema,
  type untypedHumanNameSchema,
  type untypedIdentifierSchema,
  type untypedMarketingStatusSchema,
  type untypedMetaSchema,
  type untypedMoneySchema,
  type untypedNarrativeSchema,
  type untypedParameterDefinitionSchema,
  type untypedPeriodSchema,
  type untypedQuantitySchema,
  type untypedRangeSchema,
  type untypedRatioRangeSchema,
  type untypedRatioSchema,
  type untypedReferenceSchema,
  type untypedRelatedArtifactSchema,
  type untypedSampledDataSchema,
  type untypedSignatureSchema,
  type untypedTimingSchema,
  type untypedTriggerDefinitionSchema,
  type untypedUsageContextSchema,
} from '../../src/index.js'

describe('Elements', () => {
  it('should validate data types to be typed correctly', () => {
    type AddressSchema = z.infer<typeof untypedAddressSchema>
    expectTypeOf<AddressSchema>().toExtend<Address>()
    expectTypeOf<Address>().toExtend<AddressSchema>()

    type AnnotationSchema = z.infer<typeof untypedAnnotationSchema>
    expectTypeOf<AnnotationSchema>().toExtend<Annotation>()
    expectTypeOf<Annotation>().toExtend<AnnotationSchema>()

    type AttachmentSchema = z.infer<typeof untypedAttachmentSchema>
    expectTypeOf<AttachmentSchema>().toExtend<Attachment>()
    expectTypeOf<Attachment>().toExtend<AttachmentSchema>()

    type CodeableConceptSchema = z.infer<typeof untypedCodeableConceptSchema>
    expectTypeOf<CodeableConceptSchema>().toExtend<CodeableConcept>()
    expectTypeOf<CodeableConcept>().toExtend<CodeableConceptSchema>()

    type CodeableReferenceSchema = z.infer<
      typeof untypedCodeableReferenceSchema
    >
    expectTypeOf<CodeableReferenceSchema>().toExtend<CodeableReference>()
    expectTypeOf<CodeableReference>().toExtend<CodeableReferenceSchema>()

    type CodingSchema = z.infer<typeof untypedCodingSchema>
    expectTypeOf<CodingSchema>().toExtend<Coding>()
    expectTypeOf<Coding>().toExtend<CodingSchema>()

    type ContactPointSchema = z.infer<typeof untypedContactPointSchema>
    expectTypeOf<ContactPointSchema>().toExtend<ContactPoint>()
    expectTypeOf<ContactPoint>().toExtend<ContactPointSchema>()

    type HumanNameSchema = z.infer<typeof untypedHumanNameSchema>
    expectTypeOf<HumanNameSchema>().toExtend<HumanName>()
    expectTypeOf<HumanName>().toExtend<HumanNameSchema>()

    type IdentifierSchema = z.infer<typeof untypedIdentifierSchema>
    expectTypeOf<IdentifierSchema>().toExtend<Identifier>()
    expectTypeOf<Identifier>().toExtend<IdentifierSchema>()

    type MarketingStatusSchema = z.infer<typeof untypedMarketingStatusSchema>
    expectTypeOf<MarketingStatusSchema>().toExtend<MarketingStatus>()
    expectTypeOf<MarketingStatus>().toExtend<MarketingStatusSchema>()

    type MoneySchema = z.infer<typeof untypedMoneySchema>
    expectTypeOf<MoneySchema>().toExtend<Money>()
    expectTypeOf<Money>().toExtend<MoneySchema>()

    type NarrativeSchema = z.infer<typeof untypedNarrativeSchema>
    expectTypeOf<NarrativeSchema>().toExtend<Narrative>()
    expectTypeOf<Narrative>().toExtend<NarrativeSchema>()

    type PeriodSchema = z.infer<typeof untypedPeriodSchema>
    expectTypeOf<PeriodSchema>().toExtend<Period>()
    expectTypeOf<Period>().toExtend<PeriodSchema>()

    type QuantitySchema = z.infer<typeof untypedQuantitySchema>
    expectTypeOf<QuantitySchema>().toExtend<Quantity>()
    expectTypeOf<Quantity>().toExtend<QuantitySchema>()

    type RangeSchema = z.infer<typeof untypedRangeSchema>
    expectTypeOf<RangeSchema>().toExtend<Range>()
    expectTypeOf<Range>().toExtend<RangeSchema>()

    type RatioSchema = z.infer<typeof untypedRatioSchema>
    expectTypeOf<RatioSchema>().toExtend<Ratio>()
    expectTypeOf<Ratio>().toExtend<RatioSchema>()

    type RatioRangeSchema = z.infer<typeof untypedRatioRangeSchema>
    expectTypeOf<RatioRangeSchema>().toExtend<RatioRange>()
    expectTypeOf<RatioRange>().toExtend<RatioRangeSchema>()

    type ReferenceSchema = z.infer<typeof untypedReferenceSchema>
    expectTypeOf<ReferenceSchema>().toExtend<Reference>()
    expectTypeOf<Reference>().toExtend<ReferenceSchema>()

    type SampledDataSchema = z.infer<typeof untypedSampledDataSchema>
    expectTypeOf<SampledDataSchema>().toExtend<SampledData>()
    expectTypeOf<SampledData>().toExtend<SampledDataSchema>()

    type SignatureSchema = z.infer<typeof untypedSignatureSchema>
    expectTypeOf<SignatureSchema>().toExtend<Signature>()
    expectTypeOf<Signature>().toExtend<SignatureSchema>()

    type TimingSchema = z.infer<typeof untypedTimingSchema>
    expectTypeOf<TimingSchema>().toExtend<Timing>()
    expectTypeOf<Timing>().toExtend<TimingSchema>()
  })

  it('should validate metadata types to be typed correctly', () => {
    type ContactDetailSchema = z.infer<typeof untypedContactDetailSchema>
    expectTypeOf<ContactDetailSchema>().toExtend<ContactDetail>()
    expectTypeOf<ContactDetail>().toExtend<ContactDetailSchema>()

    type ContributorSchema = z.infer<typeof untypedContributorSchema>
    expectTypeOf<ContributorSchema>().toExtend<Contributor>()
    expectTypeOf<Contributor>().toExtend<ContributorSchema>()

    type DataRequirementSchema = z.infer<typeof untypedDataRequirementSchema>
    expectTypeOf<DataRequirementSchema>().toExtend<DataRequirement>()
    expectTypeOf<DataRequirement>().toExtend<DataRequirementSchema>()

    type ExpressionSchema = z.infer<typeof untypedExpressionSchema>
    expectTypeOf<ExpressionSchema>().toExtend<Expression>()
    expectTypeOf<Expression>().toExtend<ExpressionSchema>()

    type ParameterDefinitionSchema = z.infer<
      typeof untypedParameterDefinitionSchema
    >
    expectTypeOf<ParameterDefinitionSchema>().toExtend<ParameterDefinition>()
    expectTypeOf<ParameterDefinition>().toExtend<ParameterDefinitionSchema>()

    type RelatedArtifactSchema = z.infer<typeof untypedRelatedArtifactSchema>
    expectTypeOf<RelatedArtifactSchema>().toExtend<RelatedArtifact>()
    expectTypeOf<RelatedArtifact>().toExtend<RelatedArtifactSchema>()

    type TriggerDefinitionSchema = z.infer<
      typeof untypedTriggerDefinitionSchema
    >
    expectTypeOf<TriggerDefinitionSchema>().toExtend<TriggerDefinition>()
    expectTypeOf<TriggerDefinition>().toExtend<TriggerDefinitionSchema>()

    type UsageContextSchema = z.infer<typeof untypedUsageContextSchema>
    expectTypeOf<UsageContextSchema>().toExtend<UsageContext>()
    expectTypeOf<UsageContext>().toExtend<UsageContextSchema>()
  })

  it('should validate all other elements to be typed correctly', () => {
    type DosageSchema = z.infer<typeof untypedDosageSchema>
    expectTypeOf<DosageSchema>().toExtend<Dosage>()
    expectTypeOf<Dosage>().toExtend<DosageSchema>()

    type ExtensionSchema = z.infer<typeof untypedExtensionSchema>
    expectTypeOf<ExtensionSchema>().toExtend<Extension>()
    expectTypeOf<Extension>().toExtend<ExtensionSchema>()

    type MetaSchema = z.infer<typeof untypedMetaSchema>
    expectTypeOf<MetaSchema>().toExtend<Meta>()
    expectTypeOf<Meta>().toExtend<MetaSchema>()

    type ResourceSchema = z.infer<typeof resourceSchema>
    expectTypeOf<Resource>().toExtend<ResourceSchema>()
    expectTypeOf<ResourceSchema>().toExtend<Resource>()

    type DomainResourceSchema = z.infer<typeof domainResourceSchema>
    expectTypeOf<DomainResource>().toExtend<DomainResourceSchema>()
    expectTypeOf<DomainResourceSchema>().toExtend<DomainResource>()

    type BackboneElementSchema = z.infer<typeof backboneElementSchema>
    expectTypeOf<BackboneElementSchema>().toExtend<BackboneElement>()
    expectTypeOf<BackboneElement>().toExtend<BackboneElementSchema>()

    type ElementSchema = z.infer<typeof elementSchema>
    expectTypeOf<ElementSchema>().toExtend<Element>()
    expectTypeOf<Element>().toExtend<ElementSchema>()
  })
})
