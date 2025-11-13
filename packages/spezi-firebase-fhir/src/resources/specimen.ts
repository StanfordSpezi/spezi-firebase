//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SpecimenCollection,
  type SpecimenContainer,
  type SpecimenProcessing,
  type Coding,
  type Specimen,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { specimenStatusSchema } from '../valueSets/index.js'

const specimenCollectionSchema: ZodType<SpecimenCollection> =
  backboneElementSchema.extend({
    collector: referenceSchema.optional(),
    collectedDateTime: dateTimeSchema.optional(),
    _collectedDateTime: elementSchema.optional(),
    collectedPeriod: periodSchema.optional(),
    duration: quantitySchema.optional(),
    quantity: quantitySchema.optional(),
    method: codeableConceptSchema.optional(),
    bodySite: codeableConceptSchema.optional(),
    fastingStatusCodeableConcept: codeableConceptSchema.optional(),
    fastingStatusDuration: quantitySchema.optional(),
  })

const specimenProcessingSchema: ZodType<SpecimenProcessing> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    procedure: codeableConceptSchema.optional(),
    additive: referenceSchema.array().optional(),
    timeDateTime: dateTimeSchema.optional(),
    _timeDateTime: elementSchema.optional(),
    timePeriod: periodSchema.optional(),
  })

const specimenContainerSchema: ZodType<SpecimenContainer> =
  backboneElementSchema.extend({
    identifier: identifierSchema.array().optional(),
    description: stringSchema.optional(),
    type: codeableConceptSchema.optional(),
    capacity: quantitySchema.optional(),
    specimenQuantity: quantitySchema.optional(),
    additiveCodeableConcept: codeableConceptSchema.optional(),
    additiveReference: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR Specimen resource (untyped version).
 */
export const untypedSpecimenSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Specimen').readonly(),
    identifier: identifierSchema.array().optional(),
    accessionIdentifier: identifierSchema.optional(),
    status: specimenStatusSchema.optional(),
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    receivedTime: dateTimeSchema.optional(),
    _receivedTime: elementSchema.optional(),
    parent: referenceSchema.array().optional(),
    request: referenceSchema.array().optional(),
    collection: specimenCollectionSchema.optional(),
    processing: specimenProcessingSchema.array().optional(),
    container: specimenContainerSchema.array().optional(),
    condition: codeableConceptSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Specimen>

/**
 * Zod schema for FHIR Specimen resource.
 */
export const specimenSchema: ZodType<Specimen> = untypedSpecimenSchema

/**
 * Wrapper class for FHIR Specimen resources.
 * Provides utility methods for working with specimens.
 */
export class FhirSpecimen extends FhirDomainResource<Specimen> {
  // Static Functions

  /**
   * Parses a Specimen resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirSpecimen instance
   */
  public static parse(value: unknown): FhirSpecimen {
    return new FhirSpecimen(specimenSchema.parse(value))
  }

  // Properties

  /**
   * Gets the received time as a JavaScript Date object.
   *
   * @returns The received time if available
   */
  public get receivedTime(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.receivedTime)
  }

  /**
   * Gets the collection time as a JavaScript Date object.
   *
   * @returns The collection time if available
   */
  public get collectionTime(): Date | undefined {
    return FhirDomainResource.parseDateTime(
      this.value.collection?.collectedDateTime,
    )
  }

  /**
   * Gets the type display text.
   *
   * @returns The type display
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }

  /**
   * Gets identifiers by system.
   *
   * @param system - The system URL to filter by
   * @returns Array of identifier values matching the system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided type
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }

  /**
   * Gets note texts from the specimen.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }
}
