# [Parity](https://ethcore.io/parity.html) lookup service

**Lookup details on Ethereum addresses**, find them by name, or e-mail. Check out [lookup-service-ui](https://github.com/ethcore/lookup-service-ui) for a GUI.

The service is free to use at `https://id.parity.io/` (mainnet) and `https://id.parity.io:8443/` (testnet).

[![Join the chat at https://gitter.im/ethcore/parity][gitter-image]][gitter-url] [![GPLv3][license-image]][license-url]

[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/ethcore/parity
[license-image]: https://img.shields.io/badge/license-GPL%20v3-green.svg
[license-url]: https://www.gnu.org/licenses/gpl-3.0.en.html

## Installation

```shell
git clone https://github.com/ethcore/lookup-service.git
cd lookup-service
npm install --production
```

1. Create a config file `config/<env>.json`, which partially overrides `config/default.json`.
2. `env NODE_ENV=<env> node index.js`

## API

You can lookup an address using the e-mail it has been verified with.

```http
GET /?email=jannis@ethcore.io
GET /?emailHash=0xc39c668305a16c70e893541650fffc6504f45c94a1f7f8ebe21dc62f7462f9a9
```

Use [`SimpleRegistry.sol`](https://github.com/ethcore/contracts/blob/c4f40b6/SimpleRegistry.sol) to find an address by name.

```http
GET /?name=derhuerst
```

Or use the address directly.

```http
GET /?address=0x00d189b71e5b42a88aa3e83173d4a6926e665336
```

The result will look like this.

```js
{
  "address": "0x00d189b71e5b42a88aa3e83173d4a6926e665336",
  "name": "derhuerst",
  "badges": [
    {
      "id": 0,
      "address": "0x01e1a37118fe3befd17c426fa962cff2c9099835",
      "name": "smsverification",
      "title": "sms verified",
      "img": "https://raw.githubusercontent.com/ethcore/dapp-assets/1b1beb5/certifications/sms-verification.svg"
    },
    // …
  ],
  "tokens": [
    {
      "TLA": "ETH",
      "name": "Ether",
      "base": "1000000000000000000",
      "img": "https://raw.githubusercontent.com/ethcore/parity/1e6a2cb/js/assets/images/contracts/ethereum-black-64x64.png",
      "balance": "987.264418979418313684"
    },
    // …
  ]
}
```
