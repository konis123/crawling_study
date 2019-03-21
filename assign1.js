//네이버 html 가져오기

var request = require('request');
request('http://www.naver.com', function (error, response, body) {
  console.log('body:', body); 
});