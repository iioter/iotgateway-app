<template>
	<view class="u-m-t-30 u-m-b-30" style="position: relative;">
		<view class="u-text-center u-font-36 font-weight u-m-b-20">{{title}}</view>
		<view class="u-text-center gray-color u-font-20 u-padding-10 d-flex j-center w-100" style="position: absolute;">
			<text class="px-5"
				style="background-color: #F8F8F8;margin-top: -20rpx; letter-spacing: 4rpx;">{{desc}}</text>
		</view>
		<view class="d-flex">
			<view class="u-flex-1"
				style="background-image: linear-gradient(to right,rgba(27,191,128,0),rgba(27,191,128,1));height: 4rpx;">
			</view>
			<view class="u-flex-1"
				style="background-image: linear-gradient(to left,rgba(27,191,128,0),rgba(27,191,128,1));height: 4rpx;">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '优选好物'
			},
			desc: {
				type: String,
				default: 'YOU XUAN HA WU'
			}
		}
	}
</script>

<style>
</style>
