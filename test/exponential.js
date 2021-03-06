const test = require('ava')
const { scalePow } = require('d3-scale')
const { ExponentialScale } = require('..')

test('set domain', t => {
    let powerD3 = scalePow().domain([1, 10]).exponent(2)
    let power = new ExponentialScale().domain([1, 10]).exponent(2)
    t.deepEqual(powerD3.domain(), power.domain().toJS())
    powerD3 = powerD3.domain([20, 30])
    power = power.domain([20, 30])
    t.deepEqual(powerD3.domain(), power.domain().toJS())
})

test('set range', t => {
    let powerD3 = scalePow().range([1, 10]).exponent(2)
    let power = new ExponentialScale().range([1, 10]).exponent(2)
    t.deepEqual(powerD3.range(), power.range().toJS())
    powerD3 = powerD3.range([20, 30])
    power = power.range([20, 30])
    t.deepEqual(powerD3.range(), power.range().toJS())
})

test('scale output', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).exponent(2)
    let power = new ExponentialScale().domain(domain).range(range).exponent(2)
    domain.forEach(x => t.is(powerD3(x), power.x(x)))
    range.forEach(y => t.is(powerD3.invert(y), power.y(y)))

    range = ['#111111', '#00ff00']
    powerD3 = scalePow().domain(domain).range(range).exponent(2)
    power = new ExponentialScale().domain(domain).range(range).exponent(2)
    domain.forEach(x => t.is(powerD3(x), power.x(x)))
})

test('outofbounds not clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).exponent(2)
    let power = new ExponentialScale().domain(domain).range(range).exponent(2)
    t.is(powerD3(20), power.x(20))
    t.is(powerD3(-2), power.x(-2))
    t.is(powerD3.invert(10), power.y(10))
    t.is(powerD3.invert(44), power.y(44))
})

test('outofbounds clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).clamp(true).exponent(2)
    let power = new ExponentialScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .exponent(2)
    t.is(powerD3(20), power.x(20))
    t.is(powerD3(-23), power.x(-23))
    t.is(powerD3.invert(10), power.y(10))
    t.is(powerD3.invert(44), power.y(44))
})

test('ticks', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).clamp(true).exponent(2)
    let power = new ExponentialScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .exponent(2)
    t.deepEqual(powerD3.ticks(), power.ticks().toJS())
    t.deepEqual(powerD3.ticks(20), power.ticks(20).toJS(20))
})

test('nice', t => {
    let domain = [3, 87]
    let range = [24, 44]
    let powerD3 = scalePow()
        .domain(domain)
        .range(range)
        .clamp(true)
        .nice()
        .exponent(2)
    let power = new ExponentialScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .nice()
        .exponent(2)
    t.deepEqual(powerD3.domain(), power.domain().toJS())
    t.deepEqual(powerD3.range(), power.range().toJS(20))
    t.deepEqual(powerD3.ticks(), power.ticks().toJS())
    t.deepEqual(powerD3.ticks(20), power.ticks(20).toJS(20))
})
