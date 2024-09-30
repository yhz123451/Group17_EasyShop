<template>
	<view>
		<view class="new-address">
			Address
		</view>
		
		<view class="my-add-path">
			<view class="path-item">
				<view class="#">Name:</view>
				<input type="text" placeholder="Recipient's name"v-model="pathobj.name" />
			</view>
			
			<view class="path-item">
				<view class="#">Phone Number:</view>
				<input type="text" placeholder="Your phone number"  v-model="pathobj.tel"/>
			</view>
			
			<view class="path-item">
				<view class="#">Suburb:</view>
				<input type="text" placeholder="Suburb" v-model="pathobj.city"/>
			</view>
			
			<view class="path-item">
				<view class="#">Postcode:</view>
				<input type="text" placeholder="Postcode" v-model="pathobj.postcode"/>
			</view>
			
			<view class="path-item">
				<view class="#">State:</view>
				<input type="text" placeholder="State details" v-model="pathobj.state"/>
			</view>
			
			<view class="path-item">
				<view class="#">Address:</view>
				<input type="text" placeholder="Address details" v-model="pathobj.details"/>
			</view>
			
			<view class="path-item">
				<view class="#">Default</view>
				<radio-group name="" @change="radioChange">
					<label class="radio">
						<radio color="#E5E9DB" :checked="pathobj.isDefault"/><text></text>
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				pathobj:{
					name:"",
					tel:"",
					city:"",
					details:"",
					state:"",
					postcode:"",
					isDefault:false
				},
				i:-1,
				isStatus:false
			}
		},
		onLoad(e) {
			if(e.data){
				let result = JSON.parse(e.data);
				this.pathobj = result.item;
				this.i = result.index;
				this.isStatus = true;
			}
		},
		onNavigationBarButtonTap() {
			if(this.isStatus){
				//修改
				this.updatePathFn({
					index:this.i,
					item:this.pathobj
				})
				
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				$http.request({
					url:"/updateUserAddressInfo",
					method:"POST",
					data:{
						userId:userInfo.id,
						addressInfo:JSON.stringify(this.pathobj),
					}
				}).then((res)=>{
					console.log(res)
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
				uni.navigateBack({
					delta:1
				})
			}else{
				//新增
				
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				$http.request({
					url:"/addUserAddressInfo",
					method:"POST",
					data:{
						userId:userInfo.id,
						addressInfo:JSON.stringify(this.pathobj),
					}
				}).then((res)=>{
					console.log(res)
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
				this.createPathFn(this.pathobj)
				uni.navigateBack({
					delta:1
				})
			}
		},
		methods: {
			...mapActions(["createPathFn", "updatePathFn"]),
			radioChange(){
				this.pathobj.isDefault = !this.pathobj.isDefault;
				
			}
		}
	}
</script>

<style scoped>
.new-address {
	font-size: 36rpx;
	font-weight: 500;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
}
.my-add-path {
	padding-left: 20rpx;
}
.path-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 0;
	width: 100%;
	border-bottom: 2rpx solid #E5E9DB;
}
.path-item input {
	flex: 1;
	text-align: left;
	padding-left: 10rpx;
}
</style>
