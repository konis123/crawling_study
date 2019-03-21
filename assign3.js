//promise로 동기처리해서 실시간 인기검색어와 관련된 연관검색어 가져오기

const request = require('request');
const cheerio = require('cheerio');
const qs = require('querystring');

var promise1 = new Promise(function(resolve, reject) {

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

});
  
promise1.then(function(value) {

    for(var i=0;i<value.length;i++){
        var related = [];
        
        const ranklink = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_lve.allnow&ie=utf8&query=' + qs.escape(value[i]);
        request(ranklink, function (error, response, body) {
            var $ = cheerio.load(body);
            $('#nx_related_keywords > dl > dd.lst_relate._related_keyword_list > ul').each(function(i, elem) {
                related[i] = $(this).text();
            });

            related.join(', ');
            console.log('------'+$('#nx_query').attr('value')+'------');
            console.log(related);

        });
    }

});