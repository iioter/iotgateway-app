<template>
	<view class="px-30">
		<u-form :model="form" ref="uForm" label-width="130rpx">
			<u-form-item label="旧密码" prop="OldPassword">
				<u-input v-model="form.OldPassword" placeholder="请输入旧密码" type="password" />
			</u-form-item>
			<u-form-item label="新密码" prop="NewPassword">
				<u-input v-model="form.NewPassword" placeholder="请输入新密码" type="password" />
			</u-form-item>
			<u-form-item label="确认密码" prop="NewPasswordComfirm">
				<u-input v-model="form.NewPasswordComfirm" placeholder="请输入新密码" type="password" />
			</u-form-item>
		</u-form>
		<u-button type="primary" class="py-30" @click="submitBtn">修改</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					OldPassword: '',
					NewPassword: '',
					NewPasswordComfirm: ''
				},
				rules: {
					OldPassword: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur'],
					}, {
						min: 6,
						message: '密码不能少于6位',
						trigger: 'blur'
					}],
					NewPassword: [{
						required: true,
						message: '请输入新密码',
						trigger: ['change', 'blur'],
					}, {
						min: 6,
						message: '密码不能少于6位',
						trigger: 'blur'
					}],
					NewPasswordComfirm: [{
						required: true,
						message: '请输入新密码',
						trigger: ['change', 'blur'],
					}, {
						min: 6,
						message: '密码不能少于6位',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitBtn() {
				this.$refs.uForm.validate(valid => {
					if (valid) {

						uni.showModal({
							title: '提示',
							content: '确定修改密码？',
							success: (res) => {
								if (res.confirm) {
									this.$u.post('/_Account/ChangePassword', {
										...this.form,
									}).then(res => {
										uni.showToast({
											title: '修改成功',
											complete: () => {
												setTimeout(() => {
													uni.switchTab({
														url: '/pages/my/index'
													});
												}, 1500)
											}
										})
									}).catch(res => {
										const {
											data
										} = res;
										console.log(data);
										let str = ''
										for (let key in data.Form) {
											str += data.Form[key];
										}
										uni.showToast({
											title: str,
											duration: 3000,
											icon: 'error'
										})
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>

</style>
