<template>
  <view>
	<view style="display: flex; flex-direction: column; align-items: center;margin-top: 300rpx;">
		<view style="display: flex; align-items: center; margin-top: 10px;">
			<text style="margin-right: 10px;">Username:</text>
			<input type="text" style="width: 100px; padding: 10px;" v-model="u.account">
		</view>
		<view style="display: flex; align-items: center; margin-top: 10px;">
			<text style="margin-right: 10px;">Email:</text>
			<input type="text" style="width: 100px; padding: 10px;" v-model="u.email">
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
					"account":"",
					"email":"",
					}
			};
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
			}),
		},
	  methods: {
			confirmChanges(){
				console.log(this.u.account,this.u.email)
				$http.request({
					url:"/checkAccountAndEmail",
					method:"POST",
					data:{
						account:this.u.account,
						email:this.u.email
					}
				}).then((res)=>{
					console.log(res)
					if(res.length > 0){
						this.goForgetPassword2(res[0].id)
					}
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
			},
			goForgetPassword2(userId){
				this.$router.replace("/pages/goForgetPassword2/goForgetPassword2?userId="+userId);
			}
		}
	};
</script>