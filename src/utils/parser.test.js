/* eslint-disable */
var { parseNumber } = require('./parser')

describe('parser.js', () => {
  describe('#parse', () => {
    describe('Correct types', () => {
      it('Should parse numbers', () => {
        let object = parseNumber(10)

        expect(typeof object.value).toBe('number')
        expect(typeof object.type).toBe('string')

        expect(object.value).toEqual(10)
        expect(object.type).toEqual('px')
      })

      it('Should parse strings', () => {
        let object = parseNumber('10')

        expect(typeof object.value).toBe('number')
        expect(typeof object.type).toBe('string')

        expect(object.value).toEqual(10)
        expect(object.type).toEqual('px')
      })

      it ('Should parse "auto" string, auto => {type: "auto", value: 0}', () => {
        let object = parseNumber('auto')

        expect(object.value).toEqual(0)
        expect(object.type).toEqual('auto')
      })

      it ('Should parse wrong types', () => {
        let nullValue = parseNumber(null)
        let booleanValue = parseNumber(false)

        expect(nullValue.value).toEqual(null)
        expect(nullValue.type).toEqual('')

        expect(booleanValue.value).toEqual(false)
        expect(booleanValue.type).toEqual('')
      })
    })

    describe('Parsing suffixed string', () => {
      it ('Should parse "px"', () => {
        let object = parseNumber('10px')

        expect(object.value).toEqual(10)
        expect(object.type).toEqual('px')
      })

      it ('Should parse "%"', () => {
        let object = parseNumber('10%')

        expect(object.value).toEqual(10)
        expect(object.type).toEqual('%')
      })

      it ('Should not parse "%px"', () => {
        let object = parseNumber('10%px')

        expect(typeof object.value).toBe('string')
        expect(object.type).toEqual('')
      })
    })
  })
})
