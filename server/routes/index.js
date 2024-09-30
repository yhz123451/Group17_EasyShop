var express = require('express');
const { query } = require('../db/sql.js');
var router = express.Router();
var connection = require('../db/sql.js');
var user = require('../db/UserSql.js');
var wish = require('../db/wishSql.js');
var getDate = require('../utils/getData2.js')
const axios = require('axios');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
// const jwt = require('jsonwebtoken');
// 解决跨域问题
router.use('/uploads', express.static('uploads'))
router.all("*",function(req,res,next){
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin','*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers','content-type');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
    if(req.method.toLowerCase() == 'options')
        res.send(200); // 让options 尝试请求快速结束
    else
        next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

//查询收货地址

router.get('/api/selectAddress', function(req, res, next) {
  
	//前端传给后端的数据
	// let params = {
  //   userId:req.body.userId,
	// }
  
	// let token = req.headers.token;
	// console.log(res);
	// let userName = jwt_decode(token);
	
	// connection.query(`select * from user where userName = ${userName.name}`, function (error, results, fields){
	// 	let id = results[0].id;
	// })

	// connection.query(`select * from address where userid = ${req.body.userId}`, function (err, result, field){
	// 	console.log(result);
	// })
  
  let userId = req.query.userId;
  connection.query("select * from  address where userid = ?",[userId,userId], function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0",
      data: results
    });
  });
	
});

//测试token
// router.get('/api/test', function(req, res, next) {
//   res.send({
// 	  data:{
// 		  a:1
// 	  }
//   })
// });

//注册用户是否存在
router.post('/api/registered', function(req, res, next) {
	let params = {
		userName : req.body.userName,
		userPwd : req.body.userPwd,
		email : req.body.email,
	};
	connection.query(user.queryUserName(params), function (error, results, fields){
		if(results.length > 0){
			res.send({
				data:{
					success:false,
					msg:"Username already exists",
				}
			})
		}else{
			connection.query(user.insertData(params), function (err, result, field){
				res.send({
					data:{
						success:true,
						msg:"Registration successful"
					}
				})
			})
		}
	})
})


//用户登录
router.post('/api/login', function(req, res, next) {
	//前端传给后端的数据
	let params = {
		userName : req.body.userName,
		userPwd : req.body.userPwd
	}
	//查询用户名是否存在
	connection.query(user.queryUserName(params), function (error, results, fields){
		if(results.length > 0){
			connection.query(user.queryUserPwd(params), function (err, result){
				if(result.length > 0){
					res.send({
						data:{
							success:true,
							msg:"Login successfully",
							data:result[0]
						}
					})
				}else{
					res.send({
						data:{
							success:false,
							msg:"Password is not correct"
						}
					})
				}
			})
		}else{
			res.send({
				data:{
					success:false,
					msg:"Username does not exsist"
				}
			})
		}
	})
	
});

router.get('/api/goods/id', function(req, res, next) {
  let id = req.query.id;
  // 使用参数化查询来防止SQL注入
  connection.query("SELECT * from goods_search where id = ?", [id], function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0",
      data: results
    });
  });
});


router.get("/api/goods/search", async function(req,res,next) {
	//获取对象的key
	let [goodsName] = Object.keys(req.query);
	//name参数值
	let name = req.query.name;
	//ordername的值

  let proid = await getDate.queryData(name)
  if(proid != ""){
    connection.query("SELECT * from goods_search where id in ("+proid+")",function (error, results, fields) {
      if (error) throw error;
      res.send({
        code:"0",
        data:results
      })
    });
  }else{
    res.send({
      code:"1",
      data:""
    })
  }
});
// 运动户外第一次触底的数据
router.get('/api/index_list/2/data/2', function(req, res, next) {
  res.json({
    code: "0",
    data: [
      {
        type: "commodityList",
        data: [
        ]
      }
    ]
  });
});

// 首页第一次触底的数据
router.get('/api/index_list/1/data/2', function(req, res, next) {
  res.json({
    code: "0",
    data: [
      {
        type: "commodityList",
        data: [
        ]
      }
    ]
  });
});

// 运动户外第二次触底的数据
router.get('/api/index_list/2/data/3', function(req, res, next) {
  res.json({
    code: "0",
    data: [
      {
        type: "commodityList",
        data: [
        ]
      }
    ]
  });
});

// 运动页面第一次加载数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
  res.json({
    data: [
      {
        type: "bannerList",
        imgUrl: "../../static/image/sports/banner1.jpg"
      },
      {
        type: "iconsList",
        data: [
          { imgUrl: "../../static/image/sports/men1.jpg", name: "Men's Shows" },
          { imgUrl: "../../static/image/sports/women1.jpg", name: "Women's Shows" },
          { imgUrl: "../../static/image/sports/men2.jpg", name: "Men's shirts" },
          { imgUrl: "../../static/image/sports/women2.jpg", name: "Women's Shirts" },
          { imgUrl: "../../static/image/sports/basketball.jpg", name: "Basketball" },
          { imgUrl: "../../static/image/sports/football.jpg", name: "Football" },
          { imgUrl: "../../static/image/sports/pingpang.jpg", name: "Pingpang" },
          { imgUrl: "../../static/image/sports/badminton.jpg", name: "Badminton" }
        ]
      },
      {
        type: "hotList",
        data: [
          {
            id: 1,
            imgUrl: "../../static/image/commodity/nk11.png",
            name: "Air Jordan 1 Retro High OG",
            classification: "Men's Shoes",
            price: "250",
          },
          {
            id: 2,
            imgUrl: "../../static/image/commodity/nk22.png",
            name: "Air Jordan 1 High Method of Make",
            classification: "Women's Shoes",
            price: "230",
          },
          {
            id: 3,
            imgUrl: "../../static/image/commodity/ad11.png",
            name: "NMD_R1 SHOES",
            classification: "Women's Shoes",
            price: "220",
          },
          {
            id: 4,
            imgUrl: "../../static/image/commodity/ad22.png",
            name: "GAZELLE INDOOR SHOES",
            classification: "Men's Shoes",
            price: "200",
          },
        ]
      },
      {
        type: "shopList",
        data: [
          {
            bigUrl: "../../static/image/sports/nike.jpg",
            data: [
              {
                id: 1,
                imgUrl: "../../static/image/sports/nike1.png",
                name: "Air Jordan 1 Mid",
                classification: "Women's Shoes",
                price: "132.99",
              },
              {
                id: 2,
                imgUrl: "../../static/image/sports/nike2.png",
                name: "Air Jordan 1 Low SE",
                classification: "Men's Shoes",
                price: "170",
              },
              {
                id: 3,
                imgUrl: "../../static/image/sports/nike3.png",
                name: "Air Jordan Legacy 312 Low",
                classification: "Men's Shoes",
                price: "210",
              },
              {
                id: 4,
                imgUrl: "../../static/image/sports/nike4.png",
                name: "Jumpman MVP",
                classification: "Women's Shoes",
                price: "168.99",
              },
              {
                id: 5,
                imgUrl: "../../static/image/sports/nike5.png",
                name: "Jumpman MVP",
                classification: "Men's Shoes",
                price: "230",
              },
            ]
          },
          {
            bigUrl: "../../static/image/sports/adidas.jpg",
            data: [
              {
                id: 1,
                imgUrl: "../../static/image/sports/adidas1.jpg",
                name: "adidas Galaxy 6 Mens",
                classification: "Running Shoes",
                price: "99.99",
              },
              {
                id: 2,
                imgUrl: "../../static/image/sports/adidas2.jpg",
                name: "HOKA Clifton 9 Mens",
                classification: "Running Shoes",
                price: "259.99",
              },
              {
                id: 3,
                imgUrl: "../../static/image/sports/adidas3.jpg",
                name: "adidas BYW Select",
                classification: "Basketball Shoes",
                price: "219.99",
              },
              {
                id: 4,
                imgUrl: "../../static/image/sports/adidas4.jpg",
                name: "adidas Adizero Select 2.0",
                classification: "Basketball Shoes",
                price: "159.99",
              },
              {
                id: 5,
                imgUrl: "../../static/image/sports/adidas5.jpg",
                name: "adidas Trae Young 3 Calm",
                classification: "Basketball Shoes",
                price: "219.99",
              },
            ]
          },
        ]
      },
      {
        type: "commodityList",
        data: [
        ]
      }
    ]
  });
});

// 技术页面第一次加载数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
  res.json({
    data: [
      {
        type: "bannerList",
        imgUrl: "../../static/image/sports/banner1.jpg"
      },
      {
        type: "iconsList",
        data: [
          { imgUrl: "../../static/image/sports/men1.jpg", name: "111" },
          { imgUrl: "../../static/image/sports/women1.jpg", name: "222" },
          { imgUrl: "../../static/image/sports/men2.jpg", name: "333" },
          { imgUrl: "../../static/image/sports/women2.jpg", name: "Women's Shirts" },
          { imgUrl: "../../static/image/sports/basketball.jpg", name: "Basketball" },
          { imgUrl: "../../static/image/sports/football.jpg", name: "Football" },
          { imgUrl: "../../static/image/sports/pingpang.jpg", name: "Pingpang" },
          { imgUrl: "../../static/image/sports/badminton.jpg", name: "Badminton" }
        ]
      },
      {
        type: "hotList",
        data: [
          {
            id: 1,
            imgUrl: "../../static/image/commodity/nk11.png",
            name: "Air Jordan 1 Retro High OG",
            classification: "Men's Shoes",
            price: "250",
          },
          {
            id: 2,
            imgUrl: "../../static/image/commodity/nk22.png",
            name: "Air Jordan 1 High Method of Make",
            classification: "Women's Shoes",
            price: "230",
          },
          {
            id: 3,
            imgUrl: "../../static/image/commodity/ad11.png",
            name: "NMD_R1 SHOES",
            classification: "Women's Shoes",
            price: "220",
          },
          {
            id: 4,
            imgUrl: "../../static/image/commodity/ad22.png",
            name: "GAZELLE INDOOR SHOES",
            classification: "Men's Shoes",
            price: "200",
          },
        ]
      },
      {
        type: "shopList",
        data: [
          {
            bigUrl: "../../static/image/sports/nike.jpg",
            data: [
              {
                id: 1,
                imgUrl: "../../static/image/sports/nike1.png",
                name: "Air Jordan 1 Mid",
                classification: "Women's Shoes",
                price: "132.99",
              },
              {
                id: 2,
                imgUrl: "../../static/image/sports/nike2.png",
                name: "Air Jordan 1 Low SE",
                classification: "Men's Shoes",
                price: "170",
              },
              {
                id: 3,
                imgUrl: "../../static/image/sports/nike3.png",
                name: "Air Jordan Legacy 312 Low",
                classification: "Men's Shoes",
                price: "210",
              },
              {
                id: 4,
                imgUrl: "../../static/image/sports/nike4.png",
                name: "Jumpman MVP",
                classification: "Women's Shoes",
                price: "168.99",
              },
              {
                id: 5,
                imgUrl: "../../static/image/sports/nike5.png",
                name: "Jumpman MVP",
                classification: "Men's Shoes",
                price: "230",
              },
            ]
          },
          {
            bigUrl: "../../static/image/sports/adidas.jpg",
            data: [
              {
                id: 1,
                imgUrl: "../../static/image/sports/adidas1.jpg",
                name: "adidas Galaxy 6 Mens",
                classification: "Running Shoes",
                price: "99.99",
              },
              {
                id: 2,
                imgUrl: "../../static/image/sports/adidas2.jpg",
                name: "HOKA Clifton 9 Mens",
                classification: "Running Shoes",
                price: "259.99",
              },
              {
                id: 3,
                imgUrl: "../../static/image/sports/adidas3.jpg",
                name: "adidas BYW Select",
                classification: "Basketball Shoes",
                price: "219.99",
              },
              {
                id: 4,
                imgUrl: "../../static/image/sports/adidas4.jpg",
                name: "adidas Adizero Select 2.0",
                classification: "Basketball Shoes",
                price: "159.99",
              },
              {
                id: 5,
                imgUrl: "../../static/image/sports/adidas5.jpg",
                name: "adidas Trae Young 3 Calm",
                classification: "Basketball Shoes",
                price: "219.99",
              },
            ]
          },
        ]
      },
      {
        type: "commodityList",
        data: [
        ]
      }
    ]
  });
});

// 首页推荐数据
router.get('/api/index_list/1/data/1', function(req, res, next) {
  
  connection.query("SELECT * FROM goods_search ORDER BY RAND() LIMIT 10", function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.json({
      code: "0",
      data: {
        topBar: [
          { id: 1, name: 'Recommendation' },
          { id: 2, name: 'Sports' },
          { id: 3, name: 'Technology' },
          { id: 4, name: 'Clothes' },
          { id: 5, name: 'Foods' },
          { id: 6, name: 'Car' },
        ],
        data: [
          {
            type: "swiperList",
            data: [
              { imgUrl: '../../static/image/swiper/mi2.webp',linkUrl:"https://www.xiaomiev.com/su7" },
              { imgUrl: '../../static/image/swiper/mi1.jpg' ,linkUrl:"https://www.mi.com/global/product/redmi-pad-pro/"},
              { imgUrl: '../../static/image/swiper/mi3.webp' ,linkUrl:"https://www.mi.com/global/product/redmi-buds-6-active/"},
              { imgUrl: '../../static/image/swiper/mi4.webp' ,linkUrl:"https://www.mi.com/prod/redmi-turbo-3"},
            ]
          },
          {
            type: "recommendList",
            data: [
              {
                bigUrl: "../../static/image/items/nk_big.jpg",
                linkUrl: "https://www.nike.com/au/?cp=76636742130_search_&Macro=-nike-g-10583364231-107281978529-e-c-EN-pure-451041349117-kwd-11642601-9071920&ds_rl=1252249&gad_source=1&gclid=EAIaIQobChMIooX-uPXBiAMVRW0PAh2NiAcnEAAYASAAEgJ0HPD_BwE&gclsrc=aw.ds",
                data: [
                  { imgUrl: "../../static/image/items/nk1.png" },
                  { imgUrl: "../../static/image/items/nk2.png" },
                  { imgUrl: "../../static/image/items/nk3.png" },
                ]
              },
              {
                bigUrl: "../../static/image/items/ad_big.jpg",
                linkUrl: "https://www.adidas.com.au/?cm_mmc=AdieSEM_Google-_-PPC-B-AdidasCore-AU-SEAPAC-eCom-Paid_Search-_-Brand+-+Adidas+-+Core-_-adidas-_-dv:eCom&cm_mmc1=AU&cm_mmc2=b&gad_source=1&gclid=EAIaIQobChMIy-Xvx_XBiAMVJTbUAR01agn-EAAYASAAEgIBgPD_BwE&gclsrc=aw.ds",
                data: [
                  { imgUrl: "../../static/image/items/ad1.png" },
                  { imgUrl: "../../static/image/items/ad2.png" },
                  { imgUrl: "../../static/image/items/ad3.png" },
                ]
              },
            ]
          },
          {
            type: "commodityList",
            data:results
          }
        ]
      }
    });
  });
  
});


//添加购物车
router.post('/api/addShop', function(req, res, next) {
	//前端传给后端的数据
	let params = {
    userId:req.body.userId,
		goodId : req.body.goodId,
		num : req.body.num
	}
	//查询用户名是否存在
	connection.query(wish.insertData(params), function (error, results, fields){
    if(error){return}
      res.send({
        data:{
          success:true,
          msg:"Registration successful"
        }
      })
      })
});

router.get('/api/wishList', function(req, res, next) {
  let params = {userId:req.query.userId};
  // 使用参数化查询来防止SQL注入
  connection.query(wish.queryList(params), function (error, results, fields)  {
    if (error) throw error;
    res.send({
      code:"0",
      data:results
    })
  });
});


router.get('/api/checkWishPrice', function(req, res, next) {
  let userId = req.query.userId;
  let params = {userId:userId};
  // return
  
  function qa(gid,userid,amazon_proid,amazon_mid,ebay_proid,amazon_price,ebay_price,wid){
    return new Promise(async (resolve, reject) => {
      
        const postData = {
          id: gid,
          amazon_proid: amazon_proid,
          amazon_mid: amazon_mid,
          ebay_proid: ebay_proid
        };
        try{
          // const response = await axios.post(`http://8.138.16.89:8009/api/getProdInfo/`,postData);
          const response = await axios.post(`http://127.0.0.1:8009/api/getProdInfo/`,postData);
          tmp_amazon_price = response.data.amazonData.price
          tmp_ebay_price = response.data.ebayData.price
          if(Number(ebay_price) != tmp_ebay_price){
            
            connection.query(wish.updateEbayData({id:gid,price:tmp_ebay_price}), function (error, results, fields)  {
              if (error) throw error;
              connection.query('delete from user_notice where source = ? and wid = ?', ['EBAY',wid],function (error, results, fields) {
                  if (error) throw error;
                  connection.query('INSERT INTO user_notice(uid,gid,source,price,wid,changeMsg) VALUES (?, ?, ?, ?,?,?)', [userId,gid,'EBAY',tmp_ebay_price,wid,"$"+ebay_price+"->$"+tmp_ebay_price],function (error, results, fields) {
                      if (error) throw error;
                  });
              });
            });
          }
          if(Number(amazon_price) != tmp_amazon_price){
            connection.query(wish.updateAmazonData({id:gid,price:tmp_amazon_price}), function (error, results, fields)  {
              if (error) throw error;
              connection.query('delete from user_notice where source = ? and wid = ?', ['AMAZOM',wid],function (error, results, fields) {
                  if (error) throw error;
                  connection.query('INSERT INTO user_notice(uid,gid,source,price,wid,changeMsg) VALUES (?, ?, ?, ?, ?,?)', [userId,gid,'AMAZOM',tmp_amazon_price,wid,"$"+amazon_price+"->$"+tmp_amazon_price],function (error, results, fields) {
                      if (error) throw error;
                  });
              });
            });
            
          }
        }catch{
          console.log('网络异常')
        }
    });
  } 
  // 使用参数化查询来防止SQL注入
  connection.query(wish.queryList(params), function (error, results, fields)  {
    if (error) throw error;
    for (const key in results) {
      if (Object.hasOwnProperty.call(results, key)) {
        const element = results[key];
        
        qa(element.id,userId,element.amazon_link ,element.amazon_mid ,element.ebay_link,element.amazon_price ,element.ebay_price,element.wid );
        
      }
    }
  });
  res.send({
    code: "0"
  });
});
router.get('/api/noticeList', function(req, res, next) {
  // 使用参数化查询来防止SQL注入
  connection.query("SELECT distinct n.source,n.changeMsg,g.* from user_notice n, goods_search g where n.gid=g.id and n.uid = ?", [req.query.userId], function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0",
      data: results
    });
  });
});

router.get('/api/delGoods', function(req, res, next) {
  
  let userId = req.query.userId;
  let delGoodsId = JSON.parse(req.query.delGoodsId).join(',');
  // 使用参数化查询来防止SQL注入
  connection.query("delete from user_wish where id in ("+delGoodsId+");", function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    // 使用参数化查询来防止SQL注入
    connection.query("delete from user_notice where wid  in ("+delGoodsId+");", function (error, results, fields) {
      if (error) {
        res.status(500).send({ code: "1", message: "Database query error" });
        throw error;
      }
      res.send({
        code: "0"
      });
    });
  });
});

router.get('/api/submitOrder', function(req, res, next) {
  
  let userId = req.query.userId;
  let slist =  JSON.parse(req.query.slist);
  for(let i = 0;i<slist.length;i++){
    let gid = slist[i].id
    let num = slist[i].num
    connection.query("insert into user_order(uid,gid,num) values(?,?,?)",[userId,gid,num], function (error, results, fields) {
      if (error) {
        res.status(500).send({ code: "1", message: "Database query error" });
        throw error;
      }
    });
  }
  
  res.send({
    code: "0"
  });
});

router.get('/api/orderList', function(req, res, next) {
  
  let userId = req.query.userId;
  connection.query("select (select sum(price) from user_order o,goods_search g where g.id = o.gid and o.uid = ?) 'totalPrice',(select JSON_ARRAYAGG(j) from (select  JSON_OBJECT('oid',o.oid,'imgUrl',imgUrl,'price',price,'num',num,'name',`name`)  j from user_order o,goods_search g where g.id = o.gid and o.uid = ?) t) 'goods_items'",[userId,userId], function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0",
      data: results
    });
  });
});


router.post('/api/updateUserAddressInfo', function(req, res, next) {
	//前端传给后端的数据
  let userId = req.body.userId
	let addressInfo = JSON.parse(req.body.addressInfo)
	
	//查询用户名是否存在
	
  connection.query("UPDATE address SET name = ?, tel = ?, city = ?, details = ?, state = ?, postcode = ?, isDefault = ? WHERE id = ?", [addressInfo.name,addressInfo.tel,addressInfo.city,addressInfo.details,addressInfo.state,addressInfo.postcode,addressInfo.isDefault,addressInfo.id],function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0"
    });
  });
});
router.post('/api/updateUserInfo', function(req, res, next) {
	//前端传给后端的数据
  let userId = req.body.userId
	let nickName = req.body.nickName
	let imgUrl = req.body.imgUrl
	
	//查询用户名是否存在
	
  connection.query("UPDATE user SET nickName = ?, imgUrl = ? WHERE id = ?", [nickName,imgUrl,userId],function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0"
    });
  });
});

router.post('/api/addUserAddressInfo', function(req, res, next) {
	//前端传给后端的数据
  let userId = req.body.userId
	let addressInfo = JSON.parse(req.body.addressInfo)
	
	//查询用户名是否存在
	
  connection.query("INSERT INTO address (name, tel, city, details, state, postcode, isDefault, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [addressInfo.name,addressInfo.tel,addressInfo.city,addressInfo.details,addressInfo.state,addressInfo.postcode,addressInfo.isDefault,userId],function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.send({
      code: "0"
    });
  });
});

// 首页推荐数据
router.get('/api/getMoreRecommendations', function(req, res, next) {
  
  connection.query("SELECT * FROM goods_search ORDER BY RAND() LIMIT 10", function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    res.json({
      code: "0",
      data: results
    });
  });
  
});

router.post('/upload', upload.single('file'), (req, res) => {
  const imageUrl = 'http://127.0.0.1:3000/uploads/' + req.file.filename; // 图片访问路径
  res.send(imageUrl);
});

router.post('/api/checkAccountAndEmail', function(req, res, next) {
	//前端传给后端的数据
	let account = req.body.account
	let email = req.body.email
	
	//查询用户名是否存在
	
  connection.query("select * from user where userName = ? and email = ?", [account,email],function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    
    res.send({
      code: "0",
      data: results
    });
  });
});

router.post('/api/updateUserPasswd', function(req, res, next) {
	//前端传给后端的数据
	let userId = req.body.userId
	let newPasswd = req.body.newPasswd
	
	//查询用户名是否存在
	
  connection.query("update user set userPwd = ? where id = ?", [newPasswd,userId],function (error, results, fields) {
    if (error) {
      res.status(500).send({ code: "1", message: "Database query error" });
      throw error;
    }
    if(results.affectedRows == 1){
      res.send({
        code: "0"
      });
    }else{
      res.status(501).send({ code: "1", message: "update error" });
    }
  });
});
module.exports = router;
