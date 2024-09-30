<template>
	<view class="login">
		
		<swiper vertical="true" style="height: 100vh;">
			<swiper-item>
				<scroll-view>
					<!-- 注册页 -->
					<view class="login-tel">
						<view class="tel-main">
							
							<view class="close" @click="goBack">
								<image src="../../static/image/icon/cross.png" mode="" class="close-img"></image>
							</view>
							
							<view class="logo">
								<image src="../../static/image/logo.png" mode="" class="logo-img"></image>
							</view>
							
							<view class="tel" @click="goRegister">
								Register
							</view>
							
							<LoginOther></LoginOther>
							
							<view class="login-go">
								<view>Already have an account? Go to login!</view>
								<image src="../../static/image/icon/down.png" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view>
					<!-- 登录页 -->
					<view class="login-tel">
						<view class="tel-main">
							<view class="close close-center" @click="goBack">
								<view>
									<image src="../../static/image/icon/cross.png" mode="" class="close-img"></image>
								</view>
								<view class="login-up">
									<image src="../../static/image/icon/up.png" mode="" class="close-img"></image>
									<view>No account? Go to register!</view>
								</view>
								<view></view>
							</view>
							
							<view class="login-form">
								<view class="login-user">
									<text class="user-text">Username</text>
									<input type="text" v-model="userName" placeholder="Username"/>
								</view>
								<view class="login-user">
									<text class="user-text">Password</text>
									<input type="password" v-model="userPwd" placeholder="6-16 characters"/>
								</view>
							</view>
							<view class="login-quick">
								<view @click="goForgetPassword1">Forget your password?</view>
								<view @click="goContactUs">Contact Us</view>
							</view>
							<view class="tel" @click="submit">
								Login
							</view>
							<LoginOther></LoginOther>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import LoginOther from "@/components/login/login-other.vue"
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				//用户输入内容
				userName:"",
				userPwd:"",
				//验证规则
				rules:{
					userName:{
						rule:/\S/,
						msg:"Username cannot be empty"
					},
					userPwd:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"Password should be 6-16 digits"
					}
				},
			}
		},
		components: {
			LoginOther
		},
		methods: {
			...mapMutations(['login']),
			//关闭当前页面返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//点击登录
			submit(){
				if (!this.validate('userName')) return;
				if (!this.validate('userPwd')) return;
				
				uni.showLoading({
					title:'Logging...'
				}),
				
				$http.request({
					url:"/login",
					method:"POST",
					data:{
						userName:this.userName,
						userPwd:this.userPwd
					}
				}).then((res)=>{
					if(res.success){
						this.login(res.data);
						uni.showToast({
							title:this.msg,
							icon:"none",
						})
						
						uni.hideLoading();
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:this.msg,
							icon:"none",
						})
					}
				}).catch(()=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none',
					})
				})
			},	
			//判断验证是否符合要求
			validate(key){
				let bool = true;
				if(!this.rules[key].rule.test( this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:"none"
					})
					bool=false;
					return false;
				}
				return bool;
			},
			goRegister(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			},goForgetPassword1(){
				uni.navigateTo({
					url:"/pages/goForgetPassword1/goForgetPassword1"
				})
			},
			goContactUs(){
				uni.navigateTo({
					url:"/pages/contactUs/contactUs"
				})
			}
		}
	}
</script>

<style scoped>
.login {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: #E5E9DB;
}
.login-tel {
	width: 100vw;
	height: 100vh;
}
.tel-main {
	padding: 0 20rpx;
}
.close {
	padding: 100rpx 0;
}
.close-img {
	width: 60rpx;
	height: 60rpx;
}
.logo {
	padding-bottom: 200rpx;
	display: flex;
	justify-content: center;
}
.logo-img {
	height: 130rpx;
	width: 460rpx;
}
.tel {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color: #fff;
	background-color: #CED8B7;
	border-radius: 40rpx;
}

.login-go {
	display: flex;
	position: absolute;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	bottom: 0;
}
.login-go image {
	width: 60rpx;
	height: 60rpx;
}


/* 第二页 */
.close-center{
	display: flex;
}
.close-center >view {
	flex: 1;
}
.login-up {
	display: flex;
	position: absolute;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: 60rpx;
}
.login-form {
	padding-top: 40rpx;
}
.login-user {
	font-size: 32rpx;
	padding: 10rpx 0;
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #CED8B7;
}
.user-text {
	padding: 14rpx;
}
.login-quick {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
</style>
