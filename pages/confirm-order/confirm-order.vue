<template>
	<view class="main-page">
		<view class="myorder">
			Confirm Order
		</view>
		<Lines />
		
		<!-- 地址 -->
		<view class="confirm-order">
			<view class="order-map" @click="goAddressList">
				<template v-if="path">
					<view class="map-title">
						<view class="title-name">Name: {{path.name}}</view>
						<view>{{path.tel}} > </view>
					</view>
					<view class="map-name">Address: {{path.details}}</view>
					<view class="map-name">{{path.city}} {{path.state}} {{path.postcode}}</view>
				</template>
				
				<template v-else>
					<view class="map-title">
						<view class="title-name">Please choode address</view>
					</view>
				</template>
			</view>
		</view>
		
		<!-- 商品 -->
		<view class="goods-content" v-for="(item,index) in list" :key="index">
			<view class="goods-nt">
				<image :src="item.imgUrl" mode="" class="goods-img"></image>
				<view class="note">
					<view class="goods-info">{{item.name}}</view>
					<!-- <view>classification</view> -->
					<!-- <view>From source</view> -->
				</view>
			</view>
			<view class="gds-price">
				<view>${{item.price}}</view>
				<view>x{{item.num}}</view>
			</view>
		</view>
		<!-- 
		<view class="goods-content">
			<view class="goods-nt">
				<image src="../../static/image/sports/nike1.png" mode="" class="goods-img"></image>
				<view class="note">
					<view class="goods-info">name</view>
					<view>classification</view>
					<view>From source</view>
				</view>
			</view>
			<view class="gds-price">
				<view>$250</view>
				<view>x1</view>
			</view>
		</view> -->
		
		<!-- 底部提交订单 -->
		<view class="order-foot">
			<view>Total price: <text>${{totalCount.price}}</text> </view>
			<view class="confirm" @click="goPayment">
				<button class="button">Submit Order</button>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from "@/common/Line.vue"
	import wishlist from "@/store/modules/wishlist"
	import {mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				path:null,
			}
		},
		components:{
			Lines,
		},
		computed: {
			...mapState({
				list:state=>state.wishlist.selectedGoodsList
			}),
			...mapGetters(['defaultPath','totalCount']),
		},
		onLoad() {
			// 如果有默认地址的赋值
			if(this.defaultPath.length){
				this.path = this.defaultPath[0];
			}
			//如果触发页面传值事件
			uni.$on("selectPathItem",(res)=>{
				this.path = res;
			})
		},
		onUnload() {
			//移除当前的callback事件，这样onLoad就不会监听到所有的数据
			uni.$off('selectPathItem',()=>{
				console.log('Remove the current call back event.')
			})
		},
		methods: {
			goAddressList(){
				uni.navigateTo({
					url:"/pages/myaddress/myaddress?type=selectedPath"
				})
			},
			goPayment(){
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				console.log(this.list)
				let gids = []
				for(let i =0;i<this.list.length;i++){
					gids.push(this.list[i])
				}
				console.log(gids)
				$http.request({
					url:"/submitOrder",
					data:{
						userId:userInfo.id,
						slist:JSON.stringify(gids),
					}
				}).then((res)=>{
					console.log(res)
					uni.navigateTo({
						url:"/pages/payment/payment"
					})
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
			}
		}
	}
</script>

<style scoped>
.main-page {
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
}
.myorder {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
}
.order-map {
	padding: 20rpx;
	background-color: #CED8B7;
	line-height: 40rpx;
}
.map-title {
	display: flex;
	justify-content: space-between;
}
.title-name{
	font-weight: 600;
}
.goods-content {
	
	background-color: #E5E9DB;
	padding: 10rpx;
	display: flex;
	justify-content: space-between;
}
.goods-nt {
	display: flex;
	flex: 1;
}
.note {
	display: block;
	overflow: hidden;
	padding: 0 20rpx;
	word-break: break-all;
}
.goods-info {
	height: 150rpx;
	width: 380rpx;
	overflow: hidden;
	padding-bottom: 10rpx;
	font-size: 30rpx;
	font-weight: 500;
}
.goods-img {
	width: 200rpx;
	height: 200rpx;
	border-radius: 20rpx;
}
.gds-price {
	margin-top: 50rpx;
	align-items: center;
}
.order-foot {
	width: 100%;
	height: 80rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #E5E9DB;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.confirm {
	background-color: #CED8B7;
	height: 100%;
	margin-left: 30rpx;
	text-align: center;
}
.button {
	background-color: #CED8B7;
	height: 100%;
}
</style>
