<template>
	<view>
		<view class="d-flex j-sb" style="height: 375rpx;width: 100%;background-color: #1BBF80;">
			<view class="white-color d-flex flex-column u-m-t-30">
				<text class="u-font-26 u-p-b-10 u-p-t-20" style="border-bottom: 3rpx solid #ffffff;">专属定制、优质开发</text>
				<text class="u-font-36 font-weight u-m-30">APP定制开发</text>
			</view>
			<image src="/static/logo.png" class="img-160 u-m-t-30"></image>
		</view>
		<view class="bg-white-color shadow u-border-radius d-flex flex-wrap"
			style="width: 710rpx;height: 350rpx;margin: -175rpx auto 30rpx;">
			<view v-for="(item,index) in 4" :key="index" class="u-border d-flex j-sb" style="width: 355rpx; height: 175rpx;">
				<view class="main-color u-m-t-20 u-m-l-20">
					<text>安卓应用开发</text>
				</view>
				<image src="/static/logo.png" class="img-160 u-m-t-30"></image>
			</view>
		</view>
		<view class="bg-white-color shadow u-border-radius d-flex flex-wrap"
			style="width: 710rpx;height: 350rpx;margin: 0 auto 30rpx;">
			<view v-for="(item,idx) in 4" :key="idx" class="h-100 d-flex flex-column j-sa" style="width: 25%;">
				<text class="u-font-26 font-weight u-m-t-20 u-p-b-10" style="border-bottom:3rpx solid #1BBF80;">APP定制开发</text>
				<image src="/static/logo.png" class="img-160"></image>
			</view>
		</view>
		<h-goods-list />
		<!-- <view style="width: 100%;height: 200rpx;"></view> -->
	</view>
</template>

<script>
</script>

<style>
</style>
