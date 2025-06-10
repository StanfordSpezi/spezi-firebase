//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { core, z, ZodObject, ZodRawShape, ZodType } from 'zod/v4'
import { Lazy } from './lazy.js'
import { util } from 'zod/v4/core'

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

  static simple<Type extends ZodType>(schema: Type): Schema<Type, Type> {
    return new Schema(new Lazy(() => schema), new Lazy(() => schema))
  }

  static separate<
    Input,
    Output,
    Forward extends ZodType<Output, Input>,
    Backward extends ZodType<Input, Output>,
  >(forward: Forward, backward: Backward): Schema<Forward, Backward> {
    return new Schema(new Lazy(() => forward), new Lazy(() => backward))
  }

  static composed<T extends Record<string, Schema<any, any>>>(
    augmentation: T,
    params?: string | core.$ZodObjectParams,
  ) {
    return new Schema(
      new Lazy(() => {
        const shape = forwardAugmentation(augmentation)
        return new ZodObject({
          type: 'object',
          get shape(): any {
            util.assignProp(this, 'shape', {
              ...shape,
            })
            return this.shape
          },
          ...util.normalizeParams(params),
        })
      }),
      new Lazy(() => {
        const shape = backwardAugmentation(augmentation)
        return new ZodObject({
          type: 'object',
          get shape(): any {
            util.assignProp(this, 'shape', {
              ...shape,
            })
            return this.shape
          },
          ...util.normalizeParams(params),
        })
      }),
    )
  }

  // Methods

  parse(input: unknown): Output<this> {
    return this.forward.value.parse(input)
  }

  encode(output: Output<this>): Input<this> {
    return this.backward.value.parse(output) as Input<this>
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
    ForwardShape extends ZodRawShape,
    ForwardConfig extends z.core.$ZodObjectConfig,
    BackwardShape extends ZodRawShape,
    BackwardConfig extends z.core.$ZodObjectConfig,
  >(
    this: Schema<
      ZodObject<ForwardShape, ForwardConfig>,
      ZodObject<BackwardShape, BackwardConfig>
    >,
    augmentation: A,
  ) {
    return new Schema(
      new Lazy(() =>
        z.object({
          ...this.forward.value.shape,
          ...forwardAugmentation(augmentation),
        }),
      ),
      new Lazy(() =>
        z.object({
          ...this.backward.value.shape,
          ...backwardAugmentation(augmentation),
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

  // Helpers
}

function forwardAugmentation<A extends Record<string, Schema<any, any>>>(
  value: A,
): { [K in keyof A]: Forward<A[K]> } {
  const result: any = {}
  const descriptors = Object.getOwnPropertyDescriptors(value)

  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (typeof descriptor.get === 'function') {
      Object.defineProperty(result, key, {
        get() {
          const schema = descriptor.get!.call(value)
          return z.lazy(() => schema.forward.value)
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
      })
    } else {
      Object.defineProperty(result, key, {
        value: descriptor.value.forward.value,
        writable: descriptor.writable,
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
      })
    }
  }

  return result as { [K in keyof A]: Forward<A[K]> }
}

function backwardAugmentation<A extends Record<string, Schema<any, any>>>(
  value: A,
): { [K in keyof A]: Backward<A[K]> } {
  const result: any = {}
  const descriptors = Object.getOwnPropertyDescriptors(value)

  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (typeof descriptor.get === 'function') {
      Object.defineProperty(result, key, {
        get() {
          const schema = descriptor.get!.call(value)
          return z.lazy(() => schema.backward.value)
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
      })
    } else {
      Object.defineProperty(result, key, {
        value: descriptor.value.backward.value,
        writable: descriptor.writable,
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
      })
    }
  }

  return result as { [K in keyof A]: Backward<A[K]> }
}
