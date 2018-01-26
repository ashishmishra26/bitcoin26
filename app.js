var http = require('http');
var data,data2;
var options = {
    host: 'api.coindesk.com',
    path: '/v1/bpi/currentprice/INR.json',
    json:true,
    port:80
}
var request = http.get(options, function (res) {
    var result = '';
    data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        data2 = JSON.parse(data,2);
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();
var server = http.createServer(function (request,response) {
    response.write('Rate(INR) :'+data2['bpi']['INR']['rate'].toString());
response.end();
}).listen(8000);
