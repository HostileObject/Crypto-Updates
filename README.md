# Crypto-Updates
Custom script to use both Telegram's and CoinMarketCap's APIs to get the latest Crypto-to-FIAT prices.

# Install Guide
To use this script you'll need some programs installed and accounts in both Telegram and CoinMarketCap.

To get a ```Telegram``` API token follow this instructions -> [telegram.org](https://core.telegram.org/bots)

To get a ```CoinMarketCap``` API token follow this instructions -> [coinmarketcap.com](https://coinmarketcap.com/api/documentation/v1/#section/Introduction)

You also need to have installed ```nodejs``` and ```npm```.

First, clone the repository, then enter the project's directory and run ```npm i```.

Now we need to edit ```config.json```.
In the file there are some defaults parameters that can be edited consulting the CoinMarketCap API's documentation.

A complete config.json may look similar to this:
```json
{
	"telegramBotToken": "0123456789:ABCDEFGHIJKLMNOPQRSTUVZ0123456789",
	"coinMarketCapAPIToken": "0A1B2C3D-4E5F-6G7H-8I9J-10K11L12M",
	"cryptoCurrencyList": ["BTC", "ETH", "BNB"],
	"telegramChatId": "012345678",
	"convertToFiat": ["USD", "$"]
}
```
You may consult CoinMarketsCap's documentation to see the avaiable [FIAT](https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions) and [Crypto](https://coinmarketcap.com/) currencies.

Now you can execute the index.js script with the command ```node .``` and you should get a message from the Telegram bot.
Remember to [Start your Telegram Bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot) before uing the script.

# Automate the Script
You can automate the script in different ways, but the most easy and straightforward is to add it to you [crontab](https://linux.die.net/man/5/crontab) file.
Just execute the command ```crontab -e```, if it's the first time you run it you may have to select a text editor to edit the crontab's file.

Once you executed the command, paste the following line at the bottom of the file:
```bash 
*/15 * * * * node /path/to/Crypto-Updates/index.js
```
REMEMBER TO CHANGE THE PATH TO YOUR LOCATION OF THE FILE!

If you don't know what this command does you can investigate [here](https://stackoverflow.com/questions/5200551/how-to-set-a-cron-job-to-run-at-a-exact-time).
But basically with the line above we set a cron-job to execute the script every 15 minutes.

You can change the time the script runs, and you can use a tool such as [Crontab Guru](https://crontab.guru/) to help you configure the time.
