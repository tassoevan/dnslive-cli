const {WalletClient} = require('hs-client');
const {Network} = require('hsd');
const network = Network.get('main');

const request = require('request');
const fs = require('fs');

let argv = process.argv;
let argc = process.argv.length;


(async () => {
  if(argc != 4 && argc != 5) {
    console.log("Syntax error: node dnslive.js <domain> <hsd apikey> <wallet name, default allison if you use bob>");
  }
  else {
    let wallet='allison';
    let domain = argv[2];
    let data = encodeURI(fs.readFileSync(argv[2]));
    let address = '';

    const walletOptions = {
      network: network.type,
      port: network.walletPort,
      apiKey: argv[3]
    }

    const client = new WalletClient(walletOptions);
    const wclient = client.wallet(wallet);

    if(argc==5)
      wallet=argv[4];
    result = await client.execute('getnameinfo', [ domain ]);
    if(result && result.owner.hash) {
      result = await wclient.getCoin(result.owner.hash, result.owner.index);
      if(result.address) {
        address=result.address
        result = await client.execute('signmessage', [address, data]);
        request('https://dns.live/dns/?zone='+domain+'&data='+data+'&sig='+result,function(err,res,body) {
          if(body.includes('?'))
            console.log("Error occurred: "+body);
          else
            console.log("Domain "+domain+" updated successfully. Please wait a few minutes for it to propogate.");
        });
      }
    }
  }
})();
