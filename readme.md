# pe-signature

**Test if buffer is a [PE](https://en.wikipedia.org/wiki/Portable_Executable) signature. As specified by [Microsoft PE and COFF Specification 9.3](https://download.microsoft.com/download/9/c/5/9c5b2167-8017-4bae-9fde-d599bac8184a/pecoff_v83.docx) <sup>[doc]</sup>, section 3.2:**

> After the MS-DOS stub, at the file offset specified at offset `0x3c`, is a 4-byte signature that identifies the file as a PE format image file. This signature is `PE\0\0` (the letters "P" and "E" followed by two null bytes).

[![npm status](http://img.shields.io/npm/v/pe-signature.svg?style=flat-square)](https://www.npmjs.org/package/pe-signature) [![node](https://img.shields.io/node/v/pe-signature.svg?style=flat-square)](https://www.npmjs.org/package/pe-signature) [![Travis build status](https://img.shields.io/travis/vweevers/pe-signature.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/pe-signature) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/pe-signature.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/pe-signature) [![Dependency status](https://img.shields.io/david/vweevers/pe-signature.svg?style=flat-square)](https://david-dm.org/vweevers/pe-signature)

## usage

```js
const psig = require('pe-signature')

const a = Buffer('PE\0\0')
const b = Buffer('PE\0\0xxx')
const c = Buffer('xxxPE\0\0')

console.log(psig.is(a))    // true
console.log(psig.is(b))    // false
console.log(psig.has(b))   // true
console.log(psig.is(c, 3)) // true
```

## related

Use [pe-signature-offset](https://github.com/vweevers/pe-signature-offset) to get the position of the signature in a PE file:

```js
const open = require('fs-maybe-open')
    , getOffset = require('pe-signature-offset')
    , fs = require('fs')
    , len = psig.length

function isPEFile (fdOrFile, done) {
  open(fdOrFile, 'r', function (err, fd, close) {
    if (err) return done(err)

    getOffset(fd, function (err, offset) {
      if (err) return close(done, err)

      fs.read(fd, Buffer(len), 0, len, offset, function (err, bytesRead, buf) {
        if (err) return close(done, err)

        close(done, null, psig.is(buf))
      })
    })
  })
}

isPEFile('chrome.exe', function (err, is) {
  if (err) throw err
  console.log(is) // true
})
```

## install

With [npm](https://npmjs.org) do:

```
npm install pe-signature
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers
