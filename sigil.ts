const NONE = Symbol('none')
export type None = typeof NONE

// === Type ===

namespace $ {
  export type Get<T> = () => T
  export type Set<T> = (x: T) => T
  export type Var<T> = Get<T> & Set<T>
}

export type $<T> = $.Var<T>
type Arg<T> = None | T

// === Create ===

function variable<T>(x: T): $<T> {
  return function (a: Arg<T> = NONE) {
    return a === NONE ? x : x = a
  }
}

function $<T>(): $.Var<T | undefined>;
function $<T>(initial_value: T): $.Var<T>;
function $<T>(initial_value: None | T = NONE) {
  return variable(initial_value === NONE ? undefined : initial_value)
}

// === Tools ===

namespace $ {
  export function wrap<T>(get: Get<T>, set: Set<T>): Var<T> {
    return function (a: Arg<T> = NONE) {
      return a === NONE ? get() : set(a)
    }
  }

  export function map<T>(x: Var<T>, f: (x: T) => T): T {
    return x(f(x()))
  }

  export function lift<U>(u: Var<U>) {
    return function <V>(f: (x: U) => V, f_inv: (y: V) => U): Var<V> {
      return function (a: Arg<V> = NONE) {
        if (a === NONE) {
          return f(u())
        } else {
          u(f_inv(a))
          return a
        }
      }
    }
  }
}

export { $ }
