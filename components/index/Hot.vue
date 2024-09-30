<template>
	<view class="hot">
		<Commodity :dataList="dataList"></Commodity>
	</view>
</template>

<script>
	import Commodity from "../commons/Commodity.vue"
	export default {
		props:{
			dataList: Array
		},
		components: {
			Commodity
		}
	}
</script>

<style>
</style>