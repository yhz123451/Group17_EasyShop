<template>
  <view>
	<view style="display: flex; flex-direction: column; align-items: center;margin-top: 300rpx;">
		<view style="display: flex; align-items: center; margin-top: 10px;">
			<text style="margin-right: 10px;">New Password:</text>
			<input type="password" style="width: 100px; padding: 10px;" v-model="u.newPasswd">
		</view>
		<view style="display: flex; align-items: center; margin-top: 10px;">
			<text style="margin-right: 10px;">Repeat Password:</text>
			<input type="password" style="width: 100px; padding: 10px;" v-model="u.cNewPasswd">
		</view>
	    <view @click="confirmChanges" style="width: 150px; padding: 10px; background-color: #28a745; color: #fff; text-align: center; margin-top: 10px;">Confirm</view>
	</view>
  </view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				u:{
					"userId":"",
					"newPasswd":"",
					"cNewPasswd":"",
					}
			};
		},onLoad(options) {
			// 获取传递的参数
			this.u.userId = options.userId;
			
			console.log("Received userId: ", this.u.userId);
			// 在这里处理接收到的参数
		},
		computed:{
		
		},
	  methods: {
			confirmChanges(){
				$http.request({
					url:"/updateUserPasswd",
					method:"POST",
					data:{
						userId:this.u.userId,
						newPasswd:this.u.newPasswd
					}
				}).then((res)=>{
					uni.showToast({
						title:"修改成功，请重新登录",
						icon:"none"
					})
					this.goLogin()
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
			},
			goLogin(){
				this.$router.replace('/pages/login/login');
			}
		}
	};
</script>