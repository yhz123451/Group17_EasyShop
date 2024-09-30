<template>
	<view class="details">
		<!-- 商品图 -->
		<view  class="details-img">
			<image :src="goodsContent.imgUrl" mode=""  class="img"></image>
		</view>
		<!-- price和name -->
		<view class="details-goods">
			<view class="goods-name">
				${{goodsContent.name}}
			</view>
			<view class="goods-price">
				${{goodsContent.price}}
			</view>
			<!-- <view class="goods-oprice">
				${{goodsContent.oprice}}
			</view> -->
		</view>
		<view class="product-source">
			<view>AMAZON price：
				<a :href="goodsContent.amazon_link" target="_blank" class="nav-more">${{ goodsContent.amazon_price }}</a>
			</view>
			<view>EBAY price：
				<a :href="goodsContent.ebay_link" target="_blank" class="nav-more">${{ goodsContent.ebay_price }}</a>
			</view>
		</view>
		<!-- 商品详情 -->
	<!-- 	<view>
			<view class="goods-text">
				<text>The Air Jordan 1 Retro High remakes the classic sneaker, giving you a fresh look with a familiar feel. Premium materials with new colours and textures give modern expression to an all-time favourite.</text><br /><br /><br />
				<text>Colour Shown: White/Green Glow/Black</text><br />
				<text>Style: DZ5485-130</text><br />
			</view>
		</view> -->
		<!-- 商品列表 -->
		<Card CardTitle="More Recommendations"></Card>
		<CommodityList :dataList="dataList"></CommodityList>
		<!-- 商品底部 -->
		<view class="details-foot">
			<image src="../../static/image/tabbar/like.png" mode="" class="foot-img"  @click="goWishList"></image>
			<view class="add-wishlist"  @click="showPop"><button class="button">Add to Wishlist</button></view>
		</view>
		<!-- 底部弹出层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent=" ">
			<!-- 蒙层 -->
			<view class="pop-mask" @click="hidePop"></view>
			<!-- 内容 -->
			<view class="pop-box" :animation="animationData">
				<view>
					<image  class="pop-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
				<view class="pop-num">
					<view>Quantity</view>
					<UniNumberBox
						:value="num"
						@change="changeNumber"
					></UniNumberBox>
				</view>
				<view class="pop-confirm" @click="addCart">
					Confirm
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Card from "@/components/commons/Card.vue"
	import CommodityList from "@/components/commons/CommodityList.vue"
	import UniNumberBox from "@/components/uni/uni-number-box/components/uni-number-box/uni-number-box.vue"
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				isShow: false,
				goodsContent:{},
				animationData:{},
				num:1,
				dataList: []
			}
		},
		components: {
			Card,
			CommodityList,
			UniNumberBox
		},
		onLoad(e) {
			this.getData(e.id);
			this.getMoreRecommendations();
		},
		onBackPress() {
			if(this.isShow){
				this.hidePop();
				return true;
			}
		},
		// 点击分享
		onNavigationBarButtonTap(e) {
			if(e.type==='share'){
				uni.share({
					provider:"weixin",
					type: 0,
					scene: "WXSceneSession",
					title: this.goodsContent.name,
					href:"http://127.0.0.1:8080/#/pages/details/details?id="+this.goodsContent.id+"",
					imageUrl:this.goodsContent.imgUrl,
					success: function (res) {
						title:"Success"
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			}
		},
		methods: {
			...mapMutations(['addShopList']),
			//改变添加至wishlist的数量
			changeNumber(value){
				this.num = value;
			},
			//请求商品
			getData(id){
				$http.request({
					url:"/goods/id",
					data:{
						id:id
					}
				}).then((res)=>{
					this.goodsContent = res[0];
				}).catch((err)=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none'
					})
				})
			},
			showPop(){
				var animation = uni.createAnimation({
				      duration: 200,
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				this.isShow = true;
				
				setTimeout(()=>{
					animation.translateY(0).step();
					this.animationData = animation.export();
				},100)
			},
			hidePop(){
				var animation = uni.createAnimation({
				      duration: 200,
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				this.isShow = false;
				
				setTimeout(()=>{
					animation.translateY(0).step();
					this.animationData = animation.export();
				},100)
			},
			//跳转到wishlist页面
			goWishList(){
				uni.navigateTo({
					url:"/pages/wishlist/wishlist"
				})
			},getMoreRecommendations(){
				$http.request({
					url:"/getMoreRecommendations",
				}).then((res)=>{
					console.log(res)
					this.dataList = res
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
			},
			//加入wishlist
			addCart(){
				let goods = this.goodsContent;
				this.goodsContent['checked'] = false;
				this.goodsContent['num'] = this.num;
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				// this.addShopList(goods);
				
				$http.request({
					url:"/addShop",
					method:"POST",
					data:{
						userId:userInfo.id,
						goodId:goods.id,
						num:this.num,
					}
				}).then((res)=>{
					if(res.success){
						this.hidePop();
						uni.showToast({
							title:"Add successfully",
							icon:"none"
						})
					}else{
						uni.showToast({
							title:this.msg,
							icon:"none",
						})
					}
				}).catch(()=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none',
					})
				})
			}
		}
	}
</script>

<style scoped>
.product-source {
	text-align: center;
	margin-top: 20px;
	margin-bottom: 20px;
}
.details{
	padding-bottom: 120rpx;
}
.details-img {
	width: 100%;
	height: 700rpx;
}
.img {
	width: 100%;
	height: 700rpx;
}
.details-goods{
	text-align: center;
	font-weight: bold;
	font-size: 36rpx;
	padding: 10rpx 0;
}
.goods-price{
	font-size: 32rpx;
}
.goods-oprice {
	font-size: 32rpx;
	font-weight: 500;
	text-decoration: line-through;
}
.goods-text {
	text-align: center;
	font-size: 30rpx;
	font-weight: 400;
}
.details-foot {
	position: fixed;
	left: 0;
	bottom: 0rpx;
	width: 100%;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #E5E9DB;
}
.foot-img {
	width: 70rpx;
	height: 70rpx;
	border-radius: 100%;
	background-color: #E5E9DB;
	text-align: center;
	margin: 0 60rpx;
}
.add-wishlist {
	margin: 0 60rpx;
	font-weight: 500;
}
.button {
	height: 100%;
	background-color: #CED8B7;
}
.pop {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
}
.pop-mask {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}
.pop-box {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 250px;
	background-color: #fff;
}
.pop-img {
	width: 260rpx;
	height: 260rpx;
}
.pop-confirm {
	line-height: 100rpx;
	background-color: #E5E9DB;
	color: #000;
	text-align: center;
	font-weight: 500;
	bottom: 0;
}
.pop-num {
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
}
</style>
