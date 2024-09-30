<template>
	<view class="wish-list">
		
		<template v-if='list.length > 0'>
			<!-- 自定义导航 -->
			<uniNavBar title="WishList" 
			:rightText="isNavBar?'Done':'Edit'" 
			fixed="true"
			status-bar="true"
			@clickRight="isNavBar = !isNavBar"
			background-color="#E5E9DB"
			></uniNavBar>
			
			<!-- 商品内容 -->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<label class="radio" @click="selectedItem(index)">
						<radio value="" color="#E5E9DB" :checked="item.checked"/><text></text>
					</label>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color">{{item.color}}</view>
						<view class="shop-price">
							<view>${{item.price}}</view>

							<template v-if="!isNavBar">
								<view>x{{item.num}}</view>
							</template>
							
							<template v-else>
								<uniNumberBox
								:value='item.num'
								@change="changeNumber($event,index)"
								></uniNumberBox>
							</template>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 底部 -->
			<view class="shop-foot">
				<label class="radio foot-radio" @click="checkedAllFn">
					<radio value="" color="#E5E9DB" :checked="checkedAll"/><text>Selecr All</text>
				</label>
				
				<template v-if='!isNavBar'>
					<view class="foot-total">
						<view class="foot-count">Total: ${{totalCount.price.toFixed(2)}}</view>
						<view class="foot-settlement" @click="goConfirmOrder">Settlement({{totalCount.num}})</view>
					</view>
				</template>
				
				<template v-else>
					<view class="foot-total">
						<view class="foot-settlement" @click="delGoodsFnB">Delete</view>
					</view>
				</template>
			</view>
		</template>
		<template v-else>
			<uniNavBar title="WishList" status-bar="true" fixed="true" background-color="#E5E9DB"></uniNavBar>
			<view class="shop-else-list">
				<text>The wishlist is empty~~~</text>
			</view>
		</template>
		<Tabber currentPage='wishlist'></Tabber>
	</view>
	
	
	
</template>

<script>
	import $http from '@/common/api/request.js'
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	import uniNumberBox from "@/components/uni/uni-number-box/components/uni-number-box/uni-number-box.vue"
	import {mapState,mapActions,mapGetters,mapMutations} from "vuex"
	import wishlist from "@/store/modules/wishlist"
	import Tabber from "@/components/commons/Tabbar.vue"
	export default {
		data() {
			return {
				isNavBar:false,
			}
		},
		onLoad() {
			this.getWishList()
		},
		computed: {
			...mapState({
				
				list:state=>state.wishlist.list,
			}),
			...mapGetters(['checkedAll','totalCount'])
		},
		components: {
			uniNavBar,
			uniNumberBox,
			Tabber
		},
		methods: {
			...mapActions(['checkedAllFn','delGoodsFn']),
			...mapMutations(['selectedItem','getDelList']),
			...mapMutations(['addShopList','delAll']),
			changeNumber(value,index){
				this.list[index].num = value;
			},
			goConfirmOrder(){
				uni.navigateTo({
					url:"/pages/confirm-order/confirm-order"
				});
			},
			getWishList(){
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				$http.request({
					url:"/wishList",
					data:{
						userId:userInfo.id,
					}
				}).then((res)=>{
					this.delAll()
					res.forEach(item => {
						this.addShopList(item); // 对每个值调用 addShopList 方法
					});
				}).catch((err)=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none'
					})
				})
			},delGoodsFnB(){
				this.delGoodsFn()
					.then((result) => {
					  
						let delGoods = uni.getStorageSync('delGoods')
						console.log(delGoods); // 打印成功的结果
					  
					  	let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					  	$http.request({
					  		url:"/delGoods",
					  		data:{
					  			userId:userInfo.id,
								delGoodsId:delGoods
					  		}
					  	}).then((res)=>{
							console.log(res)
					  	}).catch((err)=>{
					  		console.error("Request Failed:", err);
					  	})
					  
					})
					.catch((error) => {
					  console.error(error); // 打印错误信息
					});
				
			}
		}
	}
</script>

<style scoped>
.shop-list {
	padding-bottom: 200rpx;
}
.shop-else-list {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: #E5E9DB;
	display: flex;
	align-items: center;
	justify-content: center;
}
.shop-item {
	display: flex;
	padding: 20rpx;
	align-items: center;
	background-color: #f7f7f7;
	margin-bottom: 10rpx;
}
.shop-img {
	width: 200rpx;
	height: 200rpx;
}
.shop-text {
	flex: 1;
	word-break: break-all;
	padding-left: 20rpx;
}
.shop-name {
	font-weight: bold;
	
}
.shop-color {
	font-size: 24rpx;
	font-weight: 500;
}
.shop-price {
	display: flex;
	justify-content: space-between;
}
.shop-foot {
	border-top: 2rpx #E5E9DB;
	background-color: #f7f7f7;
	position: fixed;
	bottom: 120rpx;
	left: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.foot-radio {
	padding-left: 20rpx;
}
.foot-total {
	display: flex;
}
.foot-count {
	line-height: 100rpx;
	padding: 0 20rpx;
}
.foot-settlement {
	background-color: #E5E9DB;
	color: #fff;
	padding: 0 30rpx;
	line-height: 100rpx;
}

</style>