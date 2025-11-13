//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * ResearchStudy Status
 * http://hl7.org/fhir/ValueSet/research-study-status
 */
export const researchStudyStatusSchema = z.enum([
  'active',
  'administratively-completed',
  'approved',
  'closed-to-accrual',
  'closed-to-accrual-and-intervention',
  'completed',
  'disapproved',
  'in-review',
  'temporarily-closed-to-accrual',
  'temporarily-closed-to-accrual-and-intervention',
  'withdrawn',
])

/**
 * ResearchStudy Status
 * http://hl7.org/fhir/ValueSet/research-study-status
 */
export type ResearchStudyStatus = z.infer<typeof researchStudyStatusSchema>

/**
 * ResearchStudy Phase
 * http://hl7.org/fhir/ValueSet/research-study-phase
 */
export const researchStudyPhaseSchema = z.enum([
  'n-a',
  'early-phase-1',
  'phase-1',
  'phase-1-phase-2',
  'phase-2',
  'phase-2-phase-3',
  'phase-3',
  'phase-4',
])

/**
 * ResearchStudy Phase
 * http://hl7.org/fhir/ValueSet/research-study-phase
 */
export type ResearchStudyPhase = z.infer<typeof researchStudyPhaseSchema>

/**
 * ResearchStudy Objective Type
 * http://hl7.org/fhir/ValueSet/research-study-objective-type
 */
export const researchStudyObjectiveTypeSchema = z.enum([
  'primary',
  'secondary',
  'exploratory',
])

/**
 * ResearchStudy Objective Type
 * http://hl7.org/fhir/ValueSet/research-study-objective-type
 */
export type ResearchStudyObjectiveType = z.infer<
  typeof researchStudyObjectiveTypeSchema
>
