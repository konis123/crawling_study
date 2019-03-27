//asyncawait으로 실시간검색어 및 연관검색어 10위까지 리턴하기
const cheerio = require('cheerio');
const qs = require('querystring');
const rp = require('request-promise');

async function rankRelated(){

    let options = {
        uri: 'https://www.naver.com/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options).then(async ($) => {
        let results = [];
        let result = new Object();
        let rankings = [];
        await $('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k')
            .each(function(i, elem) {
                rankings[i] = $(this).text();
            });

        //rankings.length 대신 10개만
        for(let i=0;i<10;i++){

            let options = {
                uri: 'https://search.naver.com/search.naver?where=nexearch&sm=tab_lve.allnow&ie=utf8&query=' + qs.escape(rankings[i]),
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            
            await rp(options).then(($) => {

                let tmp = [];
                $('#nx_related_keywords > dl > dd.lst_relate._related_keyword_list > ul').each(function(j, elem) {
                    tmp[j] = $(this).text().substring(2,$(this).text().length-2);
                });
    
                result.realtime = rankings[i];
                result.relatedKey = tmp;
                results[i] = Object.assign({}, result);

            }).catch((err) => {
                console.log('rp error');
                return -1;
            });
        }

        console.log(results);
        return results;
    }).catch((err) => {
        console.log('rp error11');
        return -1;
    });

}

console.log(await rankRelated());