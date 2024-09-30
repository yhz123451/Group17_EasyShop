<template>
	<view class="recommend-container">
		<view class="recommend bg_color" v-for="(item, index) in dataList" :key="index">
			<view class="recommend-item">
				<a :href="item.linkUrl"  target="_blank">
					
					<image class="item-big" :src="item.bigUrl" mode=""></image>
				</a>
				
				<view class="item-small">
					<block v-for="(k, i) in item.data" :key="i">
						<image class="item-img" :src="k.imgUrl" mode=""></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style scoped>
.recommend-container {
	padding: 20rpx;
}
.recommend {
	padding: 20rpx;
}
.recommend-item {
	display: flex;
	flex-direction: column;
	border-radius: 20rpx;
	border: 2rpx solid #CCCCCC;
	overflow: hidden;
	margin: 20rpx 0;
}
.item-big {
	width: 100%;
	height: 400rpx;
}
.item-small {
	display: flex;
	width: 100%;
	height: 240rpx;
}
.item-img {
	width: 33.3333%;
	height: 100%;
}
</style>
