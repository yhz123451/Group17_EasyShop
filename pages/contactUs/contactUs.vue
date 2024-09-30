<template>
	<view>
		<view class="cu_note">
			Contact Us
		</view>
		<Lines />
		<view class="contact-us">
			<view class="info-item1">
				If you have any questions, please contact us!
			</view>
		  <view class="info-item">
			<text class="label">Develop Group: </text>
			<text class="value"> CashInfinity</text>
		  </view>
		  <view class="info-item">
			<text class="label">Contact Email:</text>
			<text class="value">CashInfinity@gmail.com</text>
		  </view>
		  <view class="info-item">
			<text class="label">Address:</text>
			<text class="value"> Building 6, University of Wollongong, Northfields Avenue, Wollongong, NSW, 2522</text>
		  </view>
		  <view class="info-item">
		  	<text class="label">Supervisor/Coodinator:</text>
		  	<text class="value">John Le, Chau Nguyen</text>
		  </view>
		  <view class="info-item">
			<text class="label">Group Leader:</text>
			<text class="value">Haozhe Yuan</text>
		  </view>
		</view>
	</view>
</template>

<script>
	import Lines from "@/common/Line.vue"
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Lines,
		},
		methods: {
			
		}
	}
</script>

<style>
.cu_note {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
}
.contact-us {
  /* padding: 20rpx;
  margin-top: 500rpx;
  text-align: left;
  margin-left: 100rpx; */
}
.info-item1 {
	margin-top: 20rpx;
	margin-bottom: 40rpx;
	font-size: 40rpx;
	font-style: italic;
}
.contact-info {
  background-color: #f5f5f5;
  padding: 20rpx;
  border-radius: 10rpx;
}

.info-item {
  margin-bottom: 20rpx;
}

.label {
  font-weight: bold;
  font-size: 30rpx;
}

.value {
  color: #333;
  font-size: 28rpx;
}
</style>
