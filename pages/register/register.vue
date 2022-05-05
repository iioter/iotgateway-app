<template>
	<view class="px-30 py-30">
		<u-form :model="form" ref="uForm" label-width="120rpx">
			<u-form-item label="账号" prop="ITCode">
				<u-input v-model="form.ITCode" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item label="密码" prop="Password">
				<u-input v-model="form.Password" placeholder="请输入密码" />
			</u-form-item>
			<u-form-item label="姓名" prop="Name">
				<u-input v-model="form.Name" placeholder="请输入姓名" />
			</u-form-item>
			<u-form-item label="邮箱" prop="Email">
				<u-input v-model="form.Email" placeholder="请输入邮箱" />
			</u-form-item>
			<u-form-item label="手机号" prop="CellPhone">
				<u-input v-model="form.CellPhone" placeholder="请输入手机号" />
			</u-form-item>
			<u-form-item label="地址" prop="Address">
				<u-input v-model="form.Address" placeholder="请输入地址" />
			</u-form-item>
		</u-form>
		<u-button type="primary" class="py-30" @click="submitBtn">注册</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					ITCode: '',
					Password: '',
					Name: '',
					Email: '',
					CellPhone: '',
					Address: '',
				},
				rules: {
					ITCode: [{
						required: true,
						message: '请输入账号',
						trigger: ['change', 'blur'],
					}],
					Password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur'],
					}, {
						min: 6,
						message: '密码不能少于6位',
						trigger: 'blur'
					}],
					Name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitBtn() {
				this.$refs.uForm.validate(valid => {
					if (valid) {

						this.$u.post('/_FrameworkUserBase/Add', {
							Entity: {
								...this.form,
								IsValid: true,
							},
							SelectedRolesCodes: [],
							SelectedGroupCodes: []
						}).then(res => {
							uni.showToast({
								title: '注册成功,请联系管理员开通权限',
								duration: 3000,
								complete: () => {
									uni.redirectTo({
										url: '../login/login'
									});
								}
							})
						}).catch(res => {
							const {
								data
							} = res;
							console.log(data);
							let str=''
							for(let key in data.Form){
								str+=data.Form[key];
							}					
							uni.showToast({
								title: str,
								duration: 3000,
								icon:'error'
							})
						})
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
