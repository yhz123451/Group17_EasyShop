<template>
	<view class="account">
		<!-- 头部 -->
		<view class="account-header">
			<view class="header-main">
				<view class="header-config" @click="goConfig">
					<image src="../../static/image/icon/setting.png" mode="" class="setting-img"></image>
				</view>
				<view class="logo">
					<image class="logo-img" src="../../static/image/account/logo.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="header-name" @click="goUpdateUserInfo">
			<image class="photo" :src="loginStatus ? userInfo.imgUrl:'../../static/image/icon/setting.png'" mode=""></image>
			<view class="nm">
				{{loginStatus ? userInfo.nickName : "User"}}
			</view>
		</view>
		<Lines />
		<!-- 订单 -->
		<view class="order">
			<view class="order-title" @click="goOrder">
				<view>My Order</view>
				<view>Orders > </view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image src="../../static/image/icon/fk.png" mode="" class="order-img"></image>
					<view>Payment pending</view>
				</view>
				<view class="order-item">
					<image src="../../static/image/icon/fh.png" mode="" class="order-img"></image>
					<view>Payment pending</view>
				</view>
				<view class="order-item">
					<image src="../../static/image/icon/sh.png" mode="" class="order-img"></image>
					<view>Payment pending</view>
				</view>
				<view class="order-item">
					<image src="../../static/image/icon/pj.png" mode="" class="order-img"></image>
					<view>Payment pending</view>
				</view>
				<view class="order-item">
					<image src="../../static/image/icon/tk.png" mode="" class="order-img"></image>
					<view>Payment pending</view>
				</view>
			</view>
		</view>
		
		<Lines />
		
		<!-- 提醒功能 -->
		<view class="notice">
			<view class="notice-head">
				<view class="notice-logo">
					<image src="../../static/image/icon/notification.png" mode="" class="notice-img"></image>
				</view>
				<view class="nt">Notification</view>
			</view>
			
			<!-- <view class="notification" v-for="(item,index) in noticeList" :key="index">
				<view class="notice-name">
					Item name
				</view>
				<view class="notice-info">
					price changed
				</view>
				<view class="notice-source">
					source
				</view>
			</view> -->
		
			<view class="notification" v-for="(item, index) in noticeList" :key="index">
			  <view class="notice-name">
				{{ item.name }}
			  </view>
			  <view class="notice-info">
				{{ item.message }}
			  </view>
			  <view class="notice-changeMsg">
				{{ item.changeMsg }}
			  </view>
			  <view class="notice-source">
				{{ item.source }}
			  </view>
			</view>
		</view>
		<Tabber currentPage='account'></Tabber>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from "@/common/Line.vue"
	import {mapState} from 'vuex'
	import Tabber from "@/components/commons/Tabbar.vue"
	export default {
		data() {
			return {
				  noticeList: [
				  ]
			}
		},
		created() {
			this.getNoticeList()
		},
		components: {
			Lines,
			Tabber
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
				userInfo:state=>state.user.userInfo,
			}),
		},
		methods: {
			goConfig(){
				uni.navigateTo({
					url:"/pages/config/config"
				})
			},
			goOrder(){
				uni.navigateTo({
					url:"/pages/my-order/my-order"
				})
			},getNoticeList(){
				let tuserInfo = uni.getStorageSync('userInfo')
				if (tuserInfo) {
					let userInfo = JSON.parse(tuserInfo)
					$http.request({
						url:"/noticeList",
						data:{
							userId:userInfo.id,
						}
					}).then((res)=>{
						console.log(res.data)
						this.noticeList=res
						console.log(res.data)
					}).catch((err)=>{
						console.error("Request Failed:", err);
					})
				}
			},
			goUpdateUserInfo(){
				uni.navigateTo({
					url:"/pages/updateUserInfo/updateUserInfo"
				})
			}
		}
	}
</script>

<style scoped>
.account-header{
	position: relative;
	background-color: #E5E9DB;
	width: 100%;
	height: 450rpx;
}
.header-main {
	position: relative;
	top: 60rpx;
}
.logo {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 50rpx;
}
.logo-img {
	height: 170rpx;
	width: 520rpx;
}
.header-config{
	text-align: right;
	margin-right: 20rpx;
}
.setting-img{
	width: 70rpx;
	height: 70rpx;
}
.header-name{
	display: flex;
	left: 50%;
	margin-left: 60rpx;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.photo {
	width: 120rpx;
	height: 120rpx;
	border: 2rpx solid #000;
	border-radius: 100%;
}
.nm {
	margin-left: 30rpx;
	margin-top: 40rpx;
	font-weight: 600;
	font-size: 36rpx;
}
.order-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.order-list {
	padding: 20rpx;
	display: flex;
}
.order-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 18rpx;
}
.order-img {
	width: 60rpx;
	height: 60rpx;
}
.notice {
	margin-left: 60rpx;
	margin-right: 60rpx;
	margin-top: 20rpx;
	padding-bottom: 110rpx;
}
.notice-head {
	display: flex;
}
.notice-img {
	width: 40rpx;
	height: 40rpx;
}
.nt {
	font-size: 32rpx;
	font-weight: 600;
	margin-left: 20rpx;
}
.notification {
	width: 100%;
	height: 280rpx;
	background-color: #E5E9DB;
	box-shadow: 3px 2px 2px #E5E9DB;
	border: 2rpx solid #f7f7f7;
	margin: 20rpx 0;
}
.notice-name {
	margin-left: 30rpx;
	margin-top: 20rpx;
	font-size: 40rpx;
	font-weight: 500;
	white-space: nowrap; /* 文本不换行 */
	overflow: hidden; /* 超出部分隐藏 */
	text-overflow: ellipsis; /* 文本溢出时显示省略号 */
}
.notice-info {
	margin-left: 30rpx;
	margin-top: 10rpx;
	font-size: 36rpx;
	font-weight: 400;
}
.notice-source {
	text-align: right;
	font-size: 30rpx;
	font-weight: 600;
	/* margin-top: 98rpx; */
	margin-right: 10rpx;
}
.notice-changeMsg {
	text-align: right;
	font-size: 30rpx;
	font-weight: 600;
	margin-top: 98rpx;
	margin-right: 10rpx;
}

</style>
