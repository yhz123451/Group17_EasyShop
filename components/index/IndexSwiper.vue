<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(item, index) in dataList" :key="index">
			<view class="swiper-item">
				<a :href="item.linkUrl"  target="_blank">
					
				<image class="swiper_img" :src="item.imgUrl" mode="aspectFill"></image>
				</a>
			</view>
		</swiper-item>
	</swiper>
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
.swiper {
	width: 100%;
	height: 800rpx;
}
.swiper-item {
	position: relative;
	width: 100%;
	height: 100%; 
}
.swiper_img {
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
