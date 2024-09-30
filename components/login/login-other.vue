<template>
	<view class="login-other">
		<view class="other-text">
			<view>Other Logging Methods</view>
		</view>
		
		<view class="other">
			<view class="order-item">
				<image src="../../static/image/icon/google.png" mode=""></image>
				<view>Google Mail</view>
			</view>
			<view class="order-item">
				<image src="../../static/image/icon/facebook.png" mode=""></image>
				<view>Facebook</view>
			</view>
			<view class="order-item">
				<image src="../../static/image/icon/phone.png" mode=""></image>
				<view>Phone</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
import { provide } from "vue"

	
</script>

<style scoped>
	/* 其他登录方式 */
	.login-other {
		padding: 100rpx 0;
	}
	.other-text {
		display: flex;
		padding: 50rpx 0;
	}
	.other-text view {
		line-height: 0rpx;
		padding: 0 10rpx;
	}
	.other-text::after {
		flex: 1;
		content: '';
		height: 2rpx;
		background-color: #CED8B7;
	}
	.other-text::before {
		flex: 1;
		content: '';
		height: 2rpx;
		background-color: #CED8B7;
	}
	.other {
		display: flex;
		justify-content: space-around;
	}
	.order-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.order-item image {
		width: 80rpx;
		height: 80rpx;
	}
	/* 其他登录方式结束 */
</style>