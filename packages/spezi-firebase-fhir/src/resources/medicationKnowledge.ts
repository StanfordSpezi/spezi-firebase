//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MedicationKnowledgeAdministrationGuidelines,
  type MedicationKnowledgeCost,
  type MedicationKnowledgeIngredient,
  type MedicationKnowledgeMedicineClassification,
  type MedicationKnowledgeMonitoringProgram,
  type MedicationKnowledgeMonograph,
  type MedicationKnowledgePackaging,
  type MedicationKnowledgeRelatedMedicationKnowledge,
  type MedicationKnowledge,
  type MedicationKnowledgeRegulatory,
  type MedicationKnowledgeDrugCharacteristic,
  type MedicationKnowledgeKinetics,
  type MedicationKnowledgeRegulatorySubstitution,
  type MedicationKnowledgeRegulatorySchedule,
  type MedicationKnowledgeRegulatoryMaxDispense,
  type MedicationKnowledgeAdministrationGuidelinesDosage,
  type MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  base64BinarySchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  dosageSchema,
  elementSchema,
  markdownSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { medicationStatusSchema } from '../valueSets/index.js'

const medicationKnowledgeRelatedMedicationKnowledgeSchema: ZodType<MedicationKnowledgeRelatedMedicationKnowledge> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    _type: elementSchema.optional(),
    reference: referenceSchema.array(),
  })

const medicationKnowledgeMonographSchema: ZodType<MedicationKnowledgeMonograph> =
  backboneElementSchema.extend({
    source: referenceSchema.optional(),
    type: codeableConceptSchema.optional(),
  })

const medicationKnowledgeIngredientSchema: ZodType<MedicationKnowledgeIngredient> =
  backboneElementSchema.extend({
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    isActive: booleanSchema.optional(),
    _isActive: elementSchema.optional(),
    strength: ratioSchema.optional(),
  })

const medicationKnowledgeCostSchema: ZodType<MedicationKnowledgeCost> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    source: stringSchema.optional(),
    _source: elementSchema.optional(),
    cost: quantitySchema,
  })

const medicationKnowledgeMonitoringProgramSchema: ZodType<MedicationKnowledgeMonitoringProgram> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
  })

const medicationKnowledgeAdministrationGuidelinesDosageSchema: ZodType<MedicationKnowledgeAdministrationGuidelinesDosage> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    dosage: dosageSchema.array(),
  })

const medicationKnowledgeAdministrationGuidelinesPatientCharacteristicsSchema: ZodType<MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics> =
  backboneElementSchema.extend({
    characteristicCodeableConcept: codeableConceptSchema.optional(),
    characteristicQuantity: quantitySchema.optional(),
    value: stringSchema.array().optional(),
  })

const medicationKnowledgeAdministrationGuidelinesSchema: ZodType<MedicationKnowledgeAdministrationGuidelines> =
  backboneElementSchema.extend({
    dosage: medicationKnowledgeAdministrationGuidelinesDosageSchema
      .array()
      .optional(),
    indicationCodeableConcept: codeableConceptSchema.optional(),
    indicationReference: referenceSchema.optional(),
    patientCharacteristics:
      medicationKnowledgeAdministrationGuidelinesPatientCharacteristicsSchema
        .array()
        .optional(),
  })

const medicationKnowledgeMedicineClassificationSchema: ZodType<MedicationKnowledgeMedicineClassification> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    classification: codeableConceptSchema.array(),
  })

const medicationKnowledgePackagingSchema: ZodType<MedicationKnowledgePackaging> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    quantity: quantitySchema,
  })

const medicationKnowledgeDrugCharacteristicSchema: ZodType<MedicationKnowledgeDrugCharacteristic> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueBase64Binary: base64BinarySchema.optional(),
    _valueBase64Binary: elementSchema.optional(),
  })

const medicationKnowledgeRegulatorySubstitutionSchema: ZodType<MedicationKnowledgeRegulatorySubstitution> =
  backboneElementSchema.extend({
    allowed: booleanSchema,
    _allowed: elementSchema.optional(),
    type: codeableConceptSchema,
  })

const medicationKnowledgeRegulatoryScheduleSchema: ZodType<MedicationKnowledgeRegulatorySchedule> =
  backboneElementSchema.extend({
    schedule: codeableConceptSchema,
    quantity: quantitySchema.optional(),
  })

const medicationKnowledgeRegulatoryMaxDispenseSchema: ZodType<MedicationKnowledgeRegulatoryMaxDispense> =
  backboneElementSchema.extend({
    quantity: quantitySchema,
    period: quantitySchema.optional(),
  })

const medicationKnowledgeRegulatorySchema: ZodType<MedicationKnowledgeRegulatory> =
  backboneElementSchema.extend({
    regulatoryAuthority: referenceSchema,
    substitution: medicationKnowledgeRegulatorySubstitutionSchema
      .array()
      .optional(),
    schedule: medicationKnowledgeRegulatoryScheduleSchema.array().optional(),
    maxDispense: medicationKnowledgeRegulatoryMaxDispenseSchema.optional(),
  })

const medicationKnowledgeKineticsSchema: ZodType<MedicationKnowledgeKinetics> =
  backboneElementSchema.extend({
    areaUnderCurve: quantitySchema.array().optional(),
    lethalDose50: quantitySchema.array().optional(),
    halfLifePeriod: quantitySchema.optional(),
  })

/**
 * Zod schema for FHIR MedicationKnowledge resource (untyped version).
 */
export const untypedMedicationKnowledgeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationKnowledge').readonly(),
    code: codeableConceptSchema.optional(),
    status: medicationStatusSchema.optional(),
    _status: elementSchema.optional(),
    manufacturer: referenceSchema.optional(),
    doseForm: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
    synonym: stringSchema.array().optional(),
    _synonym: elementSchema.array().optional(),
    relatedMedicationKnowledge:
      medicationKnowledgeRelatedMedicationKnowledgeSchema.array().optional(),
    associatedMedication: referenceSchema.array().optional(),
    productType: codeableConceptSchema.array().optional(),
    monograph: medicationKnowledgeMonographSchema.array().optional(),
    ingredient: medicationKnowledgeIngredientSchema.array().optional(),
    preparationInstruction: markdownSchema.optional(),
    intendedRoute: codeableConceptSchema.array().optional(),
    cost: medicationKnowledgeCostSchema.array().optional(),
    monitoringProgram: medicationKnowledgeMonitoringProgramSchema
      .array()
      .optional(),
    administrationGuidelines: medicationKnowledgeAdministrationGuidelinesSchema
      .array()
      .optional(),
    medicineClassification: medicationKnowledgeMedicineClassificationSchema
      .array()
      .optional(),
    packaging: medicationKnowledgePackagingSchema.optional(),
    drugCharacteristic: medicationKnowledgeDrugCharacteristicSchema
      .array()
      .optional(),
    contraindication: referenceSchema.array().optional(),
    regulatory: medicationKnowledgeRegulatorySchema.array().optional(),
    kinetics: medicationKnowledgeKineticsSchema.array().optional(),
  }),
) satisfies ZodType<MedicationKnowledge>

/**
 * Zod schema for FHIR MedicationKnowledge resource.
 */
export const medicationKnowledgeSchema: ZodType<MedicationKnowledge> =
  untypedMedicationKnowledgeSchema

/**
 * Wrapper class for FHIR MedicationKnowledge resources.
 * Provides utility methods for working with medication knowledge and formulary information.
 */
export class FhirMedicationKnowledge extends FhirDomainResource<MedicationKnowledge> {
  // Static Functions

  /**
   * Parses a MedicationKnowledge resource from unknown data.
   *
   * @param value - The data to parse and validate against the MedicationKnowledge schema
   * @returns A FhirMedicationKnowledge instance containing the validated resource
   */
  public static parse(value: unknown): FhirMedicationKnowledge {
    return new FhirMedicationKnowledge(medicationKnowledgeSchema.parse(value))
  }

  /**
   * Get code display text.
   * @returns Code display text
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Get dose form display text.
   * @returns Dose form display text
   */
  public get doseFormDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.doseForm)
  }

  /**
   * Get all medicine classification displays.
   * @returns Array of classification display texts
   */
  public get medicineClassificationDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.medicineClassification?.map((c) => c.type),
    )
  }

  /**
   * Get all monitoring program names.
   * @returns Array of monitoring program names
   */
  public get monitoringProgramNames(): string[] {
    return (this.value.monitoringProgram ?? []).flatMap((program) =>
      program.name ? [program.name] : [],
    )
  }

  /**
   * Check if medication has any contraindications.
   * @returns True if contraindications exist
   */
  public get hasContraindications(): boolean {
    return (
      !!this.value.contraindication && this.value.contraindication.length > 0
    )
  }
}
