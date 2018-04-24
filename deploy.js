const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'artwork rice cancel any raven pizza thought chalk pupil grow local party',
  'https://rinkeby.infura.io/zNYG6R4VpzdApW12U2wV'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('This is the Account Will be used to Deploy the contract: ',accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Hi There!']})
  .send( { gas: '1000000', from: accounts[0] });

  console.log('Contract Deployed to the Address: ', result.options.address);
};
deploy();
