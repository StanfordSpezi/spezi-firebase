//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR ExampleScenarioActorType value set.
 * The type of actor in an example scenario.
 */
export const exampleScenarioActorTypeSchema = z.enum(['person', 'entity'])

/**
 * TypeScript type for FHIR ExampleScenarioActorType value set.
 */
export type ExampleScenarioActorType = z.infer<
  typeof exampleScenarioActorTypeSchema
>
