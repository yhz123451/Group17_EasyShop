<template>
	<view>
		<view class="phone">
			Enter your information
		</view>
		<Lines></Lines>
		
		<view class="login-form">
			<view class="login-user">
				<text class="user-text">Username</text>
				<input type="text" v-model="userName" placeholder="Username" class="input-text"/>
			</view>
			<view class="login-user">
				<text class="user-text">Password</text>
				<input type="password" v-model="userPwd" placeholder="6-16 characters" class="input-text"/>
			</view>
			<view class="login-user">
				<text class="user-text">Confirm Password</text>
				<input type="password" v-model="confirmPwd" placeholder="6-16 characters" class="input-text"/>
			</view>
			<view class="login-user">
				<text class="user-text">Email</text>
				<input type="text" v-model="email" placeholder="Email" class="input-text"/>
			</view>
			<view class="tel" @click="submit">
				submit
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from "@/common/Line.vue"
	export default {
		data() {
			return {
				//用户输入内容
				userName: "",
				userPwd: "",
				confirmPwd: "",
				email: "",
				//验证规则
				rules: {
					userName: {
						rule: /\S/,
						msg: "Username cannot be empty"
					},
					userPwd: {
						rule: /^[0-9a-zA-Z]{6,16}$/,
						msg: "Password should be 6-16 characters"
					},
					confirmPwd: {
						rule: /^[0-9a-zA-Z]{6,16}$/,
						msg: "Password should be 6-16 characters"
					},
					email: {
						rule: /\S+@\S+\.\S+/,
						msg: "Email should be valid"
					}
				},
			}
		},
		components: {
			Lines
		},
		methods: {
			submit() {
				if (!this.validate('userName')) return;
				if (!this.validate('userPwd')) return;
				if (!this.validate('confirmPwd')) return;
				if (!this.validate('email')) return;
				
				// Check if passwords match
				if (this.userPwd !== this.confirmPwd) {
					uni.showToast({
						title: "Passwords do not match",
						icon: "none"
					});
					return;
				}

				uni.showLoading({
					title: 'Registering...'
				});
				
				// 打印用户输入的信息
				
				this.goNextCode();
			},
			//判断验证是否符合要求
			validate(key) {
				let bool = true;
				if (!this.rules[key].rule.test(this[key])) {
					uni.showToast({
						title: this.rules[key].msg,
						icon: "none"
					})
					bool = false;
					return false;
				}
				return bool;
			},
			goNextCode() {
				$http.request({
					url: "/registered",
					method: "POST",
					data: {
						userName: this.userName,
						userPwd: this.userPwd,
						email: this.email
					}
				}).then((res) => {
					uni.hideLoading();
					
					if(!res.success){
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
						return;
					}
					
					uni.showModal({
						title: 'Success',
						content: 'Registration successful',
						showCancel: false,
						success: () => {
							uni.navigateBack({
								delta: 1
							});
						},
					});
				}).catch((err) => {
					console.error("Request Failed:", err);
					uni.hideLoading();
					uni.showToast({
						title: 'Request Failed',
						icon: 'none'
					});
				});
			},
		}
	}
</script>

<style scoped>
.phone {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
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
.input-text {
	flex: 1;
	padding-left: 20rpx;
	margin: 20rpx 0;
}
.tel {
	margin-top: 20rpx;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color: #fff;
	background-color: #CED8B7;
	border-radius: 40rpx;
}
</style>
