const Im = require('immutable')

const ScaleRecord = Im.Record({
    _domain: Im.List(),
    _range: Im.List(),
    _rounded: false,
    _clamped: false,
    _exponent: 1,
    _base: 10
})

class Record extends ScaleRecord {
    domain(newDomain) {
        if (!newDomain) {
            return this._domain
        }
        return this.set('_domain', Im.List(newDomain))
    }
    range(newRange) {
        if (!newRange) {
            return this._range
        }
        return this.set('_range', Im.List(newRange))
    }
    rounded(shouldRound) {
        if (shouldRound === undefined) {
            return this._rounded
        }
        return this.set('_rounded', shouldRound)
    }
    clamped(shouldClamp) {
        if (shouldClamp === undefined) {
            return this._clamped
        }
        return this.set('_clamped', shouldClamp)
    }
    exponent(newExponent) {
        if (newExponent === undefined) {
            return this._exponent
        }
        return this.set('_exponent', newExponent)
    }
    base(newBase) {
        if (newBase === undefined) {
            return this._base
        }
        return this.set('_base', newBase)
    }
}

module.exports = Record
