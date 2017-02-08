'use strict'

const {Api} = require('@parity/parity.js')
const config = require('config')

const api = new Api(new Api.Transport.Http('http://' + config.parity.host))
api.transport._connectTimeout = -1

module.exports = api
