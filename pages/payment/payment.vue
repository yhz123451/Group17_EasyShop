<template>
	<view>
		<!-- 自定义导航 -->
		<uniNavBar title="Confirm Payment" 
		left-text="Close"
		fixed="true"
		status-bar="true"
		@clickLeft="goBack"
		background-color="#E5E9DB"
		></uniNavBar>
		
		<view class="pay-main">
			<label for="">
				<view class="pay-item">
					<image src="../../static/image/icon/creditcard.png" mode="" class="pay-img"></image>
					<view>Credit Card</view>
					<label class="radio">
						<radio value="" color="#E5E9DB"/><text></text>
					</label>
				</view>
			</label>
			<label for="">
				<view class="pay-item">
					<image src="../../static/image/icon/mastercard.png" mode="" class="pay-img"></image>
					<view>Master Card</view>
					<label class="radio">
						<radio value="" color="#E5E9DB"/><text></text>
					</label>
				</view>
			</label>
		</view>
		<!-- 支付 -->
		<view class="pay-footer">
			<view class="txt">
				<text class="pay-txt">Total Price:</text>
				<text class="pay-price">$250</text>
			</view>
			<view class="go-pay" @click="goPaySuccess">
				<button class="pay-bt">Pay</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				
			}
		},
		components: {
			uniNavBar,
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1,
				})
			},
			goPaySuccess(){
				uni.navigateTo({
					url:"/pages/payment-success/payment-success"
				})
			}
		}
	}
</script>

<style scoped>
.pay-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 2rpx solid #E5E9DB;
}
.pay-img{
	width: 100rpx;
	height: 100rpx;
}
.pay-txt {
	margin-left: 30rpx;
	font-size: 30rpx;
	font-weight: 700;
}
.pay-footer {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.txt {
	background-color: #E5E9DB;
	flex: 1;
	line-height: 90rpx;
}
.go-pay{
	line-height: 90rpx;
	text-align: center;
	width: 160rpx;
	background-color: #CED8B7;
}
.pay-bt {
	height: 90rpx;
	width: 160rpx;
	background-color: #CED8B7;
}
</style>
