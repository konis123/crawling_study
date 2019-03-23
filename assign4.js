//promise만으로 실시간인기검색어와 연관검색어 가져오기
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
    
    let related = [];

    for(let i=0;i<value.length;i++){
        
        var promise2 = new Promise(function(resolve, reject) {
            let tmp = [];

            const ranklink = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_lve.allnow&ie=utf8&query=' + qs.escape(value[i]);
            request(ranklink, function (error, response, body) {
                var $ = cheerio.load(body);
                let result = new Object();

                $('#nx_related_keywords > dl > dd.lst_relate._related_keyword_list > ul').each(function(j, elem) {
                    //related[i][j] = $(this).text();
                    //console.log($(this).text());
                    tmp[j] = $(this).text();
                });

                result.realtime = value[i];
                result.relatedKey = tmp;

                resolve(result);
                
            });
        });
        related.push(promise2);
    }

    Promise.all(related).then(function(rel){

        for(let i=0;i<rel.length;i++){
            console.log(`${i+1}위 ${rel[i].realtime}`);
            console.log(rel[i].relatedKey);
        }

    });
})
