<template>
	<view class="px-20 d-flex j-sb flex-wrap u-m-t-40">
		<view class="shadow u-m-b-30" v-for="(i,idx) in 4" :key="idx" style="border-top-left-radius: 10rpx; border-top-right-radius: 10rpx; width: 345rpx;">
			<image src="/static/logo.png" class="img-345"></image>
			<view class="px-10">
				<view class="u-line-1 u-font-28 font-weight black-color my-10">APP定制开发商城交互11111111111</view>
				<view class="u-line-1 u-font-24 gray-color">APP定制开发商城交互</view>
			</view>
			<view class="d-flex j-sb px-20 u-m-t-5">
				<view class="d-flex a-end">
					<h-price></h-price>
					<h-oprice></h-oprice>
					<u-icon name="shopping-cart" color="#1bbf80" size="36"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
