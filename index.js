const requestPromise = require('request-promise');
const TelegramBot = require('node-telegram-bot-api');
const jsonImport = require('./config.json');

// APIs tokens
const telegramBotToken = jsonImport.telegramBotToken;
const coinMarketCapAPIToken = jsonImport.coinMarketCapAPIToken;

// List of crypto currencies to fetch
const coinList = jsonImport.cryptoCurrencyList;

// In which FIAT convert the price of the crypto coins
const fiat = jsonImport.convertToFiat[0];
const fiatSymbol = jsonImport.convertToFiat[1];

// Chat ID of Telegram
const chatID = jsonImport.telegramChatId;

// Create a new client with Telegram's API token
const client = new TelegramBot(telegramBotToken);

// Convert the provided list of crypto coins to the desidered format for coinmarketcap's API
function listToSymbols() {
    let symbol = '';
    for (let i = 0; i < coinList.length; i++) {
        symbol += coinList[i] + ',';
    }
    symbol = symbol.slice(0, -1);
    return symbol;
}

// request option for coinmarketcap's API. Read more here -> https://coinmarketcap.com/api/documentation/v1/
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
        symbol: listToSymbols(),
        convert: fiat,
    },
    headers: {
        'X-CMC_PRO_API_KEY': coinMarketCapAPIToken,
    },
    json: true,
    gzip: true,
};

// Execute request promise
requestPromise(requestOptions)
    .then((response) => {
        let responseMessage = [];
        // List through the list of crypto coins and get the price in the selected FIAT
        for (let i = 0; i < coinList.length; i++) {
            let coin = response.data[coinList[i]].quote;
            let price = coin[fiat].price;
            responseMessage.push(
                coinList[i] +
                    ' Price: ' +
                    price.toString().slice(0, 5) +
                    fiatSymbol
            );
        }
        // Send the list of crypto coin values through Telegram
        client.sendMessage(chatID, responseMessage.join('\n'));
    })
    // Check for coinmarketcap's API errors. Read more here -> https://coinmarketcap.com/api/documentation/v1/#section/Errors-and-Rate-Limits
    .catch((err) => {
        client.sendMessage(chatID, 'API call error:' + err.message);
    });
