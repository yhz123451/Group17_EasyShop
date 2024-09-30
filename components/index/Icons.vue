<template>
	<view class="icons">
		<view class="icons-item" v-for="(item, index) in dataList" :key="index">
			<image class="icons-img" :src="item.imgUrl" mode=""></image>
			<text class="icons-name">{{ item.name }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		dataList: Array
	}
	// data() {
	// 	return {
	// 		icons: [
	// 			{ imgSrc: "../../static/image/sports/men1.jpg", name: "Men's Shows" },
	// 			{ imgSrc: "../../static/image/sports/women1.jpg", name: "Women's Shows" },
	// 			{ imgSrc: "../../static/image/sports/men2.jpg", name: "Men's shirts" },
	// 			{ imgSrc: "../../static/image/sports/women2.jpg", name: "Women's Shirts" },
	// 			{ imgSrc: "../../static/image/sports/basketball.jpg", name: "Basketball" },
	// 			{ imgSrc: "../../static/image/sports/football.jpg", name: "Football" },
	// 			{ imgSrc: "../../static/image/sports/pingpang.jpg", name: "Pingpang" },
	// 			{ imgSrc: "../../static/image/sports/badminton.jpg", name: "Badminton" }
	// 		]
	// 	}
	// }
}
</script>

<style scoped>
.icons {
	display: flex;
	flex-wrap: wrap;
}
.icons-item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 30rpx;
	font-size: 20rpx;
}
.icons-img {
	width: 110rpx;
	height: 110rpx;
	border-radius: 30rpx; /* 设置弧度 */
	margin-bottom: 10rpx; /* 设置与文字的间距 */
}
.icons-name {
	margin-top: 10rpx; /* 确保文字与图片之间有间距 */
	text-align: center;
}
</style>
