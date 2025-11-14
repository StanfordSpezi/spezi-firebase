//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CodeableConcept,
  type Coding,
  type Extension,
  type DomainResource,
  type Reference,
  type Identifier,
  type HumanName,
  type ContactPoint,
  type Period,
  type Annotation,
  type FhirResource,
} from 'fhir/r4b.js'

/**
 * Base class for FHIR domain resource wrappers.
 * Provides utility methods for common operations on FHIR resources.
 *
 * @template ResourceType - The specific FHIR resource type this class wraps
 */
export abstract class FhirDomainResource<ResourceType extends DomainResource> {
  // Constructor

  /**
   * Creates a new FhirDomainResource wrapper.
   *
   * @param value - The FHIR resource to wrap
   */
  public constructor(public value: ResourceType) {}

  // Methods

  /**
   * Extracts all codes from a CodeableConcept that match the given filter criteria.
   *
   * @param concept - The CodeableConcept to extract codes from
   * @param system - The system to filter for
   * @param version - Optional version to filter for
   * @returns Array of code strings that match the filter
   *
   * @example
   * ```typescript
   * const codes = resource.codesBySystem(observation.code, 'http://loinc.org')
   * // Returns: ['8867-4', '85354-9']
   * ```
   */
  public static codesBySystem(
    concept: CodeableConcept | undefined,
    system: string,
    version?: string,
  ): string[] {
    return (concept?.coding ?? []).flatMap((coding) => {
      if (coding.system !== system) return []
      if (version && coding.version !== version) return []
      return coding.code ? [coding.code] : []
    })
  }

  /**
   * Checks if a CodeableConcept contains any of the specified codings.
   *
   * @param concept - The CodeableConcept to check
   * @param filter - Array of Coding objects to match against
   * @returns true if the concept contains at least one matching coding
   *
   * @example
   * ```typescript
   * const hasLoinc = resource.containsCoding(observation.code, [
   *   { system: 'http://loinc.org', code: '8867-4' }
   * ])
   * ```
   */
  public static containsCoding(
    concept: CodeableConcept | undefined,
    ...filter: Coding[]
  ): boolean {
    return filter.some((filterCoding) =>
      (concept?.coding ?? []).some((coding) => {
        if (filterCoding.code && coding.code !== filterCoding.code) return false
        if (filterCoding.system && coding.system !== filterCoding.system)
          return false
        if (filterCoding.version && coding.version !== filterCoding.version)
          return false
        return true
      }),
    )
  }

  /**
   * Retrieves a contained resource by its ID.
   *
   * @template T - The type of the contained resource
   * @param id - The ID of the contained resource to retrieve
   * @returns The contained resource if found, undefined otherwise
   *
   * @example
   * ```typescript
   * const patient = resource.containedResource<Patient>('patient-1')
   * ```
   */
  public containedResource<T extends DomainResource>(
    id: string,
  ): T | undefined {
    return this.value.contained?.find((resource) => resource.id === id) as T
  }

  /**
   * Retrieves all extensions with a specific URL.
   *
   * @param url - The URL of the extensions to retrieve
   * @returns Array of extensions with the specified URL
   *
   * @example
   * ```typescript
   * const extensions = resource.extensionsWithUrl('http://example.org/fhir/StructureDefinition/my-extension')
   * ```
   */
  public extensionsByUrl(...url: string[]): Extension[] {
    return (this.value.extension ?? []).filter(
      (extension) => extension.url && url.includes(extension.url),
    )
  }

  /**
   * Checks if this resource is referenced by a given Reference.
   * Compares the reference string against the resource's ID and fullUrl patterns.
   *
   * @param reference - The Reference to check
   * @returns true if the reference points to this resource
   *
   * @example
   * ```typescript
   * const isReferenced = resource.isReferencedBy({ reference: 'Patient/123' })
   * ```
   */
  public isReferencedBy(reference: Reference): boolean {
    if (!reference.reference) {
      return false
    }

    const resourceId = this.value.id
    if (!resourceId) {
      return false
    }

    const resourceType = this.value.resourceType

    return (
      reference.reference === `${resourceType}/${resourceId}` ||
      reference.reference.endsWith(`/${resourceType}/${resourceId}`) ||
      reference.reference === resourceId
    )
  }

  /**
   * Decodes a base64-encoded string into a Uint8Array.
   * Works in both browser and Node.js environments.
   * This is a utility method that can be used for any base64Binary field in FHIR resources.
   *
   * @param base64String - The base64-encoded string to decode
   * @returns A Uint8Array containing the decoded binary data, or undefined if input is undefined
   *
   * @example
   * ```typescript
   * const data = FhirDomainResource.decodeBase64Binary(attachment.data)
   * if (data) {
   *   console.log(`Binary data size: ${data.length} bytes`)
   * }
   * ```
   */
  public static decodeBase64Binary(
    base64String: string | undefined,
  ): Uint8Array | undefined {
    if (base64String === undefined) {
      return undefined
    }

    try {
      // Determine the environment and decode accordingly
      if (typeof Buffer !== 'undefined') {
        // Node.js environment
        return new Uint8Array(Buffer.from(base64String, 'base64'))
      } else if (typeof atob === 'function') {
        // Browser environment
        const binaryString = atob(base64String)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        return bytes
      } else {
        throw new Error(
          'No base64 decoding method available in this environment',
        )
      }
    } catch (error) {
      throw new Error(
        `Failed to decode base64 data: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Generic method to get identifiers by system from an array of identifiers.
   * Can be used by any resource that has an identifier field.
   *
   * @param identifiers - Array of identifiers to search
   * @param system - The system URL to filter by
   * @returns Array of identifier values matching the system
   *
   * @example
   * ```typescript
   * const mrns = FhirDomainResource.getIdentifiersBySystem(
   *   patient.identifier,
   *   'http://hospital.org/mrn'
   * )
   * ```
   */
  public static identifiersBySystem(
    identifiers: Identifier[] | undefined,
    ...system: string[]
  ): string[] {
    return (identifiers ?? [])
      .filter((id) => id.system && system.includes(id.system))
      .flatMap((id) => (id.value ? [id.value] : []))
  }

  /**
   * Gets an identifier by system from an array of identifiers (returns first match).
   *
   * @param identifiers - Array of identifiers to search
   * @param system - The system URL to filter by
   * @returns The first identifier value matching the system, or undefined
   *
   * @example
   * ```typescript
   * const mrn = FhirDomainResource.getIdentifierBySystem(
   *   patient.identifier,
   *   'http://hospital.org/mrn'
   * )
   * ```
   */
  public static identifierBySystem(
    identifiers: Identifier[] | undefined,
    ...system: string[]
  ): string | undefined {
    return identifiers?.find((id) => id.system && system.includes(id.system))
      ?.value
  }

  /**
   * Gets all identifiers by type from an array of identifiers.
   *
   * @param identifiers - Array of identifiers to search
   * @param types - One or more Coding objects representing identifier types to match
   * @returns Array of identifier values matching any of the specified types
   *
   * @example
   * ```typescript
   * const passports = FhirDomainResource.identifiersByType(
   *   patient.identifier,
   *   { system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: 'PPN' }
   * )
   * ```
   */
  public static identifiersByType(
    identifiers: Identifier[] | undefined,
    ...types: Coding[]
  ): string[] {
    return (identifiers ?? [])
      .filter((id) => this.containsCoding(id.type, ...types))
      .flatMap((id) => (id.value ? [id.value] : []))
  }

  /**
   * Gets the first identifier by type from an array of identifiers.
   *
   * @param identifiers - Array of identifiers to search
   * @param types - One or more Coding objects representing identifier types to match
   * @returns The first identifier value matching any of the specified types, or undefined
   *
   * @example
   * ```typescript
   * const passport = FhirDomainResource.identifierByType(
   *   patient.identifier,
   *   { system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: 'PPN' }
   * )
   * ```
   */
  public static identifierByType(
    identifiers: Identifier[] | undefined,
    ...types: Coding[]
  ): string | undefined {
    return identifiers?.find((id) => this.containsCoding(id.type, ...types))
      ?.value
  }

  /**
   * Extracts name parts from a HumanName into an array.
   *
   * @param name - The HumanName to extract parts from
   * @param includePrefix - Whether to include prefix (e.g., "Dr.")
   * @param includeSuffix - Whether to include suffix (e.g., "Jr.")
   * @returns Array of name parts in order
   *
   * @example
   * ```typescript
   * const parts = FhirDomainResource.humanNameParts(name, true, true)
   * // Returns: ['Dr.', 'John', 'Michael', 'Doe', 'Jr.']
   * ```
   */
  public static humanNameParts(
    name: HumanName | undefined,
    includePrefix = false,
    includeSuffix = false,
  ): string[] {
    if (!name) return []

    const parts: string[] = []

    if (includePrefix && name.prefix) {
      parts.push(...name.prefix)
    }

    if (name.given) {
      parts.push(...name.given)
    }

    if (name.family) {
      parts.push(name.family)
    }

    if (includeSuffix && name.suffix) {
      parts.push(...name.suffix)
    }

    return parts
  }

  /**
   * Generic method to format a HumanName as a full name string.
   *
   * @param name - The HumanName to format
   * @param includePrefix - Whether to include prefix (e.g., "Dr.")
   * @param includeSuffix - Whether to include suffix (e.g., "Jr.")
   * @returns Formatted name string
   *
   * @example
   * ```typescript
   * const fullName = FhirDomainResource.formatHumanName(name, true, true)
   * // Returns: "Dr. John Michael Doe Jr."
   * ```
   */
  public static formatHumanName(
    name: HumanName | undefined,
    includePrefix = false,
    includeSuffix = false,
  ): string | undefined {
    const parts = this.humanNameParts(name, includePrefix, includeSuffix)
    return parts.length > 0 ? parts.join(' ') : undefined
  }

  /**
   * Generic method to extract contact point value by system.
   *
   * @param telecom - Array of ContactPoints
   * @param system - The system to filter by (e.g., 'phone', 'email')
   * @param use - Optional use filter (e.g., 'home', 'work', 'mobile')
   * @returns The contact point value if found
   *
   * @example
   * ```typescript
   * const workEmail = FhirDomainResource.getContactPointBySystem(
   *   patient.telecom,
   *   'email',
   *   'work'
   * )
   * ```
   */
  public static contactPointBySystem(
    telecom: ContactPoint[] | undefined,
    system: ContactPoint['system'],
    use?: ContactPoint['use'],
  ): string | undefined {
    if (!telecom) return undefined

    const filtered = telecom.filter((cp) => cp.system === system)

    if (use) {
      const withUse = filtered.find((cp) => cp.use === use)
      if (withUse) return withUse.value
    }

    return filtered[0]?.value
  }

  /**
   * Generic method to get all contact points by system.
   *
   * @param telecom - Array of ContactPoints
   * @param system - The system to filter by
   * @returns Array of contact point values
   */
  public static contactPointsBySystem(
    telecom: ContactPoint[] | undefined,
    system: ContactPoint['system'],
  ): string[] {
    return (telecom ?? [])
      .filter((cp) => cp.system === system)
      .flatMap((cp) => (cp.value ? [cp.value] : []))
  }

  /**
   * Checks if a period is currently active (overlaps with current date/time).
   *
   * @param period - The Period to check
   * @param asOfDate - Date to check against (defaults to now)
   * @returns true if the period is active
   *
   * @example
   * ```typescript
   * if (FhirDomainResource.periodIsActive(practitioner.period)) {
   *   console.log('Practitioner is currently active')
   * }
   * ```
   */
  public static periodIsActive(
    period: Period | undefined,
    asOfDate: Date = new Date(),
  ): boolean {
    if (!period) return true // No period means always active

    const start = period.start ? new Date(period.start) : undefined
    const end = period.end ? new Date(period.end) : undefined

    if (start && asOfDate < start) return false
    if (end && asOfDate > end) return false

    return true
  }

  /**
   * Checks if a period overlaps with a date range.
   *
   * @param period - The Period to check
   * @param rangeStart - Start of the date range
   * @param rangeEnd - End of the date range
   * @returns true if there is any overlap
   */
  public static periodOverlaps(
    period: Period | undefined,
    rangeStart: Date,
    rangeEnd: Date,
  ): boolean {
    if (!period) return false

    const periodStart = period.start ? new Date(period.start) : new Date(0)
    const periodEnd =
      period.end ? new Date(period.end) : new Date(8640000000000000)

    return periodStart <= rangeEnd && periodEnd >= rangeStart
  }

  /**
   * Converts a FHIR date string (YYYY-MM-DD) to a JavaScript Date object.
   *
   * @param dateString - FHIR date string
   * @returns Date object or undefined
   */
  public static parseDate(dateString: string | undefined): Date | undefined {
    return dateString ? new Date(dateString) : undefined
  }

  /**
   * Converts a FHIR dateTime/instant string to a JavaScript Date object.
   *
   * @param dateTimeString - FHIR dateTime or instant string
   * @returns Date object or undefined
   */
  public static parseDateTime(
    dateTimeString: string | undefined,
  ): Date | undefined {
    return dateTimeString ? new Date(dateTimeString) : undefined
  }

  /**
   * Formats a Date object to a FHIR date string (YYYY-MM-DD).
   *
   * @param date - Date object to format
   * @returns FHIR date string
   */
  public static formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).padStart(4, '0')
    return `${year}-${month}-${day}`
  }

  /**
   * Formats a Date object to a FHIR dateTime string.
   *
   * @param date - Date object to format
   * @returns FHIR dateTime string
   */
  public static formatDateTime(date: Date): string {
    return date.toISOString()
  }

  /**
   * Gets the text content from an Annotation array.
   *
   * @param annotations - Array of Annotations
   * @returns Array of annotation texts
   *
   * @example
   * ```typescript
   * const notes = FhirDomainResource.getAnnotationTexts(condition.note)
   * ```
   */
  public static annotationTexts(
    annotations: Annotation[] | undefined,
  ): string[] {
    if (!annotations) return []
    const texts: string[] = []
    for (const annotation of annotations) {
      if (annotation.text) {
        texts.push(annotation.text)
      }
    }
    return texts
  }

  /**
   * Gets the display text from a CodeableConcept.
   *
   * @param concept - The CodeableConcept
   * @returns The text or first coding display, or undefined
   */
  public static codeableConceptDisplay(
    concept: CodeableConcept | undefined,
  ): string | undefined {
    if (concept?.text) return concept.text
    for (const coding of concept?.coding ?? []) {
      if (coding.display) {
        return coding.display
      }
    }
    return undefined
  }

  /**
   * Gets display texts from an array of CodeableConcepts.
   *
   * @param concept - Array of CodeableConcepts
   * @returns Array of display texts (excludes undefined values)
   *
   * @example
   * ```typescript
   * const displays = FhirDomainResource.codeableConceptDisplays(condition.category)
   * // Returns: ['Encounter Diagnosis', 'Problem List Item']
   * ```
   */
  public static codeableConceptDisplays(
    concept: CodeableConcept[] | undefined,
  ): string[] {
    return (concept ?? [])
      .map((concept) => this.codeableConceptDisplay(concept))
      .flatMap((display) => (display ? [display] : []))
  }

  /**
   * Checks if a Reference points to a specific resource type.
   *
   * @param reference - The Reference to check
   * @param resourceType - The resource type to check for
   * @returns true if the reference is to the specified resource type
   *
   * @example
   * ```typescript
   * if (FhirDomainResource.isReferenceToType(observation.subject, 'Patient')) {
   *   console.log('Subject is a Patient')
   * }
   * ```
   */
  public static isReferenceToType(
    reference: Reference | undefined,
    resourceType: FhirResource['resourceType'],
  ): boolean {
    return reference?.reference?.startsWith(`${resourceType}/`) ?? false
  }

  /**
   * Gets all contained resources of a specific type.
   *
   * @template T - The type of resources to retrieve
   * @param resourceType - The resource type to filter by
   * @returns Array of contained resources of the specified type
   *
   * @example
   * ```typescript
   * const patients = bundle.containedResourcesByType<Patient>('Patient')
   * ```
   */
  public containedResourcesByType<T extends DomainResource>(
    resourceType: T['resourceType'],
  ): T[] {
    return (this.value.contained ?? []).filter(
      (resource) => resource.resourceType === resourceType,
    ) as T[]
  }

  /**
   * Creates a Reference object for this resource.
   *
   * @param display - Optional display text for the reference
   * @returns Reference object or undefined if no ID
   */
  public toReference(display?: string): Reference | undefined {
    if (!this.value.id) return undefined

    return {
      reference: `${this.value.resourceType}/${this.value.id}`,
      ...(display ? { display } : {}),
    }
  }
}
