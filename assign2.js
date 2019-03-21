//네이버 실시간 인기검색어 가져오기

const request = require('request');
const cheerio = require('cheerio');

request('http://www.naver.com', function (error, response, body) {


    const rankings = [];
    const $ = cheerio.load(body);

    $('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k').each(function(i, elem) {
        rankings[i] = $(this).text();
    });
    
    rankings.join(', ');

    console.log(rankings);
    
    

});