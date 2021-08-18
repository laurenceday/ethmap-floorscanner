import { InfuraProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';

import { PRIVATE_KEY, INFURA_KEY } from './env_vars';

const provider = new InfuraProvider('mainnet', INFURA_KEY);

const key = Buffer.from(PRIVATE_KEY, 'hex');
const wallet = new Wallet(key, provider);

const ethmaps_addr = '0xB6bbf89c3DbBa20Cb4d5cABAa4A386ACbbAb455e';

const EthMapABI = require('./ethmap-abis/EthMap.json');

const EthConfig = require('./mapdetails.json');

let ethmap: Contract;

async function setup_ethmap() {
    ethmap = new Contract(ethmaps_addr, EthMapABI, wallet);
  }

async function get_floor() {
    
    const country_details = (EthConfig['objects']['world']['geometries']).map(x => [Number(x['properties']['id']), x['properties']['name']]);
    
    let country_map = new Map<Number, string>(country_details);
    
    console.log(country_map);
    
    let country_rec: object[] = [];
    
    await setup_ethmap();
    
    console.log("Wait a bit, just checking the various prices...");
    
    for (let i = 1; i <= 178; i++) {
        const details = await ethmap.getZone(i);

        const price = Number(details[2])/1e18;
        let zone_name = country_map.get(i);
        let zone_record = [i, zone_name, price];

        if (price == 0) {
            console.log("%s is not for sale", zone_name);
        }
        else {
            console.log("%s is selling for %d ETH", zone_name, price);
            country_rec.push(zone_record);
        }
    }
    
    console.log("\n");
    
    const sorted_countries = country_rec.sort((a, b) => (a[2] < b[2] ? 1 : -1));
    
    for (let ix in sorted_countries) {
        let asset_rec = sorted_countries[ix];
        console.log('%s [Zone %d] is selling for %d ETH', asset_rec[1], asset_rec[0], asset_rec[2])
    }
    
}

get_floor();

