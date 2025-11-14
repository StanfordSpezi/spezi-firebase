//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type z, type ZodType } from 'zod'

/**
 * Extract the forward schema type from a BidirectionalSchema
 */
export type Forward<S> = // eslint-disable-next-line @typescript-eslint/no-explicit-any
  S extends BidirectionalSchema<infer Forward, any> ? Forward : never

/**
 * Extract the backward schema type from a BidirectionalSchema
 */
export type Backward<S> = // eslint-disable-next-line @typescript-eslint/no-explicit-any
  S extends BidirectionalSchema<any, infer Backward> ? Backward : never

/**
 * Extract the input type from a schema
 */
export type Input<S> = z.input<Forward<S>>

/**
 * Extract the output type from a schema
 */
export type Output<S> = z.output<Forward<S>>

/**
 * A schema that supports bidirectional transformation between two types
 */
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

  /**
   * Create a bidirectional schema using the same schema for both directions
   * @param schema The schema to use for both forward and backward
   * @returns A bidirectional schema
   */
  static simple<Type extends ZodType>(
    schema: Type,
  ): BidirectionalSchema<Type, Type> {
    return new BidirectionalSchema(schema, schema)
  }

  /**
   * Create a bidirectional schema with separate forward and backward schemas
   * @param forward Schema for input to output transformation
   * @param backward Schema for output to input transformation
   * @returns A bidirectional schema
   */
  static separate<
    Input extends object | string,
    Output extends object | string,
    Forward extends ZodType<Output>,
    Backward extends ZodType<Input, Output>,
  >(
    forward: Forward,
    backward: Backward,
  ): BidirectionalSchema<Forward, Backward> {
    return new BidirectionalSchema(forward, backward)
  }

  // Methods

  /**
   * Decode input to output using the forward schema
   * @param input The input value to decode
   * @returns The decoded output value
   */
  decode<Input, Output>(
    this: BidirectionalSchema<ZodType<Output>, ZodType<Input, Output>>,
    input: unknown,
  ): Output {
    return this.forward.parse(input)
  }

  /**
   * Encode output to input using the backward schema
   * @param output The output value to encode
   * @returns The encoded input value
   */
  encode<Input, Output>(
    this: BidirectionalSchema<ZodType<Output>, ZodType<Input, Output>>,
    output: unknown,
  ): Input {
    return this.backward.parse(output)
  }
}

/**
 * Create a bidirectional schema with separate forward and backward schemas
 * @param forward Schema for input to output transformation
 * @param backward Schema for output to input transformation
 * @returns Object containing forward and backward schemas
 */
export function createBidirectionalSchema<Input, Output>(
  forward: ZodType<Output, Input>,
  backward: ZodType<Input, Output>,
) {
  return { forward, backward }
}
