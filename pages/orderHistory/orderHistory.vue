<template>
	<view>
		<view class="myorder">
			History Order
		</view>
		<Lines />
				<view class="order-main" v-if="list.length > 0">
					<view  v-for="(k,i) in list" :key="i">
						<!-- 商品信息 -->
						<view class="order-goods">
								<!-- 商品来源 -->
							<!-- <view class="goods-status">{{k.status}}</view> -->
							<view class="goods-item" v-for="(item,index) in k.goods_items" :key="index">
								<view class="goods-item-box">
									<orderList :item='item' :index='index'></orderList>
								</view>
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
        {
            "totalPrice": 985.38,
            "goods_items": [
                {
                    "num": 1,
                    "oid": 6,
                    "name": "Apple iPad 4th Generation 16GB, Wi-Fi, 9.7in - White",
                    "price": "76.24",
					"orderTime":"2024-09-19 10:18:19",
                    "imgUrl": "https://i.ebayimg.com/images/g/SYoAAOSwAnlbmqFp/s-l500.webp"
                },
                {
                    "num": 1,
                    "oid": 7,
                    "name": "New listingApple iPad 9th Gen. 256GB, Wi-Fi +Cellular (Unlocked), 10.2 in - Space Grey",
                    "price": "454.81",
					"orderTime":"2024-09-11 05:56:07",
                    "imgUrl": "https://i.ebayimg.com/images/g/N-sAAOSwRYxm4d50/s-l500.webp"
                },
                {
                    "num": 1,
                    "oid": 8,
                    "name": "Size 5 - Nike Air Jordan 1 Retro High OG Stealth",
                    "price": "215.22",
					"orderTime":"2024-09-11 20:08:09",
                    "imgUrl": "https://i.ebayimg.com/images/g/dKgAAOSw5TBkDlZj/s-l140.webp"
                },
                {
                    "num": 1,
                    "oid": 9,
                    "name": "Nike Air Jordan 1 Retro High OG GS 'Stealth' 2022  575441-037  Youth Size 5Y",
                    "price": "127.03",
					"orderTime":"2024-09-08 09:08:23",
                    "imgUrl": "https://i.ebayimg.com/images/g/DUMAAOSwv-NlulBX/s-l140.webp"
                },
                {
                    "num": 1,
                    "oid": 10,
                    "name": "Nike Jordan 1 Retro High OG Stealth High Top Shoes- size 5",
                    "price": "112.08",
					"orderTime":"2024-09-05 21:38:55",
                    "imgUrl": "https://i.ebayimg.com/images/g/gO4AAOSw5ZFm0hWz/s-l500.webp"
                }
            ]
        }
    ],
			}
		},
		components:{
			Lines,
			orderList
		},
		onLoad() {
		},
		methods: {
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
.goods-item-box{
	border: 4rpx solid #ffaa00;
	margin-bottom: 15rpx;
}
</style>
