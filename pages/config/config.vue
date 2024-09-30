<template>
	<view class="config">
		<view class="config-title">
			<view class="config-logo">
				<image src="../../static/image/icon/setting.png" mode="" class="config-img"></image>
			</view>
			<view class="st-nm">Setting</view>
		</view>
		
		<view class="my-config">
			<view class="config-item" @click="goManageAddress">
				<view>Manage Address</view>
				<view class="config-mark"> > </view>
			</view>	
			
			<view class="config-item" @click="goHistoryOrder">
				<view>History Order</view>
				<view class="config-mark"> > </view>
			</view>	
			
			<view class="config-item" @click="goContactUs">
				<view>Contact Us</view>
				<view class="config-mark"> > </view>
			</view>	
			
			<view class="my-exit" @click="outLogin">Log Out</view>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['loginOut']),
			goManageAddress(){
				uni.navigateTo({
					url:"/pages/myaddress/myaddress"
				})
			},
			outLogin(){
				uni.showToast({
					title:"Log Out Successfully",
					icon:"none"
				})
				this.loginOut();
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			goHistoryOrder(){
				uni.navigateTo({
					url:"/pages/orderHistory/orderHistory"
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
.config {
	
}
.config-title {
	display: flex;
	margin-left: 60rpx;
	margin-right: 60rpx;
	margin-top: 20rpx;
}
.config-img {
	width: 80rpx;
	height: 80rpx;
}
.st-nm{
	margin-left: 10rpx;
	margin-top: 10rpx;
	font-size: 40rpx;
	font-weight: 500;
}
.config-item {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0 20rpx 20rpx;
	border-bottom: 2rpx solid #E5E9DB;
}
.config-mark {
	padding-right: 10rpx;
}
.my-exit {
	background-color: #E5E9DB;
	width: 100%;
	line-height: 80rpx;
	text-align: center;
}
</style>
