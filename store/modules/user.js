export default{
	state:{
		//登录状态
		loginStatus:false,
		//token
		token:null,
		//用户信息
		userInfo:{}
	},
	getters:{
		
	},
	mutations:{
		initUser(state){
			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				userInfo = JSON.parse(userInfo);
				state.userInfo = userInfo;
				state.loginStatus = true;
				state.token = userInfo.token;
			}
		},
		//登录后保存用户信息
		login(state,userInfo){
			state.userInfo = userInfo;
			state.loginStatus = true;
			state.token = userInfo.token;
			//持久化存储
			uni.setStorageSync('userInfo',JSON.stringify(userInfo));
		},
		//退出登录
		loginOut(state){
			state.loginStatus = false;
			state.userInfo = {};
			state.token = null;
			//删除本地存储信息
			uni.removeStorageSync('userInfo');
		},doUpdateUserInfo(state,newImageUrl){
			state.userInfo.imgUrl = newImageUrl;
			console.log('保存用户信息',JSON.stringify(state.userInfo))
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo));
		}
	},
	actions:{
		
	},
}