//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Defines the kind of structure that this definition is describing
 * http://hl7.org/fhir/valueset-structure-definition-kind.html
 */
export const structureDefinitionKindSchema = z.enum([
  'primitive-type',
  'complex-type',
  'resource',
  'logical',
])

/**
 * Defines the kind of structure that this definition is describing
 * http://hl7.org/fhir/valueset-structure-definition-kind.html
 */
export type StructureDefinitionKind = z.infer<
  typeof structureDefinitionKindSchema
>

/**
 * How a structure is used in defining the extension
 * http://hl7.org/fhir/valueset-extension-context-type.html
 */
export const extensionContextTypeSchema = z.enum([
  'fhirpath',
  'element',
  'extension',
])

/**
 * How a structure is used in defining the extension
 * http://hl7.org/fhir/valueset-extension-context-type.html
 */
export type ExtensionContextType = z.infer<typeof extensionContextTypeSchema>

/**
 * How a type relates to its base definition
 * http://hl7.org/fhir/valueset-type-derivation-rule.html
 */
export const structureDefinitionDerivationSchema = z.enum([
  'specialization',
  'constraint',
])

/**
 * How a type relates to its base definition
 * http://hl7.org/fhir/valueset-type-derivation-rule.html
 */
export type StructureDefinitionDerivation = z.infer<
  typeof structureDefinitionDerivationSchema
>

/**
 * SHALL applications comply with this constraint?
 * http://hl7.org/fhir/valueset-constraint-severity.html
 */
export const constraintSeveritySchema = z.enum(['error', 'warning'])

/**
 * SHALL applications comply with this constraint?
 * http://hl7.org/fhir/valueset-constraint-severity.html
 */
export type ConstraintSeverity = z.infer<typeof constraintSeveritySchema>

/**
 * How a property is represented when serialized
 * http://hl7.org/fhir/valueset-property-representation.html
 */
export const propertyRepresentationSchema = z.enum([
  'xmlAttr',
  'xmlText',
  'typeAttr',
  'cdaText',
  'xhtml',
])

/**
 * How a property is represented when serialized
 * http://hl7.org/fhir/valueset-property-representation.html
 */
export type PropertyRepresentation = z.infer<
  typeof propertyRepresentationSchema
>

/**
 * How slicing discriminators are interpreted
 * http://hl7.org/fhir/valueset-discriminator-type.html
 */
export const discriminatorTypeSchema = z.enum([
  'value',
  'exists',
  'pattern',
  'type',
  'profile',
])

/**
 * How slicing discriminators are interpreted
 * http://hl7.org/fhir/valueset-discriminator-type.html
 */
export type DiscriminatorType = z.infer<typeof discriminatorTypeSchema>

/**
 * How slicing rules are applied when slicing is used
 * http://hl7.org/fhir/valueset-slicing-rules.html
 */
export const slicingRulesSchema = z.enum(['closed', 'open', 'openAtEnd'])

/**
 * How slicing rules are applied when slicing is used
 * http://hl7.org/fhir/valueset-slicing-rules.html
 */
export type SlicingRules = z.infer<typeof slicingRulesSchema>

/**
 * How resource references can be aggregated
 * http://hl7.org/fhir/valueset-resource-aggregation-mode.html
 */
export const aggregationModeSchema = z.enum([
  'contained',
  'referenced',
  'bundled',
])

/**
 * How resource references can be aggregated
 * http://hl7.org/fhir/valueset-resource-aggregation-mode.html
 */
export type AggregationMode = z.infer<typeof aggregationModeSchema>
