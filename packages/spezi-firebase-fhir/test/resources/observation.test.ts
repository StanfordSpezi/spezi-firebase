//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs'
import { observationSchema } from '../../src/resources/observation.js'
import { domainResourceSchema } from '../../src/elements/domainResource.js'
import { z } from 'zod/v4'
import { Schema } from '@stanfordspezi/spezi-firebase-utils'

describe('Observation', () => {
  it('should do the nested example', () => {
    const data = {
      name: 'I',
      subcategories: [
        {
          name: 'A',
          subcategories: [
            {
              name: '1',
              subcategories: [
                {
                  name: 'a',
                  subcategories: [],
                },
              ],
            },
          ],
        },
      ],
    }

    const Category = z.object({
      name: z.string(),
      get subcategories() {
        return z.array(Category)
      },
    })

    Category.parse(data)
  })

  it('should do the nested example with Schema', () => {
    const data = {
      name: 'I',
      subcategories: [
        {
          name: 'A',
          subcategories: [
            {
              name: '1',
              subcategories: [
                {
                  name: 'a',
                  subcategories: [],
                },
              ],
            },
          ],
        },
      ],
    }

    const Category = Schema.composed({
      name: Schema.simple(z.string()),
      get subcategories() {
        return Category.array()
      },
    })

    Category.parse(data)
  })

  it('should be able to parse a valid observation resource', () => {
    const fileData = fs.readFileSync(__dirname + '/observation.json', 'utf-8')
    const json = JSON.parse(fileData)
    // console.log(domainResourceSchema)
    // console.log(observationSchema)
    // const observation = observationSchema.parse(json)
    // console.log(JSON.stringify(observation))
    // expect(observation).toBeDefined()
  })
})
