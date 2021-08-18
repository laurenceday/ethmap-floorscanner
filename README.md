# ethmap-floorscanner

Scripts for listing the available [EthMap](https://willdn.github.io/ETHMap/#/) countries and [WeiCards](https://willdn.github.io/weicards/#/), ranked in order of descending price.

*Last Update: 18 August 2021*

## Current Status

Clone this, add some config variables. Run it. I ain't updating this further.

## Prerequisites

`yarn` (through `npm`: https://classic.yarnpkg.com/en/docs/install)

## Setup

Run `yarn install` in the main directory.

Put these two things in env_vars.ts:

* The `PRIVATE_KEY` (sans leading 0x) for a wallet (any wallet) from, and
* The `INFURA_KEY` that allows you read on-chain data from Infura

If you don't have an Infura API key, here's how to get one: https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f

I advise creating a new wallet and using the private key for that so as to not risk your funds.

## Execution

`ts-node get_ethmap_floor.ts` or
`ts-node get_weicard_floor.ts`

That's it. 

## In Action

![image](https://user-images.githubusercontent.com/36096924/129740921-e033f0ff-2399-479c-9cd9-951724544e85.png)

![image](https://user-images.githubusercontent.com/36096924/129740982-18eb87a8-f995-4747-9caf-e7331643ec19.png)

