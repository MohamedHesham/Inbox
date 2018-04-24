const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//instance of Web3
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';
//testing
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
  .send({from: accounts[0], gas: '1000000'});
  //inbox.setProvider(provider);
});

describe('inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async() => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi There!')
  });

  it('can change the message', async () => {
    const tx_hash =  await inbox.methods.setMessage('Bye There!').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    console.log(tx_hash);
    assert.equal(message, 'Bye There!');
  });
});
