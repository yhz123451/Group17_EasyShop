<template>
	<view>
		<view class="myorder">
			Payment Successfully
		</view>
		
		<view class="return-index" @click="goIndex">
			Back to home page
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped>
.myorder {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 500rpx;
	margin-bottom: 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.return-index {
	width: 300rpx;
	padding: 10rpx 60rpx;
	border: 4rpx solid #E5E9DB;
	color: #E5E9DB;
	border-radius: 40rpx;
	text-align: center;
	margin: auto;
}
</style>
