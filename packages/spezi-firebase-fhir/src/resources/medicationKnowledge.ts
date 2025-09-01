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
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

const relatedMedicationKnowledgeSchema: ZodType<MedicationKnowledgeRelatedMedicationKnowledge> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: codeableConceptSchema,
      _type: elementSchema.optional(),
      reference: referenceSchema.array(),
    }),
  )

const monographSchema: ZodType<MedicationKnowledgeMonograph> = z.lazy(() =>
  backboneElementSchema.extend({
    source: referenceSchema.optional(),
    type: codeableConceptSchema.optional(),
  }),
)

const ingredientSchema: ZodType<MedicationKnowledgeIngredient> = z.lazy(() =>
  backboneElementSchema.extend({
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    isActive: booleanSchema.optional(),
    _isActive: elementSchema.optional(),
    strength: ratioSchema.optional(),
  }),
)

const costSchema: ZodType<MedicationKnowledgeCost> = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    source: stringSchema.optional(),
    _source: elementSchema.optional(),
    cost: quantitySchema,
  }),
)

const monitoringProgramSchema: ZodType<MedicationKnowledgeMonitoringProgram> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: codeableConceptSchema.optional(),
      name: stringSchema.optional(),
      _name: elementSchema.optional(),
    }),
  )

const administrationGuidelinesSchema: ZodType<MedicationKnowledgeAdministrationGuidelines> =
  z.lazy(() =>
    backboneElementSchema.extend({
      dosage: backboneElementSchema
        .extend({
          type: codeableConceptSchema,
          dosage: dosageSchema.array(),
        })
        .array()
        .optional(),
      indicationCodeableConcept: codeableConceptSchema.optional(),
      indicationReference: referenceSchema.optional(),
      patientCharacteristics: backboneElementSchema
        .extend({
          characteristicCodeableConcept: codeableConceptSchema.optional(),
          characteristicQuantity: quantitySchema.optional(),
          value: stringSchema.array().optional(),
        })
        .array()
        .optional(),
    }),
  )

const medicineClassificationSchema: ZodType<MedicationKnowledgeMedicineClassification> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: codeableConceptSchema,
      classification: codeableConceptSchema.array(),
    }),
  )

const packagingSchema: ZodType<MedicationKnowledgePackaging> = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    quantity: quantitySchema,
  }),
)

const drugCharacteristicSchema: ZodType<MedicationKnowledgeDrugCharacteristic> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: codeableConceptSchema,
      valueCodeableConcept: codeableConceptSchema.optional(),
      valueString: stringSchema.optional(),
      _valueString: elementSchema.optional(),
      valueQuantity: quantitySchema.optional(),
      valueBase64Binary: base64BinarySchema.optional(),
      _valueBase64Binary: elementSchema.optional(),
    }),
  )

const regulatorySchema: ZodType<MedicationKnowledgeRegulatory> = z.lazy(() =>
  backboneElementSchema.extend({
    regulatoryAuthority: referenceSchema,
    substitution: backboneElementSchema
      .extend({
        allowed: booleanSchema,
        _allowed: elementSchema.optional(),
        type: codeableConceptSchema,
      })
      .array()
      .optional(),
    schedule: backboneElementSchema
      .extend({
        schedule: codeableConceptSchema,
        quantity: quantitySchema.optional(),
      })
      .array()
      .optional(),
    maxDispense: backboneElementSchema
      .extend({
        quantity: quantitySchema,
        period: quantitySchema.optional(),
      })
      .optional(),
  }),
)

const kineticsSchema: ZodType<MedicationKnowledgeKinetics> = z.lazy(() =>
  backboneElementSchema.extend({
    areaUnderCurve: quantitySchema.array().optional(),
    lethalDose50: quantitySchema.array().optional(),
    halfLifePeriod: quantitySchema.optional(),
  }),
)

export const untypedMedicationKnowledgeSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationKnowledge').readonly(),
    code: codeableConceptSchema.optional(),
    status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
    _status: elementSchema.optional(),
    manufacturer: referenceSchema.optional(),
    doseForm: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
    synonym: stringSchema.array().optional(),
    _synonym: elementSchema.array().optional(),
    relatedMedicationKnowledge: relatedMedicationKnowledgeSchema
      .array()
      .optional(),
    associatedMedication: referenceSchema.array().optional(),
    productType: codeableConceptSchema.array().optional(),
    monograph: monographSchema.array().optional(),
    ingredient: ingredientSchema.array().optional(),
    preparationInstruction: markdownSchema.optional(),
    intendedRoute: codeableConceptSchema.array().optional(),
    cost: costSchema.array().optional(),
    monitoringProgram: monitoringProgramSchema.array().optional(),
    administrationGuidelines: administrationGuidelinesSchema.array().optional(),
    medicineClassification: medicineClassificationSchema.array().optional(),
    packaging: packagingSchema.optional(),
    drugCharacteristic: drugCharacteristicSchema.array().optional(),
    contraindication: referenceSchema.array().optional(),
    regulatory: regulatorySchema.array().optional(),
    kinetics: kineticsSchema.array().optional(),
  }),
) satisfies ZodType<MedicationKnowledge>

export const medicationKnowledgeSchema: ZodType<MedicationKnowledge> =
  untypedMedicationKnowledgeSchema

export class FhirMedicationKnowledge extends FhirDomainResource<MedicationKnowledge> {
  // Static Functions

  public static parse(value: unknown): FhirMedicationKnowledge {
    return new FhirMedicationKnowledge(medicationKnowledgeSchema.parse(value))
  }
}
