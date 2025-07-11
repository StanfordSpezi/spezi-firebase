//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'

type Full<T> = {
  [P in keyof T]-?: T[P]
}

export type AssertOutput<T extends ZodType, Output> =
  z.infer<T> extends Output ?
    Output extends z.infer<T> ?
      true
    : never
  : never

export type AssertOutputFull<T extends ZodType, Output> = AssertOutput<
  Full<T>,
  Full<Output>
>

export type Forward<S> =
  S extends BidirectionalSchema<infer Forward, any> ? Forward : never
export type Backward<S> =
  S extends BidirectionalSchema<any, infer Backward> ? Backward : never

export type Input<S> = z.input<Forward<S>>
export type Output<S> = z.output<Forward<S>>

export class BidirectionalSchema<
  Forward extends ZodType,
  Backward extends ZodType,
> {
  // Properties

  readonly forward: Forward
  readonly backward: Backward

  // Constructor

  private constructor(forward: Forward, backward: Backward) {
    this.forward = forward
    this.backward = backward
  }

  // Factory Functions

  static simple<Type extends ZodType>(
    schema: Type,
  ): BidirectionalSchema<Type, Type> {
    return new BidirectionalSchema(schema, schema)
  }

  static separate<
    Input extends object | string,
    Output extends object | string,
    Forward extends ZodType<Output, Input>,
    Backward extends ZodType<Input, Output>,
  >(
    forward: Forward,
    backward: Backward,
  ): BidirectionalSchema<Forward, Backward> {
    return new BidirectionalSchema(forward, backward)
  }

  // Methods

  decode<Input, Output>(
    this: BidirectionalSchema<ZodType<Output, Input>, ZodType<Input, Output>>,
    input: unknown,
  ): Output {
    return this.forward.parse(input)
  }

  encode<Input, Output>(
    this: BidirectionalSchema<ZodType<Output, Input>, ZodType<Input, Output>>,
    output: unknown,
  ): Input {
    return this.backward.parse(output)
  }
}

export function createBidirectionalSchema<Input, Output>(
  forward: ZodType<Output, Input>,
  backward: ZodType<Input, Output>,
) {
  return { forward, backward }
}
