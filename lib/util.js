'use strict'

const validBytes32 = /^0x[0-9a-z]{64}$/i

const isValidBytes32 = (hex) => {
  if (typeof hex !== 'string') throw new Error('validBytes32: invalid hex value')
  return validBytes32.test(hex)
}

const validAddress = /^(0x)?[0-9a-z]{40}$/i

const isValidAddress = (hex) => {
  if (typeof hex !== 'string') throw new Error('validAddress: invalid hex value')
  return validAddress.test(hex)
}

module.exports = {isValidAddress, isValidBytes32}
