'use strict'

module.exports = {
  http: {
    port: 8443,
    cert: './self-signed.cert.pem',
    key: './self-signed.key.pem'
  },
  registryAddress: '0x81a4b044831c4f12ba601adb9274516939e9b8a2',
  badgeRegAddress: '0xcF5A62987294fd2087252FD812443508528C52bF',
  tokenRegAddress: '0x7Ae6d608CD96f5D34eD989211de85d7de1a31585',
  parity: {
    location: 'https://ethcore-testing-node.jannisr.de:443',
    user: 'travis',
    password: process.env.PASSWORD
  }
}