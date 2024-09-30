<template>
	<view class="tabbar">
		<view class="tab" v-for="(item,index) in tabbarList" :key="index" @click="navigatorTo(item.pagePath)">
			<image v-if="item.pagePath === currentPage"  :src="item.selectedIconPath" mode=""></image>
			<image  v-else  :src="item.iconPath" mode=""></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentPage:{
				type:String,
				default:'index'
			}
		},
		data () {
			return {
				tabbarList:[
					{
						"pagePath": "index",
						"iconPath": "/static/image/tabbar/home.png",
						"selectedIconPath": "/static/image/tabbar/home1.png",
						"text": "Home"
					}, {
						"pagePath": "search",
						"iconPath": "/static/image/tabbar/search.png",
						"selectedIconPath": "/static/image/tabbar/search1.png",
						"text": "Search"
					}, {
						"pagePath": "wishlist",
						"iconPath": "/static/image/tabbar/like.png",
						"selectedIconPath": "/static/image/tabbar/like1.png",
						"text": "Wishlist"
					}, {
						"pagePath": "account",
						"iconPath": "/static/image/tabbar/avatar.png",
						"selectedIconPath": "/static/image/tabbar/avatar1.png",
						"text": "Account"
					}
				]
			}
		},
		methods: {
			navigatorTo(e){
				if(e=='account' || e=='wishlist') {
					this.navigateTo({
						url: `../../pages/${e}/${e}`,
						animationType:"fade-in",
						animationDuration:0,
					})
				}else {
					uni.redirectTo({
						url: `../../pages/${e}/${e}`
					})
				}
			}
		}
	}
</script>

<style scoped>
.tabbar {
	border-bottom: 2rpx solid #CED8B7;
	background-color: #fff;
	z-index: 9999;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 120rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.tab {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
image {
	width: 50rpx;
	height: 50rpx;
}
.text {
	font-size: 28rpx;
}
</style>