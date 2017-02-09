'use strict'

const express = require('express')
const corser = require('corser')
const noCache = require('nocache')()
const config = require('config')
const http = require('http')

const nodeIsSynced = require('./lib/node-is-synced')
const nrOfPeers = require('./lib/nr-of-peers')
const lookup = require('./lookup')

const api = express()
module.exports = api

// CORS
const allowed = corser.simpleRequestHeaders.concat(['User-Agent'])
api.use(corser.create({requestHeaders: allowed}))

api.get('/health', noCache, (req, res, next) => {
  Promise.all([
    nodeIsSynced(),
    nrOfPeers()
  ])
  .catch(() => [false, 0])
  .then(([isSynced, nrOfPeers]) => {
    res.status(isSynced && nrOfPeers > 0 ? 200 : 500).end()
  })
})

api.get('/', noCache, lookup)

api.use((err, req, res, next) => {
  if (res.headersSent) return next()
  console.error(err.stack)
  if (err.isBoom) err = err.output.payload

  return res
  .status(err.statusCode || 500)
  .json({status: 'error', message: err.message})
})

http.createServer(api)
  .listen(config.http.port, (err) => {
    if (err) return console.error(err)
    console.info(`Listening on ${config.http.port}.`)
  })
