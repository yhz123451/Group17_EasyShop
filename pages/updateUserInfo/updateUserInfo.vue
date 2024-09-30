<template>
  <view>
	<view style="display: flex; flex-direction: column; align-items: center;margin-top: 300rpx;">
		<image v-if="imageUrl" :src="imageUrl" style="width: 200px; height: 200px;"  @click="chooseAndUploadImage"/>
		<view style="display: flex; align-items: center; margin-top: 10px;">
			<text style="margin-right: 10px;">Name:</text>
			<input type="text" style="width: 100px; padding: 10px;" v-model="userInfo.nickName">
		</view>
	    <view @click="confirmChanges" style="width: 150px; padding: 10px; background-color: #28a745; color: #fff; text-align: center; margin-top: 10px;">Confirm</view>
	</view>
  </view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				imageUrl: '' // 存储选择的图片路径
			};
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
				userInfo:state=>state.user.userInfo,
			}),
		},onLoad() {
			this.imageUrl= this.userInfo.imgUrl
		},
	  methods: {
			...mapMutations(['doUpdateUserInfo']),
			chooseAndUploadImage() {
			  // 选择图片
			  uni.chooseImage({
				count: 1, // 默认9，设置图片的数量
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: (chooseImageRes) => {
				  const tempFilePaths = chooseImageRes.tempFilePaths;
				  const uploadTask = uni.uploadFile({
					url: 'http://127.0.0.1:3000/upload', // 服务器上传接口
					filePath: tempFilePaths[0],
					name: 'file', // 必须填写，后台用来接收文件
					formData: {
					  'user': 'test' // 其他要上传的参数
					},
					success: (uploadFileRes) => {
					  console.log('upload success:', uploadFileRes);
						this.imageUrl = uploadFileRes.data
					},
					fail: (uploadFileErr) => {
					  console.error('upload fail:', uploadFileErr);
					}
				  });
				  uploadTask.onProgressUpdate((res) => {
					console.log('上传进度' + res.progress + '%');
				  });
				},
				fail: (chooseImageErr) => {
				  console.error('choose image fail:', chooseImageErr);
				}
			  });
			},confirmChanges(){
				console.log(this.userInfo.nickName,this.imageUrl)
				$http.request({
					url:"/updateUserInfo",
					method:"POST",
					data:{
						userId:this.userInfo.id,
						nickName:this.userInfo.nickName,
						imgUrl:this.imageUrl
					}
				}).then((res)=>{
					this.doUpdateUserInfo(this.imageUrl);
				}).catch((err)=>{
					console.error("Request Failed:", err);
				})
			}
		}
	};
</script>