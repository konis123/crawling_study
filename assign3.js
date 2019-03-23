//async-await, promise로 동기처리해서 실시간 인기검색어와 관련된 연관검색어 가져오기

const request = require('request');
const cheerio = require('cheerio');
const qs = require('querystring');


let rankings = [];

request('http://www.naver.com', function (error, response, body) {

    let $ = cheerio.load(body);
    $('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k').each(function(i, elem) {
        rankings[i] = $(this).text();
    });

    rankings.join(', ');
    console.log('[실시간 검색어]' + rankings);

    (async () => {
        for(let i=0;i<rankings.length;i++){

            let ranklink = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_lve.allnow&ie=utf8&query=' + qs.escape(rankings[i]);

            const promise1 = new Promise((resolve, reject) => {
                let related = [];
                request(ranklink, function (error, response, body) {

                    let $ = cheerio.load(body);
                    $('#nx_related_keywords > dl > dd.lst_relate._related_keyword_list > ul').each(function(k, elem) {
                        related[k] = $(this).text();
                    });

                    related.join(', ');
                    resolve(related);
                });
            });

            const rankRelated = await promise1;

            const rank = $(`#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li:nth-child(${i+1}) > a > span.ah_k`).text();
            console.log(`======${i+1}위. ${rank}======`);
            console.log(rankRelated);

        }

    })();
    
});
