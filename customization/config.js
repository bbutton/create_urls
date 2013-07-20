/**
 * Created with IntelliJ IDEA.
 * User: bbutton
 * Date: 7/20/13
 * Time: 3:22 PM
 * To change this template use File | Settings | File Templates.
 */

var config = {};

config.bitly = {};

config.bitly.api_key = process.env.BITLY_KEY;
config.bitly.base_path = 'http://www.mindsparkpartners.com/refer-friends/referral-form/';
config.bitly.bitly_path = 'https://api-ssl.bitly.com/v3/shorten?access_token=';
config.bitly.long_url_header = '&longUrl=';

module.exports = config;
