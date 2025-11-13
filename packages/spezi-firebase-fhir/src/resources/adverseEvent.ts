//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AdverseEventSuspectEntity,
  type AdverseEventSuspectEntityCausality,
  type AdverseEvent,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { adverseEventActualitySchema } from '../valueSets/index.js'

const adverseEventSuspectEntityCausalitySchema: ZodType<AdverseEventSuspectEntityCausality> =
  backboneElementSchema.extend({
    assessment: codeableConceptSchema.optional(),
    productRelatedness: stringSchema.optional(),
    _productRelatedness: elementSchema.optional(),
    author: referenceSchema.optional(),
    method: codeableConceptSchema.optional(),
  })

const adverseEventSuspectEntitySchema: ZodType<AdverseEventSuspectEntity> =
  backboneElementSchema.extend({
    instance: referenceSchema,
    causality: adverseEventSuspectEntityCausalitySchema.array().optional(),
  })

/**
 * Zod schema for FHIR AdverseEvent resource (untyped version).
 */
export const untypedAdverseEventSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AdverseEvent').readonly(),
    identifier: identifierSchema.optional(),
    actuality: adverseEventActualitySchema,
    _actuality: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    event: codeableConceptSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    detected: dateTimeSchema.optional(),
    _detected: elementSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    resultingCondition: referenceSchema.array().optional(),
    location: referenceSchema.optional(),
    seriousness: codeableConceptSchema.optional(),
    severity: codeableConceptSchema.optional(),
    outcome: codeableConceptSchema.optional(),
    recorder: referenceSchema.optional(),
    contributor: referenceSchema.array().optional(),
    suspectEntity: adverseEventSuspectEntitySchema.array().optional(),
    subjectMedicalHistory: referenceSchema.array().optional(),
    referenceDocument: referenceSchema.array().optional(),
    study: referenceSchema.array().optional(),
  }),
) satisfies ZodType<AdverseEvent>

/**
 * Zod schema for FHIR AdverseEvent resource.
 */
export const adverseEventSchema: ZodType<AdverseEvent> =
  untypedAdverseEventSchema

/**
 * Wrapper class for FHIR AdverseEvent resources.
 * Provides utility methods for working with adverse event records.
 */
export class FhirAdverseEvent extends FhirDomainResource<AdverseEvent> {
  // Static Functions

  /**
   * Parses an AdverseEvent resource from unknown data.
   *
   * @param value - The data to parse and validate against the AdverseEvent schema
   * @returns A FhirAdverseEvent instance containing the validated resource
   */
  public static parse(value: unknown): FhirAdverseEvent {
    return new FhirAdverseEvent(adverseEventSchema.parse(value))
  }

  /**
   * Gets the adverse event date as a JavaScript Date object.
   *
   * @returns The event date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const eventDate = adverseEvent.eventDate
   * if (eventDate) {
   *   console.log(`Event occurred on: ${eventDate.toLocaleDateString()}`)
   * }
   * ```
   */
  public get eventDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets the recorded date as a JavaScript Date object.
   *
   * @returns The recorded date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const recorded = adverseEvent.recordedDate
   * console.log(`Recorded on: ${recorded?.toLocaleDateString()}`)
   * ```
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recordedDate)
  }

  /**
   * Gets the event display text from the event CodeableConcept.
   *
   * @returns Display text for the adverse event, or undefined if not available
   *
   * @example
   * ```typescript
   * const eventType = adverseEvent.eventDisplay
   * console.log(`Event type: ${eventType}`)
   * ```
   */
  public get eventDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.event)
  }

  /**
   * Gets the seriousness display text.
   *
   * @returns Display text for seriousness level, or undefined if not available
   *
   * @example
   * ```typescript
   * const seriousness = adverseEvent.seriousnessDisplay
   * if (seriousness) {
   *   console.log(`Seriousness: ${seriousness}`)
   * }
   * ```
   */
  public get seriousnessDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.seriousness)
  }

  /**
   * Gets the severity display text.
   *
   * @returns Display text for severity level, or undefined if not available
   *
   * @example
   * ```typescript
   * const severity = adverseEvent.severityDisplay
   * console.log(`Severity: ${severity}`)
   * ```
   */
  public get severityDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.severity)
  }

  /**
   * Gets all category displays as an array of strings.
   *
   * @returns Array of category display texts
   *
   * @example
   * ```typescript
   * const categories = adverseEvent.getCategoryDisplays()
   * console.log(`Categories: ${categories.join(', ')}`)
   * ```
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
  }
}
