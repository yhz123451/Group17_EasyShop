<template>
	<view class="shop-list">
		<view class="shop-title">
			<view class="shop-items">
				<view :class="['shop_item', shopList.currentIndex === index ? 'active' : '']" 
					  v-for="(item, index) in shopList.data" 
					  :key="index" 
					  @tap="changeTab(index)">
					<view class="shop-text">{{item.name}}</view>
					<view class="shop-icon">
						<image :src="item.imgUrl" mode="" class="icon"></image>
					</view>
				</view>
			</view>
		</view>
		
		<Lines />
		
		<CommodityList :dataList="dataList"></CommodityList>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/common/Line.vue';
	import CommodityList from '@/components/commons/CommodityList.vue';
	export default {
		props: {
			keyword:String
		},
		data() {
			return {
				shopList: {
					currentIndex: 0,
					data: [
						{ name: "Price", imgUrl: "../../static/image/icon/finance.png", key: "price" },
						{ name: "Discount", imgUrl: "../../static/image/icon/coupon.png", key: "discount"},
						{ name: "Brand", imgUrl: "../../static/image/icon/tag.png", key: "brand"},
					]
				},
				dataList: []
			}
		},
		computed: {
			// orderBy(){
			// 	//拿到当前对象
			// 	let obj = this.shopList.data[this.shopList.currentIndex];
			// 	return {
			// 		[obj.key]
			// 	}
			// }
		},
		components: {
			Lines,
			CommodityList
		},
		mounted() {
			this.getData();
		},
		methods: {
			//请求数据
			getData(){
				$http.request({
					url:"/goods/search",
					data: {
						name:this.keyword,
						price:"asc"
					}
				}).then((res)=>{
					 this.dataList = res;
				}).catch(()=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none'
					})
				})
			},
			
			changeTab(index) {
				this.shopList.currentIndex = index;
			}
		}
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		padding: 20rpx 0;
	}
	.shop-items {
		display: flex;
		justify-content: space-around;
		width: 100%;
		max-width: 600rpx;
	}
	.shop_item {
		display: flex;
		flex-direction: row; /* 水平排列 */
		align-items: center; /* 垂直居中对齐 */
		flex: 1; /* 占据三分之一的空间 */
		justify-content: center; /* 水平居中 */
		text-align: center; /* 使文字和图标在盒子内居中 */
		margin: 0 10rpx; /* 添加左右间距 */
		padding: 10rpx;
		border-radius: 20rpx;
		transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
	}
	.shop-text {
		font-size: 28rpx;
		color: #333;
		margin-right: 10rpx; /* 确保文本和图标之间有间距 */
	}
	.icon {
		width: 40rpx;
		height: 40rpx;
	}
	.active {
		background-color: #E5E9DB; /* 背景颜色，例如金黄色 */
		color: white; /* 文本颜色变白 */
	}
</style>