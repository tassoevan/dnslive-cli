# dnslive
## Quick and simple zone hosting for your Handshake Naming System (HNS) Top Level Domain (TLD)
Simply provide a signature of the zonefile created with the key associated with ownership of the domain to authenticate.

After you setup your zone, you can host your website with [DNS Live Free Web Hosting](https://github.com/realrasengan/dnslive-webhost).

This should not be used for production quality websites/DNS but is great for personal use!  For more info see [dns.live](https://dns.live) or join #dnslive on Freenode.

### Install
```
git clone https://github.com/realrasengan/dnslive-cli
cd dnslive-cli
npm install request
```

### Use
#### Please note, the zonefile filename must be the same as your domain.  So if your domain is 'jack' then call the zonefile 'jack'

1. Set name resource records in Bob (Domain Manager -> Domain -> Records) to:
```
NS ns1.dns.live.
NS ns2.dns.live.
NS ns3.dns.live.
```

2. Get your API key from Bob Wallet  (Settings -> copy HSD API Key)

3.
```
node dnslive-easy.js zonefile hsd-apikey
```
or
```
node dnslive-easy.js zonefile hsd-apikey walletname
```
The default wallet name is 'allison'.

#### Manual Use
Alternatively, you can manually generate the signature with the steps below:
```
node dnslive.js zonefile signature-of-zonefile
```
#### Example of full commands to get up and going (assumes [Bob Wallet by Kyokan](https://github.com/kyokan/bob-wallet))
1. Set name resource records in Bob or hsd with update.
2. Write down the name of the address that owns the domain.
3. Get your API key from Bob.
4. Use hs-client and type this in to select the proper wallet in Bob or your other wallet.
```
./hsw-rpc selectwallet allison --api-key=APIKEY_FROM_HSD
```
5. Type this command and save the signature result -- you'll need it for the final update, it is a signature.  
```
./hsw-rpc signmessage ADDRESS_THAT_OWNS_DOMAIN `node /path/to/dnslive-cli/urlencode.js /path/to/dnslive-cli/zonefile` --api-key=<API KEY from step 3>
```
6. Go to the /path/to/dnslive-cli directory
```
node dnslive.js <zone file> <signature from step 8>
```
7. Done.

### Copyright
Copyright (c) 2020 The Handshake Community

MIT Licensed.

