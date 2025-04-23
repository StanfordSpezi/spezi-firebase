//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './page'

describe('Home Component', () => {
  it('renders the Spezi Firebase Remote Notifications heading', () => {
    render(<Home />)

    const headingElement = screen.getByText(
      /Welcome to the Spezi Firebase Remote Notifications/i,
    )

    expect(headingElement).toBeInTheDocument()
  })

  it('renders the Stanford Biodesign Logo', () => {
    render(<Home />)

    const imageElement: HTMLImageElement = screen.getByAltText(
      'Stanford Biodesign Logo',
    )

    expect(imageElement).toBeInTheDocument()
    expect(imageElement.src).toContain('stanfordbiodesign.png')
  })
})
