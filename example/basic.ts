import { $ } from '../sigil.ts'

// Minimalistic creation syntax.

const u = $(0)

// Vertasile and minimalistic use.

console.log(u())
console.log(u(1))
console.log(u(u() + 1))
console.log($.map(u, i => i + 1))

// Wrap other variable containers.

function signal<T>(x: T): [$.Get<T>, $.Set<T>] {
  return [() => x, (y: T) => x = y]
}

const v = $.wrap(...signal(0))
console.log(v(), v(1))

// Narrow arguments to the read-only $.Get type.

function add(x: $<number>, y: $.Get<number>) {
  return $.map(x, x => x + y())
}

console.log(add(u, v))

// Use any type as inner value, including functions.

const f = $((i: number) => i + 1)
console.log(f()(2))
console.log(f(i => i + 2)(0))

// And even other variables.

const h = $(u)
console.log(h()(1))

// Lift to other variable types.

const g = $('1')
const g_ = $.lift(g)(Number, String)
console.log(g())
console.log(g_(0))
console.log(g())
