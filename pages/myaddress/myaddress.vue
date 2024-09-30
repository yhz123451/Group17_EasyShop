<template>
	<view>
		<view class="manage-address">
			Manage Address
		</view>
		
		<view class="my-path-list">
			<view class="path-list">
				<view v-for="(item,index) in list" :key='index'
						@click="toAddPath(index)">
					<view class="path-item" @click="goConfirmOrder(item)">
						<view class="item-main-name">
							<view class="item-name">{{item.name}}</view>
							<view>{{item.tel}}</view>
						</view>
						<view class="item-main">
							<view>{{item.city}}  {{item.details}} {{item.state}} {{item.postcode}}</view>
							<view class="active" v-if='item.isDefault'>Default</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="add-path">
				<view class="add-path-btn" @click="goAddAddress">Add new address</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				isSelectedPath:false,
				// list:[]
			}
		},
		computed: {
			...mapState({
				
				list:state=>state.address.list
			}),
		},
		onLoad(e) {
			if(e.type==='selectedPath'){
				this.isSelectedPath = true;
			}
			this.__initAddress();
		},
		methods: {
			...mapMutations(['updateAddressList']),
			//初始化，请求收获地址接口
			__initAddress(){
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				$http.request({
					url:"/selectAddress",
					data:{
						userId:userInfo.id,
					}
				}).then((res)=>{
					console.log(res);
					this.updateAddressList(res)
				}).catch(()=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none'
					})
				})
			},
			//修改
			toAddPath(index){
				let pathobj = JSON.stringify({
					index:index,
					item:this.list[index]
				})
				uni.navigateTo({
					url:"/pages/newaddress/newaddress?data="+pathobj+""
				})
			},
			//新增
			goAddAddress(){
				uni.navigateTo({
					url:"/pages/newaddress/newaddress"
				})
			},
			// 返回确认订单页面(如果是从确认订单过来则执行以下代码)
			goConfirmOrder(item){
				if(this.isSelectedPath){
					//页面传值
					uni.$emit("selectPathItem",item)
					// 返回上一页
					uni.navigateBack({
						delta:1
					})
				}
			}
		}
	}
</script>

<style scoped>
.manage-address {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
}
.path-list {
	padding-left: 20rpx;
}
.path-item {
	padding: 10rpx;
	border-bottom: 2rpx solid #E5E9DB;
}
.item-main-name {
	display: flex;
}
.item-main {
	display: flex;
	justify-content: space-between;
}
.item-name {
	padding-right: 20rpx;
}
.active {
	padding: 2rpx 6rpx;
	background-color: #E5E9DB;
	color: #fff;
	border-radius: 10rpx;
	padding-right: 10rpx;
	font-size: 24rpx;
}
.add-path {
	padding: 40rpx 0;
	width: 100%;
	display: flex;
	justify-content: center;
}
.add-path-btn {
	border: 4rpx solid #E5E9DB;
	color: #E5E9DB;
	border-radius: 30rpx;
	padding: 6rpx 60rpx;
}
</style>
