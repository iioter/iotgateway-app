<template>
	<view>
		<u-navbar :is-back="false" title="开源工业物联网网关" title-width="300" :background="bgColor" title-color="#ffffff"
			:title-bold="true">
		</u-navbar>
		<u-swiper :list="banner" duration="2000" :circular="true" height="375"></u-swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList: [],
				bgColor: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				banner: [{
						image: 'https://user-images.githubusercontent.com/29589505/147798707-cf4de713-9bb6-48c1-88a6-ac9f703f89d2.gif',
						title: ''
					},
					{
						image: 'https://user-images.githubusercontent.com/29589505/147055534-3954039c-2723-4fc3-8981-c9ce3bb0163e.gif',
						title: ''
					},
					{
						image: 'https://user-images.githubusercontent.com/29589505/147056511-14611d19-8498-4a3c-bd67-3749ab75462f.gif',
						title: ''
					}, {
						image: 'https://user-images.githubusercontent.com/29589505/145705166-d5818557-4ba1-4e7b-b8d8-8f5f4b28868f.png',
						title: ''
					},
				],

			}
		},
		onLoad() {
			console.log('onload');
		},
		onShow() {},
		methods: {

		}
	}
</script>

<style>

</style>
