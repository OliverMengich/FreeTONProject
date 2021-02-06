const {TONClient} = require('ton-client-node-js');
const contractPackage = require('./CampaignContract.js');

const giverAddress = '0:8bce16c4b0ac026a08911540f28d37e8cca1a6d74196f4f9865f48850437ca01';
// giver ABI on NodeSe
const giverAbi = {
  'ABI version':'1',
  functions:[
     {
        name: 'constructor',
	inputs: [
	   {name:'minimum',type:'uint256'},
	   {name:'creator',type:'address'}],
	  outputs: []
     },
     {
	name: 'approveRequest',
	inputs: [
	    {name:'index',type:'uint256'}],
	outputs: []
     },
     {
	name: 'Contribute',
	inputs: [],
	outputs: []
     },
     {
	 name: 'finalizeRequest',
         inputs: [
	    {name:'index',type:'uint256'}],
         outputs: []
     },
     {
         name: 'manager',
         inputs: [],
	 outputs: [{name:'manager','type':'address'}]
      },
      {
	name: 'minimumContribution',
	inputs: [],
	outputs: [{name:'minimumContribution',type:'uint256'}]
      },
      {
	 name: 'approvers',
	 inputs: [],
	 outputs": [{"name":"approvers","type":"map(address,bool)"}]
      },
      {
	 name: 'approversCount',
	 inputs: [],
	 outputs": [{name:'approversCount',type: uint256}]
      }
  ],
  events: [],
  data: [],
};
async function get_grams_from_giver(client, account) {
    const { contracts } = client;
    await contracts.run({
        address: giverAddress,
        functionName: 'constructor',
        abi: giverAbi,
        input: {
            dest: account,
            amount: 10_000_000_000,
        },
        keyPair: null,
    });
};
async function main(client) {
    // Generating public and secret key pairs
    const helloKeys = await client.crypto.ed25519Keypair();

    // Future Hello contract address
    const futureAddress = (await client.contracts.getDeployData({
        abi: contractPackage.abi,
        imageBase64: contractPackage.imageBase64,
        publicKeyHex: helloKeys.public,
        workchainId: 0,
    })).address;

    console.log(`Future address of the contract will be: ${futureAddress}`);

    // Requesting contract deployment funds form a local TON OS SE giver
    // not suitable for other networks
    await get_grams_from_giver(client, futureAddress);
    console.log(`Grams were transfered from giver to ${futureAddress}`);

    // Contract deployment
    const helloAddress = (await client.contracts.deploy({
        package: contractPackage,
        constructorParams: {},
        keyPair: helloKeys,
    })).address;

    console.log(`Hello contract was deployed at address: ${helloAddress}`);

    let response = await client.contracts.run({
        address: helloAddress,
        abi: contractPackage.abi,
        functionName: 'touch',
        input: {},
        keyPair: null, // there is no pubkey key check in the contract so we can leave it empty. Dangerous to lost all account balance because  
        //anyone can call this function
    });
    console.log('Сontract run transaction with output', response.output, ', ', response.transaction.id);

    response = await client.contracts.runLocal({
        address: helloAddress,
        abi: contractPackage.abi,
        functionName: 'sayHello',
        input: {},
        keyPair: null, 
    });
    console.log('Contract reacted to your sayHello', response.output);
}

(async () => {
    try {
        const client = await TONClient.create({
            servers: ['http://localhost'],
        });
        console.log("Hello localhost TON!");
        await main(client);
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();