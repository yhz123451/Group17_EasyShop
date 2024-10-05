const axios = require('axios');
var connection = require('../db/sql.js');

const GetData = {
    queryData(name) {
        return new Promise(async (resolve, reject) => {
            // const response = await axios.get(`http://8.138.16.89:8009/api/catch_search/`+name);
            const response = await axios.get(`http://127.0.0.1:8009/api/catch_search?s=`+name);
            function execSql(inamazon,inebay){
                return new Promise(async (resolve1, reject1) => {
                    connection.query('INSERT INTO goods_search(imgUrl,name,price,search_key,discount,amazon_proid,amazon_mid,amazon_link,amazon_price,ebay_proid,ebay_link,ebay_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [inebay.imgUrl, inebay.name, Math.min(inamazon.price,inebay.price),name,10,0,0,inamazon.link,inamazon.price,0,inebay.link,inebay.price],function (error, results, fields) {
                        if (error) throw error;
                        resolve1(results.insertId)
                    });
                });
            } 

            idList = []
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                amazonData = element.amazonData
                ebayData = element.ebayData
                idList.push(await execSql(amazonData,ebayData))
                
            }
            resolve(idList.join(','));
        });
    }
};

exports = module.exports = GetData;
