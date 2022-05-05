<template>
	<view>
		<u-card>
			<view class="u-flex u-row-between" slot="head">
				<view>设备运行情况</view>
			</view>
			<view class="u-font-32" slot="body">
				<u-row v-for="(item,idx) in obj1.data" :key="idx" class="u-m-30" gutter="16">
					<u-col span="4">
						{{item.label}}
					</u-col>
					<u-col span="8">
						<u-switch v-model="item.value" disabled size="40"></u-switch>
					</u-col>
				</u-row>
			</view>
			<view class="u-text-left u-font-32 u-content-color" slot="foot">
				错误报告联系方式：1566665888
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj1: {
					data: [{
						label: '设备1',
						value: true,
					},{
						label: '设备2',
						value: true,
					},{
						label: '设备3',
						value: true,
					},{
						label: '设备4',
						value: false,
					},{
						label: '设备5',
						value: true,
					},{
						label: '设备6',
						value: false,
					},{
						label: '设备7',
						value: false,
					}]
				}
			}
		},
		methods: {

		},
		onLoad(data) {
			uni.setNavigationBarTitle({
				title: data.riverName + '设备运行情况'
			})
		}
	}
</script>

<style>

</style>
