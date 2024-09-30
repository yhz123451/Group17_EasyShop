<template>
  <view class="shop">
    <view class="shop-item" v-for="(item,index) in dataList" :key="index">
      <view class="shop-big">
        <image class="shop-big" :src="item.bigUrl" mode="" style="border-radius: 0rpx;"></image>
      </view>
      <scroll-view scroll-x="true" class="scroll-content">
        <view class="scroll-item">
          <Commodity :dataList="item.data" wrap="no-wrap" itemW="360rpx" bigH="360rpx" cornerRadius="0rpx"></Commodity>
        </view>
      </scroll-view>
    </view>
	
	<!-- <view class="shop-item">
	  <view class="shop-big">
	    <image class="shop-big" src="../../static/image/sports/adidas.jpg" mode="" style="border-radius: 0rpx;"></image>
	  </view>
	  <scroll-view scroll-x="true" class="scroll-content">
	    <view class="scroll-item">
	      <Commodity :dataList="adidasList" wrap="no-wrap" itemW="360rpx" bigH="360rpx" cornerRadius="0rpx"></Commodity>
	    </view>
	  </scroll-view>
	</view> -->
  </view>
</template>

<script>
import Commodity from "../commons/Commodity.vue"
export default {
	props:{
		dataList: Array
	},
  // data() {
  //   return {
  //     nikeList: [
  //       {
  //         id: 1,
  //         imgUrl: "../../static/image/sports/nike1.png",
		//   name: "Air Jordan 1 Mid",
		//   classification: "Women's Shoes",
		//   price: "$132.99",
  //       },
  //       {
  //         id: 2,
  //         imgUrl: "../../static/image/sports/nike2.png",
  //         name: "Air Jordan 1 Low SE",
  //         classification: "Men's Shoes",
  //         price: "$170",
  //       },
  //       {
  //         id: 3,
  //         imgUrl: "../../static/image/sports/nike3.png",
  //         name: "Air Jordan Legacy 312 Low",
  //         classification: "Men's Shoes",
  //         price: "$210",
  //       },
  //       {
  //         id: 4,
  //         imgUrl: "../../static/image/sports/nike4.png",
  //         name: "Jumpman MVP",
  //         classification: "Women's Shoes",
  //         price: "$168.99",
  //       },
  //       {
  //         id: 5,
  //         imgUrl: "../../static/image/sports/nike5.png",
  //         name: "Jumpman MVP",
  //         classification: "Men's Shoes",
  //         price: "$230",
  //       },
  //     ],
	 //  adidasList: [
	 //    {
	 //      id: 1,
	 //      imgUrl: "../../static/image/sports/adidas1.jpg",
	 //      name: "adidas Galaxy 6 Mens",
	 //      classification: "Running Shoes",
	 //      price: "$99.99",
	 //    },
	 //    {
	 //      id: 2,
	 //      imgUrl: "../../static/image/sports/adidas2.jpg",
	 //      name: "HOKA Clifton 9 Mens",
	 //      classification: "Running Shoes",
	 //      price: "$259.99",
	 //    },
	 //    {
	 //      id: 3,
	 //      imgUrl: "../../static/image/sports/adidas3.jpg",
	 //      name: "adidas BYW Select",
	 //      classification: "Basketball Shoes",
	 //      price: "$219.99",
	 //    },
	 //    {
	 //      id: 4,
	 //      imgUrl: "../../static/image/sports/adidas4.jpg",
	 //      name: "adidas Adizero Select 2.0",
	 //      classification: "Basketball Shoes",
	 //      price: "$159.99",
	 //    },
	 //    {
	 //      id: 5,
	 //      imgUrl: "../../static/image/sports/adidas5.jpg",
	 //      name: "adidas Trae Young 3 Calm",
	 //      classification: "Basketball Shoes",
	 //      price: "$219.99",
	 //    },
	 //  ]
  //   }
  // },
  components: {
    Commodity,
  }
}
</script>

<style scoped>
.shop-big {
  width: 100%;
  height: 350rpx;
  border-radius: 20rpx; /* 给大的图片加圆角 */
}
.scroll-content {
  width: 100%;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* 为平滑滚动添加 */
  overflow: hidden; /* 隐藏滚动条 */
}
.scroll-item {
  display: inline-block;
  margin-bottom: 30rpx; /* 设置每个商店项的底部间距 */

  padding-bottom: 30rpx; /* 增加额外的填充，以确保横线和内容之间有足够的空间 */
}
</style>
