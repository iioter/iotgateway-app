<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="u-page__line-item">
				<u-line color="#2979ff"></u-line>
			</view>
			<text class="u-page__item__title">设备概览</text>
			<view class="uni-flex uni-row ">
				<view class="flex-item ">
					<uni-badge class="uni-badge-left-margin" :text="5" type="primary" absolute="rightTop"
						:offset="[-3, -3]" size="small">
						<view class="box"><text class="box-text">设备总数</text></view>
					</uni-badge>
				</view>
				<view class="flex-item ">
					<uni-badge class="uni-badge-left-margin" :text="3" type="success" absolute="rightTop"
						:offset="[-3, -3]" size="small">
						<view class="box"><text class="box-text">在线设备</text></view>
					</uni-badge>
				</view>
				<view class="flex-item ">
					<uni-badge class="uni-badge-left-margin" :text="2" type="warning" absolute="rightTop"
						:offset="[-3, -3]" size="small">
						<view class="box"><text class="box-text">离线设备</text></view>
					</uni-badge>
				</view>
			</view>

			<view class="u-page__line-item">
				<u-line color="#2979ff"></u-line>
			</view>
			<text class="u-page__item__title">设备状态</text>
			<uni-list>
				<uni-list-item title="空调" note="Modbus" clickable @click="onClick(1)"
					thumb='https://user-images.githubusercontent.com/29589505/166888783-37f10d50-05cb-416a-95d1-528f556ef4a6.png' thumb-size="sm" rightText="5秒前" />
				<uni-list-item title="设备1" note="西门子S7-1500" clickable @click="onClick(2)"
					thumb='https://user-images.githubusercontent.com/29589505/166888783-37f10d50-05cb-416a-95d1-528f556ef4a6.png' thumb-size="sm" rightText="10秒前" />
				<uni-list-item title="设备2" note="三菱Q" clickable @click="onClick(3)"
					thumb='https://user-images.githubusercontent.com/29589505/166888783-37f10d50-05cb-416a-95d1-528f556ef4a6.png' thumb-size="sm" rightText="30秒前" />
				<uni-list-item title="设备3" note="BACnet" showArrow clickable @click="onClick(4)"
					thumb='https://user-images.githubusercontent.com/29589505/166888879-34f5c014-f590-4224-9848-2020f5deb95f.png' thumb-size="sm" rightText="2小时前" />
				<uni-list-item title="设备4" note="Fanuc" showArrow clickable @click="onClick(5)"
					thumb='https://user-images.githubusercontent.com/29589505/166888879-34f5c014-f590-4224-9848-2020f5deb95f.png' thumb-size="sm" rightText="3小时前" />

			</uni-list>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {
			onClick(id) {
				uni.showToast({
					title:'设备详情ToDo',
				})
			},
			// fullText() {
			//  console.log('方法')
			//  return this.firstText + ' ' + this.lastText;
			// }
		},
	}
</script>

<style>
	.uni-padding-wrap {
		/* width:690rpx; */
		padding: 0 30rpx;
	}

	.uni-common-mt {
		margin-top: 30rpx;
	}

	.flex-item {
		width: 33.3%;
		height: 100rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.flex-item-V {
		width: 100%;
		height: 150rpx;
		text-align: center;
		line-height: 150rpx;
	}

	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}

	.desc {
		/* text-indent: 40rpx; */
	}

	.flex-pc {
		display: flex;
		justify-content: center;
	}
</style>
