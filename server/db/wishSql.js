var Wish = {
	//查询用户名
	queryList(param){
		return "SELECT g.*,u.num,u.id wid FROM user_wish u,goods_search g where u.proid = g.id and u.uid = '"+param.userId+"'";
	},
	updateAmazonData(param){
		return `update goods_search set amazon_price = '${param.price}' where id = '${param.id}'`;
	},
	updateEbayData(param){
		return `update goods_search set ebay_price = '${param.price}' where id = '${param.id}'`;
	},
	delOneWish(param){
		return `delete from user_wish where id in '${param.id}'`;
	},
	delAllWish(param){
		return `update goods_search set ebay_price = '${param.price}' where id = '${param.id}'`;
	},
	insertData(param){
		return `INSERT INTO user_wish (uid,proid,num) VALUES ('${param.userId}', '${param.goodId}', '${param.num}')`;
	}
}

exports = module.exports = Wish;