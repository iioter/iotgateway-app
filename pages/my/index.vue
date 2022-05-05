<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userName}}</view>
				<view class="u-font-14 u-tips-color">账号:{{userITCode}}</view>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="chat" title="消息通知"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="account" title="修改密码" @click="changePasswordBtn"></u-cell-item>
				<u-cell-item icon="level" title="版本信息" @click="versionBtn"></u-cell-item>
				<u-cell-item icon="question" title="问题反馈"></u-cell-item>
				<u-cell-item icon="lock-open" title="解绑设备"></u-cell-item>
			</u-cell-group>
		</view>

		<!-- 	<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view> -->
		<u-button class="u-m-20 u-m-40" type="warning" @click="logoutBtn">退出登录</u-button>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warning" title="提示" content="确定退出登录？" @confirm="dialogConfirm" @close="dialogClose">
			</uni-popup-dialog>
		</uni-popup>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: 'IoTGateway',
				userITCode: '',				
			}
		},
		methods: {
			logoutBtn() {
				this.$refs.alertDialog.open();
			},
			dialogConfirm() {
				this.$u.get('/_Account/Logout').then(res => {
					console.log(res);
					uni.setStorageSync('token', '');
					uni.navigateTo({
						url: '/pages/login/login'
					});
				})
			},
			versionBtn() {
				uni.showToast({
					title: '版本v1.0.0',
				})
				// uni.navigateTo({
				// 	url: '/pages/version/version'
				// });
			},
			changePasswordBtn() {
				/* uni.navigateTo({
					url: '/pages/changePassword/changePassword'
				}); */
			},
			dialogClose() {

			}
		},
		onShow() {}
	}
</script>

<style lang="scss" scoped>
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
