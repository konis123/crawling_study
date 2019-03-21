//asyncawait으로 실시간인기검색어와 연관검색어 가져오기

const request = require('request');
const cheerio = require('cheerio');
const qs = require('querystring');
// const async = require('asyncawait/async');

// var foo = async (function() {
//     var resultA = await (firstAsyncCall());
//     var resultB = await (secondAsyncCallUsing(resultA));
//     var resultC = await (thirdAsyncCallUsing(resultB));
//     return doSomethingWith(resultC);
// });

// function firstAsyncCall(){
//     console.log('111');
// }

// function secondAsyncCallUsing(){
//     console.log('222');
// }

// function thirdAsyncCallUsing(){
//     console.log('333');
// }

function relatedFunc(){

}

async function asyncCall(){

    var rankings = [];

    request('http://www.naver.com', function (error, response, body) {

        var $ = cheerio.load(body);
        $('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k').each(function(i, elem) {
            rankings[i] = $(this).text();
        });

        rankings.join(', ');
        //console.log(rankings);
        resolve(rankings);

    });

    await relatedFunc();

}