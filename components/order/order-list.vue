<template>
	<view class="goods-content">
		<view class="goods-nt">
			<image :src="item.imgUrl" mode="" class="goods-img"></image>
			<view class="note">
				<view class="goods-info">{{item.name}}</view>
				<view>{{item.oid}}</view>
				<view>{{item.orderTime}}</view>
				<!-- <view>{{item.classification}}</view> -->
				<!-- <view>From {{item.source}}</view> -->
			</view>
		</view>
		<view>
			<view>${{item.price}}</view>
			<view>x{{item.num}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			item:Object,
			index:Number
		}
	}
</script>

<style scoped>
	.goods-content {
		
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
		height: 80rpx;
		width: 380rpx;
		overflow: hidden;
		padding-bottom: 10rpx;
		font-size: 30rpx;
		font-weight: 500;
		white-space: nowrap; /* 文本不换行 */
		overflow: hidden; /* 超出部分隐藏 */
		text-overflow: ellipsis; /* 文本溢出时显示省略号 */
	}
	.goods-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
	}
</style>