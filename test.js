'use strict';

const test = require('tape')
    , psig = require('.')

test('is', function (t) {
  t.is(psig.is(Buffer('PE\0\0')), true)
  t.is(psig.is(Buffer('NE\0\0')), false)
  t.is(psig.is(Buffer('PE\0\0x')), false)
  t.is(psig.is(Buffer('PE')), false)

  t.is(psig.is(Buffer('xxxPE\0\0')), false)
  t.is(psig.is(Buffer('xxxPE\0\0'), 3), true)

  t.end()
})

test('has', function (t) {
  t.is(psig.has(Buffer('PE\0\0')), true)
  t.is(psig.has(Buffer('NE\0\0')), false)
  t.is(psig.has(Buffer('PE\0\0x')), true)
  t.is(psig.has(Buffer('PE')), false)

  t.is(psig.has(Buffer('xxxPE\0\0')), false)
  t.is(psig.has(Buffer('xxxPE\0\0'), 3), true)
  t.is(psig.has(Buffer('xxxPE\0\0xxx'), 3), true)

  t.end()
})

test('exports length', function (t) {
  t.is(psig.length, 4)
  t.end()
})
