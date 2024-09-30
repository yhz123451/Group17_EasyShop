var User = {
	//查询用户名
	queryUserName(param){
		return "select * from user where userName = '"+param.userName+"'";
	},
	//验证用户名和密码
	queryUserPwd(param){
		return "select * from user where userName = '"+param.userName+"' or email = '"+param.userName+"' and userPwd = '"+param.userPwd+"'"
	},
	//增加用户数据
	insertData(param){
		let userName = param.userName;
		const jwt = require('jsonwebtoken');
		let payload = {name:param.userName};
		let secret = 'lhfyhz';
		let token = jwt.sign(payload,secret);
		let nickName = param.nickName || "User";
		let avatarUrl = param.avatarUrl || "../../static/image/icon/cross.png";
		return `INSERT INTO user (userName, userPwd, email, imgUrl, nickName, token) VALUES ('${userName}', '${param.userPwd}', '${param.email}', '${avatarUrl}', '${nickName}', '${token}')`;
	}
}

exports = module.exports = User;