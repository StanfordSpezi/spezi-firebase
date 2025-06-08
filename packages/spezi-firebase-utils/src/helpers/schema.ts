//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  UnknownKeysParam,
  z,
  ZodObject,
  ZodRawShape,
  ZodType,
  ZodTypeAny,
  ZodTypeDef,
} from 'zod'
import { Lazy } from './lazy.js'

export function optionalish<Forward extends ZodType, Backward extends ZodType>(
  schema: Schema<Forward, Backward>,
) {
  return schema.optionalish()
}

export type Forward<S> = S extends Schema<infer Forward, any> ? Forward : never
export type Backward<S> =
  S extends Schema<any, infer Backward> ? Backward : never

export type Input<S> = z.input<Forward<S>>
export type Output<S> = z.output<Forward<S>>

export type AugmentationInput<A extends Record<string, Schema<any, any>>> = {
  [K in keyof A]: Input<A[K]> extends undefined ? never : Input<A[K]>
} & {
  [K in keyof A]?: Input<A[K]> extends undefined ? Input<A[K]> : never
}

export type AugmentationOutput<A extends Record<string, Schema<any, any>>> = {
  [K in keyof A]: Output<A[K]> extends undefined ? never : Output<A[K]>
} & {
  [K in keyof A]?: Output<A[K]> extends undefined ? Output<A[K]> : never
}

export class Schema<Forward extends ZodType, Backward extends ZodType> {
  // Properties

  readonly forward: Lazy<Forward>
  readonly backward: Lazy<Backward>

  // Constructor

  private constructor(forward: Lazy<Forward>, backward: Lazy<Backward>) {
    this.forward = forward
    this.backward = backward
  }

  // Factory Functions

  static simple<Value, Type extends ZodType<Value, ZodTypeDef, Value>>(
    schema: Type,
  ): Schema<Type, Type> {
    return new Schema(new Lazy(() => schema), new Lazy(() => schema))
  }

  static separate<
    Input,
    Output,
    Forward extends ZodType<Output, ZodTypeDef, Input>,
    Backward extends ZodType<Input, ZodTypeDef, Output>,
  >(forward: Forward, backward: Backward): Schema<Forward, Backward> {
    return new Schema(new Lazy(() => forward), new Lazy(() => backward))
  }

  static composed<T extends Record<string, Schema<any, any>>>(value: T) {
    return new Schema(
      new Lazy(() =>
        z.object(
          Object.fromEntries(
            Object.entries(value).map(([key, schema]) => [
              key,
              schema.forward.value,
            ]),
          ) as { [K in keyof T]: T[K]['forward']['value'] },
        ),
      ),
      new Lazy(() =>
        z.object(
          Object.fromEntries(
            Object.entries(value).map(([key, schema]) => [
              key,
              schema.backward.value,
            ]),
          ) as { [K in keyof T]: T[K]['backward']['value'] },
        ),
      ),
    )
  }

  // Methods

  parse(input: unknown): Output<this> {
    return this.forward.value.safeParse(input)
  }

  encode(output: Output<this>): Input<this> {
    return this.backward.value.parse(output)
  }

  // Methods - Operators

  array() {
    return Schema.separate(
      this.forward.value.array(),
      this.backward.value.array(),
    )
  }

  extend<
    A extends Record<string, Schema<any, any>>,
    ForwardT extends ZodRawShape,
    ForwardUnknownKeys extends UnknownKeysParam,
    ForwardCatchall extends ZodTypeAny,
    BackwardT extends ZodRawShape,
    BackwardUnknownKeys extends UnknownKeysParam,
    BackwardCatchall extends ZodTypeAny,
    Output,
    Input,
  >(
    this: Schema<
      ZodObject<ForwardT, ForwardUnknownKeys, ForwardCatchall, Output, Input>,
      ZodObject<BackwardT, BackwardUnknownKeys, BackwardCatchall, Input, Output>
    >,
    augmentation: A,
  ) {
    return new Schema(
      new Lazy(() =>
        z.object({
          ...this.forward.value.shape,
          ...Object.fromEntries(
            Object.entries(augmentation).map(([k, v]) => [k, v.forward.value]),
          ),
        }),
      ),
      new Lazy(() =>
        z.object({
          ...this.backward.value.shape,
          ...Object.fromEntries(
            Object.entries(augmentation).map(([k, v]) => [k, v.backward.value]),
          ),
        }),
      ),
    )
  }

  optionalish(encodeAsNull: boolean = false) {
    return new Schema(
      new Lazy(() =>
        this.forward.value.or(z.null().transform(() => undefined)).optional(),
      ),
      new Lazy(() =>
        this.backward.value
          .optional()
          .transform((value) => value ?? (encodeAsNull ? null : undefined)),
      ),
    )
  }

  optionalishDefault(defaultValue: Output<this>) {
    return new Schema(
      new Lazy(() =>
        this.forward.value
          .or(z.null().transform(() => undefined))
          .optional()
          .transform((value) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value ?? defaultValue
          }),
      ),
      this.backward,
    )
  }
}
