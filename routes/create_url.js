/*
 * GET users listing.
 */

var https = require('https');
var basePath = 'http://www.mindsparkpartners.org/refer-friends/referral-form/';
var bitlyPath = 'https://api-ssl.bitly.com/v3/shorten?access_token=37eeaacdd42f6c196a1449aa05587d8ee4b45407&longUrl=';

exports.create_url = function(req, res){
  var path=basePath 
	  + '?referrersName[first]=' + req.query['firstName']
	  + '&referrersName[last]=' + req.query['lastName']
	  + '&referrersEmail=' + req.query['email'];
  var encodedUri = encodeURIComponent(path);
  var reqPath = bitlyPath + encodedUri;
  console.log("Retrieving URL from bitly: " + reqPath);

  https.get(reqPath, function(bitlyRes) {
	var completeData = '';
	
	console.log("Bitly status code: " + bitlyRes.statusCode);
	console.log("Bitly headers: " + bitlyRes.headers);

	bitlyRes.on('data', function(d) {
		completeData += d;
		console.log("Bitly returned URL is " + d);
	});
	bitlyRes.on('end', function() {
		console.log("about to parse json" + completeData);

		var obj = JSON.parse(completeData);
		res.render('results', {url: obj.data.url});
	});
  });
}; 
