const test = require('ava')
const { scaleLog } = require('d3-scale')
const { LogScale } = require('..')
const { rgbToHex } = require('../src/utils')

test('set domain', t => {
    let logD3 = scaleLog().domain([1, 10]).base(2)
    let log = new LogScale().domain([1, 10]).base(2)
    t.deepEqual(logD3.domain(), log.domain().toJS())
    logD3 = logD3.domain([20, 30])
    log = log.domain([20, 30])
    t.deepEqual(logD3.domain(), log.domain().toJS())
})

test('set range', t => {
    let logD3 = scaleLog().range([1, 10]).base(2)
    let log = new LogScale().range([1, 10]).base(2)
    t.deepEqual(logD3.range(), log.range().toJS())
    logD3 = logD3.range([20, 30])
    log = log.range([20, 30])
    t.deepEqual(logD3.range(), log.range().toJS())
})

test('scale output', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let logD3 = scaleLog().domain(domain).range(range).base(2)
    let log = new LogScale().domain(domain).range(range).base(2)
    domain.forEach(x => t.is(logD3(x), log.x(x)))
    range.forEach(y => t.is(logD3.invert(y), log.y(y)))

    range = ['#111111', '#00ff00']
    logD3 = scaleLog().domain(domain).range(range).base(2)
    log = new LogScale().domain(domain).range(range).base(2)
    domain.forEach(x => t.is(rgbToHex(logD3(x)), log.x(x)))
})

test('scale output negative', t => {
    let domain = [-10, -1]
    let range = [-40, -20]
    let logD3 = scaleLog().domain(domain).range(range).base(2)
    let log = new LogScale().domain(domain).range(range).base(2)
    domain.forEach(x => t.is(logD3(x), log.x(x)))
    range.forEach(y => t.is(logD3.invert(y), log.y(y)))
})

test('outofbounds not clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let logD3 = scaleLog().domain(domain).range(range).base(2)
    let log = new LogScale().domain(domain).range(range).base(2)
    t.is(logD3(20), log.x(20))
    t.is(logD3(-2), log.x(-2))
    t.is(logD3.invert(10), log.y(10))
    t.is(logD3.invert(44), log.y(44))
})

test('outofbounds clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let logD3 = scaleLog().domain(domain).range(range).clamp(true).base(2)
    let log = new LogScale().domain(domain).range(range).clamped(true).base(2)
    t.is(logD3(20), log.x(20))
    t.is(logD3(-23), log.x(-23))
    t.is(logD3.invert(10), log.y(10))
    t.is(logD3.invert(44), log.y(44))
})

test('ticks', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let logD3 = scaleLog().domain(domain).range(range).clamp(true).base(2)
    let log = new LogScale().domain(domain).range(range).clamped(true).base(2)
    t.deepEqual(logD3.ticks(), log.ticks().toJS())
    t.deepEqual(logD3.ticks(20), log.ticks(20).toJS(20))

    domain = [-40, -12]
    range = [-20, -4]
    logD3 = scaleLog().domain(domain).range(range).clamp(true).base(4)
    log = new LogScale().domain(domain).range(range).clamped(true).base(4)
    t.deepEqual(logD3.ticks(), log.ticks().toJS())
    t.deepEqual(logD3.ticks(20), log.ticks(20).toJS(20))
})

test('nice', t => {
    let domain = [3, 87]
    let range = [24, 44]
    let logD3 = scaleLog()
        .domain(domain)
        .range(range)
        .clamp(true)
        .nice()
        .base(2)
    let log = new LogScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .nice()
        .base(2)
    t.deepEqual(logD3.domain(), log.domain().toJS())
    t.deepEqual(logD3.range(), log.range().toJS(20))
    t.deepEqual(logD3.ticks(), log.ticks().toJS())
    t.deepEqual(logD3.ticks(20), log.ticks(20).toJS(20))
})
