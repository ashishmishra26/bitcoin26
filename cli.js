#!/usr/bin/env node

var http = require('http');
var chalk = require('chalk');
var myArgs = process.argv.slice(2),
    currencyCode = myArgs[0],
    validCurrencyCode = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MTL", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBT", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL"],
    path = '/v1/bpi/currentprice/' + currencyCode + '.json',
    options = {
        host: 'api.coindesk.com',
        path: path,
        family: 4,
        json: true,
        port: 80
    },
    interval = ((myArgs[1] * 1000) || 3000);

function bitcoin() {
    setInterval(function () {
        var request = http.get(options, function (response) {
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                data = JSON.parse(data, 2);
                let timeStamp, rate, date = new Date();
                timeStamp = 'Updated At: ' + 'DATE - ' + date.getDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear() + ', ' + 'TIME - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '\n';
                rate = 'Rate :' + data['bpi'][currencyCode]['rate'].toString() + ' ' + currencyCode;
                console.log(chalk.yellow.bgBlack.bold(timeStamp));
                console.log(chalk.white.bgBlue.bold(rate+'\n'));
            });
        });

        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();

    }, interval);
};
if (validCurrencyCode.indexOf(currencyCode) == -1) {
    console.log(chalk.white.bgRed.bold('Incorrect currency code'));
    console.log(chalk.yellow.bgBlack.bold('choose from followings ...\n'));
    console.log(chalk.yellow.bgBlue.bold((JSON.stringify(validCurrencyCode))));
} else {
    bitcoin();
}