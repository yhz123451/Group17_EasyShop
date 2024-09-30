<template>
	<view>
		<view class="search">
			<Lines />
			
			<view class="search-item">
				<view class="search-title">
					<view class="f_color">Recent searches</view>
					<view class="icon-container" @click="clearHistory"> <!-- //这里等iconfont修复 -->
						<image src="../../static/image/icon/delete.png" mode="" class="delete"></image>
					</view>
				</view>
				<view v-if='searchData.length > 0'>
					<view class="search-name" v-for="(item, index) in searchData" :key="index" @click="toSearchList(item)">{{item}}</view>
				</view>
				<view v-else class="search-end">No search result</view>
			</view>
			
			<view class="search-item">
		<!-- 		<view class="search-title">
					<view class="f_color">Popular searches</view>
				</view>
				<view>
					<view class="search-name">Book 1 Haven</view>
					<view class="search-name">mi car</view>
					<view class="search-name">adidas running shoes</view>
				</view> -->
			</view>
		</view>
		<view class="rd">
			<Card CardTitle="More Recommendations"></Card>
			<CommodityList :dataList="dataList"></CommodityList>
		</view>
		<Tabber currentPage='search'></Tabber>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/common/Line.vue'
	import Tabber from "@/components/commons/Tabbar.vue"
	import Card from "@/components/commons/Card.vue"
	import CommodityList from "@/components/commons/CommodityList.vue"
	export default {
		data() {
			return {
				keyword: '',
				//记录搜索过的搜索词
				searchData: [],
				dataList: [
				]
			}
		},
		components: {
			Lines,
			Tabber,
			Card,
			CommodityList
		},
		//页面加载的时候
		onLoad() {
			uni.getStorage({
				key: "searchData",
				success: (res) => {
					this.searchData = JSON.parse(res.data)
				},
				fail: () => {
					this.searchData = [];
				}
			}),
			this.getMoreRecommendations()
		},
		// 监听input内容
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text;
		},
		// 点击顶栏中的搜索
		onNavigationBarButtonTap(e) {
			this.search();
		},
		// 箭头键盘上的搜索按钮
		onNavigationBarSearchInputConfirmed() {
			this.search();
		},
		methods: {
			search() {
				if (this.keyword === "") {
					return uni.showToast({
						title: "Input cannot be empty",
						icon: "none"
					});
				} else {
					this.toSearchList(this.keyword);
				}
				uni.hideKeyboard();
				this.addSearch();
			},
			//点击搜索过的lable进入搜索页面
			toSearchList(item){
				uni.navigateTo({
					url: "/pages/searchlist/searchlist?keyword=" +item
				});
			},
			// 记录最近的搜索词
			addSearch() {
				let idx = this.searchData.indexOf(this.keyword);
				if (idx < 0) {
					this.searchData.unshift(this.keyword);
				} else {
					this.searchData.unshift(this.searchData.splice(idx, 1)[0]);
				}
				//本地存储搜索词
				uni.setStorage({
					key: "searchData",
					data: JSON.stringify(this.searchData)
				})
			},
			// 清除搜索记录
			clearHistory() {
				uni.showModal({
					title: "Notification",
					content: "Clear search history?",
					cancelText: 'Cancel',
					confirmText: "Confirm",
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: "searchData"
							});
							this.searchData = [];
						}
					}
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
			}
		}
	}
</script>

<style scoped>
	.search-item {
		padding: 20rpx;
	}
	.search-title {
		display: flex;
		justify-content: space-between;
	}
	.icon-container {
		display: flex;
		align-items: center;
	}
	.delete {
		width: 40rpx; /* 修改为合适的宽度 */
		height: 40rpx; /* 修改为合适的高度 */
		cursor: pointer;
	}
	.search-name {
		padding: 4rpx 24rpx;
		background-color: #E5E9DB;
		display: inline-block;
		border-radius: 30rpx;
		margin: 10rpx;
	}
	.search-end {
		text-align: center;
	}
	.rd {
		margin-top: 60rpx;
	}
</style>
