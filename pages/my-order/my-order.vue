<template>
	<view>
		<view class="myorder">
			My Order
		</view>
		<Lines />
				<view class="order-main" v-if="list.length > 0">
					<view  v-for="(k,i) in list" :key="i">
						<!-- 商品信息 -->
						<view class="order-goods">
								<!-- 商品来源 -->
							<!-- <view class="goods-status">{{k.status}}</view> -->
							<view class="goods-item" v-for="(item,index) in k.goods_items" :key="index">
								<orderList :item='item' :index='index'></orderList>
							</view>
						</view>
						<!-- 商品总价 -->
						<view class="total-price">
							Price:<text>${{k.totalPrice}}</text>
						</view>
						<!-- 支付 -->
						<view class="payment" @click="goPay">
							<view class="payment-text">
								Pay
							</view>
						</view>
					</view>
				</view>
				
				<view class="no-order" v-else>
					<view>No history of orders</view>
					<view class="no-order-hone">Add your favourite items!</view>
				</view>
		
		
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from "@/common/Line.vue"
	import orderList from "@/components/order/order-list.vue"
	export default {
		data() {
			return {
				tabIndex:0,
				list:[
				],
			}
		},
		components:{
			Lines,
			orderList
		},
		onLoad() {
			console.log(this.tabList);
			this.getOrderList();
		},
		methods: {
			//顶部切换
			changeTab(index){
				this.tabIndex = index;
			},
			goPay(){
				uni.navigateTo({
					url:"/pages/payment/payment"
				})
			},getOrderList(){
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				$http.request({
					url:"/orderList",
					data:{
						userId:userInfo.id,
					}
				}).then((resaaa)=>{
					console.log('res.data',resaaa.data)
					// console.log('this.list',this.list)
					this.list=resaaa
					// console.log('after this.list',this.list)
					// this.list = [{
					// 	totalPrice:"2689.00",
					// 	goods_items:[
					// 		{
					// 			source:"Nie Official",
					// 			imgUrl:"../../static/image/sports/nike1.png",
					// 			name:"Air Jordan 1 Retro High OG",
					// 			classification:"Men's Shoes",
					// 			price:"250",
					// 			num:"1",
					// 		},
					// 		{
					// 			source:"Nie Official",
					// 			imgUrl:"../../static/image/sports/nike1.png",
					// 			name:"Air Jordan 1 Retro High OG",
					// 			classification:"Men's Shoes",
					// 			price:"250",
					// 			num:"5",
					// 		},
					// 		{
					// 			source:"Nie Official",
					// 			imgUrl:"../../static/image/sports/nike1.png",
					// 			name:"Air Jordan 1 Retro High OG",
					// 			classification:"Men's Shoes",
					// 			price:"250",
					// 			num:"5",
					// 		}
					// 	]
					// }]
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
			}
		}
	}
</script>

<style scoped>
.no-order {
	margin-top: 200rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.no-order-hone {
	margin-top: 20rpx;
	padding:6rpx 60rpx;
	border: 4rpx solid #E5E9DB;
	border-radius: 40rpx;
	color: #CED8B7;
}
.myorder {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
}
.order-header {
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 2rpx solid #f7f7f7;
}
.header-item {
	text-align: center;
	flex: 1;
	line-height: 120rpx;
}
.active {
	border-bottom: 4rpx solid #E5E9DB;
}
.order-goods{
	background-color: #E5E9DB;
	border-radius: 20rpx 20rpx 0 0;
	margin-top: 6rpx;
}
.goods-status {
	display: flex;
	justify-content: flex-end;
	color: #000;
	font-weight: 600;
	padding: 10rpx;
}


.total-price {
	display: flex;
	justify-content: flex-end;
	padding: 20rpx;
	background-color: #CED8B7;
	border-radius: 0 0 20rpx 20rpx;
	padding-bottom: 10rpx;
}
.payment {
	display: flex;
	justify-content: flex-end;
	padding: 20rpx;
}
.payment-text {
	border: 4rpx solid #E5E9DB;
	color: #E5E9DB;
	padding: 6rpx 60rpx;
	border-radius: 30rpx;
	font-weight: bold;
}
</style>
