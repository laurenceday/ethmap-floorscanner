import { InfuraProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';

import { PRIVATE_KEY, INFURA_KEY } from './env_vars';

const provider = new InfuraProvider('mainnet', INFURA_KEY);

const key = Buffer.from(PRIVATE_KEY, 'hex');
const wallet = new Wallet(key, provider);

const weicards_addr = '0x7F57292bF494A8c9342d37395D1378A65D59C499';

const WeiCardABI = require('./ethmap-abis/WeiCard.json');

let weicards: Contract;

async function setup_weicards() {
    weicards = new Contract(weicards_addr, WeiCardABI, wallet);
  }

async function get_floor() {
    
    let card_rec: object[] = [];
    
    await setup_weicards();
    
    console.log("Wait a bit, just checking the various prices...");
    
    for (let i = 1; i <= 100; i++) {
        const details = await weicards.getCardDetails(i);

        const price = Number(details[1])/1e18;
        let card_record = [i, price];

        if (details[4] == false) {
            console.log("Card %d is not for sale", i);
        }
        else {
            console.log("Card %d is selling for %d ETH", i, price);
            card_rec.push(card_record);
        }
    }
    
    console.log("\n");
    
    const sorted_cards = card_rec.sort((a, b) => (a[1] < b[1] ? 1 : -1));
    
    for (let ix in sorted_cards) {
        let asset_rec = sorted_cards[ix];
        console.log('Card %d is selling for %d ETH', asset_rec[0], asset_rec[1])
    }
    
}

get_floor();

