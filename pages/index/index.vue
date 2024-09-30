<template>
    <view class="index">
		<div class="Noticeicon" v-if="loginStatus" @click="goAccount">
		  <img :src="iconSrc" alt="icon">
		</div>
        <!-- 顶部导航栏 -->
<!--        <scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIntoIndex">
            <view 
                :id="'top'+index"
                v-for='(item, index) in topBar'
                :key='index'
                class="scroll-item"
                @tap="changeTab(index)">
                <text :class="topBarIndex == index ? 'f_active_color' : 'f_color'">{{item.name}}</text>
            </view>
        </scroll-view> -->
        
        <!-- 内容区域 -->
        <swiper @change='onChangeTab' :current="topBarIndex" :style="'height:' + indexHeight + 'px;'">
            <swiper-item
            v-for='(item, index) in newTopBar'
            :key='index'>
			
				<scroll-view scroll-y="true" :style="'height:' + indexHeight + 'px;'" @scrolltolower="loadMore(index)">
					<block v-for='(k, i) in item.data' :key="i">
					    <!-- 推荐模块 -->
					    <IndexSwiper v-if='k.type === "swiperList"' :dataList='k.data'></IndexSwiper>
					    <template v-if='k.type === "recommendList"'>
					        <Recommend :dataList='k.data'></Recommend>
					        <Card CardTitle='GuessLike'></Card>
					    </template>
					    
					    <!-- 其他模块 -->
					    <Banner v-if='k.type==="bannerList"' :dataList='k.imgUrl'></Banner>
					    <template v-if='k.type==="iconsList"'>
					        <Icons :dataList='k.data'></Icons>
					        <Card CardTitle='HotItems'>Hot Items</Card>
					    </template>
					    <template v-if='k.type==="hotList"'>
					        <Hot :dataList='k.data'></Hot>
					        <Card CardTitle='RecommendShop'></Card>
					    </template>
					    <template v-if='k.type==="shopList"'>
					        <Shop :dataList='k.data'></Shop>
					        <Card CardTitle='RecommendItem'></Card>
					    </template>
					    <!-- <CommodityList></CommodityList> -->
					    <CommodityList v-if='k.type === "commodityList"' :dataList='k.data'></CommodityList>
					</block>
					<view class="load-text f_color">
						{{item.loadText}}
					</view>
				</scroll-view>
                
            </swiper-item>
        </swiper>
		<Tabber currentPage='index'></Tabber>
    </view>
</template>

<script>
	import $http from '@/common/api/request.js'
    import IndexSwiper from "@/components/index/IndexSwiper.vue"
    import Recommend from "@/components/index/Recommend.vue"
    import Card from "@/components/commons/Card.vue"
    import CommodityList from "@/components/commons/CommodityList.vue"
    import Banner from "@/components/index/Banner.vue"
    import Icons from "@/components/index/Icons.vue"
    import Hot from "@/components/index/Hot.vue"
    import Shop from "@/components/index/Shop.vue"
	import Tabber from "@/components/commons/Tabbar.vue"
	import {mapState} from "vuex"

    export default {
        data() {
            return {
                topBarIndex: 0,
                scrollIntoIndex: 'top0',
                indexHeight: 0,
                topBar: [],
                newTopBar: [],
				iconSrc:"../../static/image/icon/noMessage.png"
            }
        },
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
			})
		},
        components: {
            IndexSwiper,
            Recommend,
            Card,
            CommodityList,
            Banner,
            Icons,
            Hot,
            Shop,
			Tabber,
        },
        onLoad() {
            this.__init();
        },
		mounted() {
			this.updateNotice();
			this.getNoticeList();
		},
		onReady() {
			this.getIndexHeight();
			uni.getSystemInfo({
				success: (res) => {
					this.indexHeight = res.windowHeight - this.getIndexHeight();
				}
			})
		},
		// onNavigationBarButtonTap(e) {
		// 	if(e.float=='right'){
		// 		uni.navigateTo({
		// 			url:'/pages/account/account'
		// 		})
		// 	}
		// },
        methods: {
            __init() {
				
				$http.request({
					url:"/index_list/1/data/1"
				}).then((res)=>{
					this.topBar = res.topBar;
					this.newTopBar = this.initData(res); 
				}).catch(()=>{
					console.error("Request Failed:", err);
					uni.showToast({
						title:'Request Failed',
						icon:'none'
					})
				});
				
				// setInterval(() => {
				//   this.updateNotice();
				// }, 1000*60); // 每隔一秒执行一次
            },
			//添加数据
            initData(res) {
                let arr = [];
                for (let i = 0; i < this.topBar.length; i++) {
                    let obj = { 
						data: [],
						load: "first", 
						loadText:"More Information..."
					};
                    if (i == 0) {
                        obj.data = res.data;
                    }
                    arr.push(obj);
                }
                return arr;
            },
			//点击顶栏
            changeTab(index) {
                if (this.topBarIndex === index) {
                    return;
                }
                this.topBarIndex = index;
                this.scrollIntoIndex = 'top' + index;
				//每一次滑动赋值为first
				if( this.newTopBar[this.topBarIndex].load==="first"){
					this.addData();
				}
            },
			//对应滑动
            onChangeTab(e) {
                this.changeTab(e.detail.current);
            },
			//兼容可视区域高度(兼容苹果和安卓系统)
			getIndexHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system === 'ios') {
					return 44+res.statusBarHeight;
				}else if( system==='android') {
					return 48+res.statusBarHeight;
				}else {
					return 0;
				}
			},
            //对应显示不同数据
            addData(callback){
                let index = this.topBarIndex;
                let id = this.topBar[index].id;
                let page = Math.ceil(this.newTopBar[index].data.length / 5) + 1;
				console.log(page);
				$http.request({
					url:'/index_list/'+id+'/data/'+page+''
				}).then((res)=>{
					this.newTopBar[index].data = [...this.newTopBar[index].data,...res];
				}).catch(()=>{
					// uni.showToast({
					// 	title:'Request Failed',
					// 	icon:'none'
					// })
				})
				//当请求结束后重新赋值
				this.newTopBar[index].load='last';
				
				if(typeof callback==='function'){
					callback();
				}
            },
			//上拉加载更多
			loadMore(index){
				this.newTopBar[index].loadText = 'loading...';
				this.addData(()=>{
					this.newTopBar[index].loadText = 'More Information...';
				})
			},
			updateNotice(){
				console.log("刷新通知")
				let tuserInfo = uni.getStorageSync('userInfo')
				if (tuserInfo) {
					let userInfo = JSON.parse(tuserInfo)
					$http.request({
						url:"/checkWishPrice",
						data:{
							userId:userInfo.id,
						}
					}).then((res)=>{
						console.log(res)
					}).catch((err)=>{
						console.error("Request Failed:", err);
					})
				}
			},
			getNoticeList(){
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
						if(res.data !== null){
							this.iconSrc = "../../static/image/icon/newMessage.png";
						}else{
							
							this.iconSrc = "../../static/image/icon/noMessage.png";
						}
						console.log(res.data)
					}).catch((err)=>{
						console.error("Request Failed:", err);
					})
				}
			},
			goAccount(){
				uni.navigateTo({
					url:"/pages/account/account"
				})
			}
        }
    }
</script>

<style scoped>
    .scroll-content {
        width: 100%;
        height: 80rpx;
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch; /* for smooth scrolling on iOS */
    }

    .scroll-content::-webkit-scrollbar {
        display: none; /* Hide the scrollbar for Chrome, Safari, and Opera */
    }

    .scroll-content {
        -ms-overflow-style: none; /* Hide the scrollbar for Internet Explorer and Edge */
        scrollbar-width: none; /* Hide the scrollbar for Firefox */
    }

    .scroll-item {
        display: inline-block;
        padding: 10rpx 30rpx;
        font-size: 32rpx;
    }

    .f_active_color {
        padding: 10rpx 0;
        border-bottom: 8rpx solid #E5E9DB;
    }

    .f_color {
        color: #000;
    }
	
	.load-text {
		border-top: 2rpx solid #E5E9DB;
		line-height: 60rpx;
		text-align: right;
	}
	
	.Noticeicon {
		position: fixed;
		top: 5rpx; /* 调整图片距顶部的距离 */
		right: 0rpx; /* 水平居中 */
		transform: translateX(-50%);
		z-index: 999; /* 确保图片在最顶层 */
	}
	
	.Noticeicon img {
	  width: 40px; /* 图标宽度 */
	}
</style>
