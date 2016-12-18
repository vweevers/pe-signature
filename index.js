'use strict';

exports.length = 4
exports.has = hasPESignature
exports.is = isPESignature

function hasPESignature (buf, offset) {
  offset = offset || 0

  return buf.length - offset >= 4
      && buf[offset + 0] === 80 // P
      && buf[offset + 1] === 69 // E
      && buf[offset + 2] ===  0 // null
      && buf[offset + 3] ===  0 // null
}

function isPESignature (buf, offset) {
  offset = offset || 0

  if (buf.length - offset !== 4) return false
  else return hasPESignature(buf, offset)
}
