/*
 * GET users listing.
 */

var https = require('https')
    , config = require('../customization/config');

exports.create_url = function(req, res){
  var path=config.bitly.base_path
	  + '?referrersName[first]=' + req.query['firstName']
	  + '&referrersName[last]=' + req.query['lastName']
	  + '&referrersEmail=' + req.query['email'];
  var encodedUri = encodeURIComponent(path);
  var reqPath = config.bitly.bitly_path + config.bitly.api_key + config.bitly.long_url_header + encodedUri;
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
