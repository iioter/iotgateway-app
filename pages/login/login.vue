<template>
	<view>
		<u-navbar :is-back="false" title="开源工业物联网网关" title-width="300" :background="bgColor" title-color="#ffffff"
			:title-bold="true">
		</u-navbar>
		<view class="wrap">
			<u-top-tips ref="uTips"></u-top-tips>
			<view style="text-align: center;">
				<image src="/static/logo.png" class="img-160" style="margin: 30rpx auto 0;"></image>
			</view>
			<view class="content">
				<!-- 	<view class="title">在线监控平台</view> -->
				<u-form :model="form" ref="uForm">
					<u-form-item label="账号">
						<u-input v-model="form.name" />
					</u-form-item>
					<u-form-item label="密码">
						<u-input v-model="form.password" type="password" :passwordIcon="true" />
					</u-form-item>
				</u-form>
				<u-button type="primary" @click="loginBtn">登 录</u-button>
				<view class="alternative">
					<u-checkbox @change="rememberChange" v-model="remember">记住密码</u-checkbox>
					<view class="issue" @click="registerBtn">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				bgColor: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				form: {
					name: '',
					password: ''
				},
				remember: false
			}
		},
		methods: {
			loginBtn() {
				uni.setStorageSync('remember', this.remember);
				if (this.remember) {
					uni.setStorageSync('Account', this.form.name);
					uni.setStorageSync('Password', this.form.password);
				}
				uni.switchTab({
					url: '/pages/index/index'
				});
				/* this.$u.post('/_Account/LoginJwt', {
					"Account": this.form.name,
					"Password": this.form.password
				}).then(res => {
					console.log(res);
					uni.setStorageSync('token', res.access_token);
					this.$u.get('/_Account/CheckUserInfo').then(res => {
						console.log(res);
						uni.setStorageSync('userInfo', res);
						
					})
				}).catch(e => {
					this.$refs.uTips.show({
						title: '登录失败',
						type: 'error',
						duration: '2300'
					})
				}) */
			},
			forgetBtn() {
				uni.showToast({
					title: '忘记密码请联系管理员',
					icon: 'error'
				})
			},
			registerBtn() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			rememberChange(val) {
				console.log(val);
			}
		},
		onShow() {
			if (uni.getStorageSync('remember') == true) {
				this.remember = true;
				this.form.name = uni.getStorageSync('Account');
				this.form.password = uni.getStorageSync('Password');
			}
			this.loginBtn();
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 10rpx auto 0;

			.title {
				text-align: center;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 60rpx;
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}


	}
</style>
