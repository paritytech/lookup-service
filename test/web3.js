'use strict'

const Web3 = require('web3')
const TestRpc = require('ethereumjs-testrpc')

const web3 = new Web3(TestRpc.provider({
  total_accounts: 1,
  network_id: '0x3',
  unlocked_accounts: [0]
}))

module.exports = web3
