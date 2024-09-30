<template>
  <view class="commodity" :style="{ flexWrap: wrap }">
    <!-- Individual Item Component -->
    <view class="commodity-item"
      v-for="(item, index) in dataList"
      :key="index"
      :style="{ width: itemW }"
	  @click="goDetails(item.id)">
      <image class="commodity-img" :src="item.imgUrl" :style="{ borderRadius: cornerRadius, height: bigH }" mode=""></image>
      <view class="commodity-content">
        <text class="commodity-name">{{item.name}}</text> <br>
        <text class="classification">{{item.classification}}</text> <br>
        <text class="price">${{item.price}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Commodity',
  props: {
    dataList: {
      type: Array,
      required: true
    },
    itemW: {
      type: String,
      default: '375rpx'
    },
    bigH: {
      type: String,
      default: '375rpx'
    },
    wrap: {
      type: String,
      default: 'wrap'
    },
    cornerRadius: {
      type: String,
      default: '20rpx'
    }
  },
  methods: {
	  goDetails(id){
		  uni.navigateTo({
		  	url:"/pages/details/details?id="+id
		  })
	  }
  }
}
</script>

<style scoped>
.commodity {
  display: flex;
}
.commodity-item {
  padding-bottom: 20rpx;
}
.commodity-img {
  width: 100%;
  /* 可以在这里设置默认圆角 */
  border-radius: 20rpx;
}
.commodity-content {
  text-align: left; /* 保持其他文本左对齐 */
}
.commodity-name {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: bold;
  word-break: break-all;
  padding: 5rpx 20rpx;
}
.classification {
  text-align: left;
  font-style: italic;
}
.price {
  text-align: center;
  padding: 2rpx 5rpx;
  font-size: 30rpx;
}
</style>
