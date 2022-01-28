#!/usr/bin/env node

const axios = require('axios');
const argv = require('yargs')(process.argv.slice(2))
  .usage('Usage: $0 <quantity> <from> <to>')
  .demandCommand(3)
  .help('h')
  .alias('h', 'help')
  .argv;


const [ quantity, from, to ] = argv._;

const coinMarketCapKey = process.env.COINMARKETCAP_API_KEY;


const convert = async (quantity, from, to) => {

  const q = Number(quantity);
  const f = from.toUpperCase();
  const t = to.toUpperCase();

  try {
    const { data } = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${f}&convert=${t}`, {
      headers: {
        'X-CMC_PRO_API_KEY': coinMarketCapKey,
      },
    });

    const price = data.data[f].quote[t].price * q;
    const priceFormatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format(price);

    console.log(`Result: ${q} ${f} ==> ${priceFormatted} ${t}`);
  } catch (error) {
    console.error(error);
  }
}

convert(quantity, from, to);
