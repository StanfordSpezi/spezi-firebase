//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type Communication,
  type CommunicationPayload,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  communicationStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

const communicationPayloadSchema: ZodType<CommunicationPayload> =
  backboneElementSchema.extend({
    contentString: stringSchema.optional(),
    _contentString: elementSchema.optional(),
    contentAttachment: attachmentSchema.optional(),
    contentReference: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR Communication resource (untyped version).
 */
export const untypedCommunicationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Communication').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: z.string().array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: z.string().array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    inResponseTo: referenceSchema.array().optional(),
    status: communicationStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    medium: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    topic: codeableConceptSchema.optional(),
    about: referenceSchema.array().optional(),
    encounter: referenceSchema.optional(),
    sent: dateTimeSchema.optional(),
    _sent: elementSchema.optional(),
    received: dateTimeSchema.optional(),
    _received: elementSchema.optional(),
    recipient: referenceSchema.array().optional(),
    sender: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    payload: communicationPayloadSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Communication>

/**
 * Zod schema for FHIR Communication resource.
 */
export const communicationSchema: ZodType<Communication> =
  untypedCommunicationSchema

/**
 * Wrapper class for FHIR Communication resources.
 * Provides utility methods for working with communication events.
 */
export class FhirCommunication extends FhirDomainResource<Communication> {
  /**
   * Parses a Communication resource from unknown data.
   *
   * @param value - The data to parse and validate against the Communication schema
   * @returns A FhirCommunication instance containing the validated resource
   */
  public static parse(value: unknown): FhirCommunication {
    return new FhirCommunication(communicationSchema.parse(value))
  }

  /**
   * Gets the received date/time as a JavaScript Date object.
   *
   * @returns The received date, if available
   */
  public get receivedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.received)
  }

  /**
   * Gets the sent date/time as a JavaScript Date object.
   *
   * @returns The sent date, if available
   */
  public get sentDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.sent)
  }

  /**
   * Gets note texts from the communication.
   *
   * @returns Array of note text strings
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
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
   * @returns Array of identifier values matching any provided Coding
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
}
