//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type CommunicationRequest,
  type CommunicationRequestPayload,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  communicationRequestStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

const communicationRequestPayloadSchema: ZodType<CommunicationRequestPayload> =
  backboneElementSchema.extend({
    contentString: stringSchema.optional(),
    _contentString: elementSchema.optional(),
    contentAttachment: attachmentSchema.optional(),
    contentReference: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR CommunicationRequest resource (untyped version).
 */
export const untypedCommunicationRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CommunicationRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    status: communicationRequestStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    medium: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    about: referenceSchema.array().optional(),
    encounter: referenceSchema.optional(),
    payload: communicationRequestPayloadSchema.array().optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    recipient: referenceSchema.array().optional(),
    sender: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<CommunicationRequest>

/**
 * Zod schema for FHIR CommunicationRequest resource.
 */
export const communicationRequestSchema: ZodType<CommunicationRequest> =
  untypedCommunicationRequestSchema

/**
 * Wrapper class for FHIR CommunicationRequest resources.
 * Provides utility methods for working with communication requests.
 */
export class FhirCommunicationRequest extends FhirDomainResource<CommunicationRequest> {
  /**
   * Parses a CommunicationRequest resource from unknown data.
   *
   * @param value - The data to parse and validate against the CommunicationRequest schema
   * @returns A FhirCommunicationRequest instance containing the validated resource
   */
  public static parse(value: unknown): FhirCommunicationRequest {
    return new FhirCommunicationRequest(communicationRequestSchema.parse(value))
  }

  /**
   * Gets the authored date as a JavaScript Date object.
   *
   * @returns The authored date, if available
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
  }

  /**
   * Gets note texts from the communication request.
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
