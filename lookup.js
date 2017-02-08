'use strict'

const co = require('co-express')
const boom = require('boom')
const {sha3} = require('@parity/parity.js').Api.util
const {isValidAddress, isValidBytes32} = require('./lib/util')
const api = require('./lib/api')
const lookup = require('lookup')(api)

module.exports = co(function* (req, res) {
  let data

  if (req.query.email || req.query.emailHash) {
    let emailHash
    if (req.query.email) {
      const email = req.query.email
      if (typeof email !== 'string' || email.indexOf('@') < 0) throw boom.badRequest('E-mail is invalid.')
      emailHash = sha3.text(email)
    } else {
      emailHash = req.query.emailHash
      if (!isValidBytes32(emailHash)) throw boom.badRequest('E-mail hash is invalid.')
    }

    try {
      data = yield lookup.byEmail(emailHash)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
  } else if (req.query.name) {
    const name = req.query.name
    if (typeof name !== 'string' || name.length === 0) throw boom.badRequest('Name is invalid.')

    try {
      data = yield lookup.byName(name)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
  } else if (req.query.address) {
    const address = req.query.address
    if (typeof address !== 'string' || !isValidAddress(address)) throw boom.badRequest('Address is invalid.')

    try {
      data = yield lookup.byAddress(address)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
  } else {
    throw boom.badRequest('Missing e-mail, name or address parameter.')
  }

  if (!data) throw boom.notFound('Could not find this account.')

  res.json(data)
})
