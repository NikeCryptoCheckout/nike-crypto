// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      network_id: 3,
			host: "localhost",
			port:  8545,
			gas: 4712388,
			gasPrice: 100000000000
    }
  }
}
