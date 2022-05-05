<template>
	<view>
		<u-card>
			<view class="u-flex u-row-between" slot="head">
				<view>市测:</view>
				<view>{{obj1.leave}}</view>
			</view>
			<view class="u-font-32" slot="body">
				<u-row v-for="(item,idx) in obj1.data" :key="idx" class="u-m-20" gutter="16">
					<u-col span="5">
						{{item.label}}
					</u-col>
					<u-col span="7">
						{{item.value}}
					</u-col>
				</u-row>
			</view>
			<view class="u-text-right u-font-32 u-content-color" slot="foot">
				{{obj1.time}}
			</view>
		</u-card>

		<u-card>
			<view class="u-flex u-row-between" slot="head">
				<view>环测:</view>
				<view>{{obj1.leave}}</view>
			</view>
			<view class="u-font-32" slot="body">
				<u-row v-for="(item,idx) in obj1.data" :key="idx" class="u-m-20" gutter="16">
					<u-col span="5">
						{{item.label}}
					</u-col>
					<u-col span="7">
						{{item.value}}
					</u-col>
				</u-row>
			</view>
			<view class="u-text-right u-font-32 u-content-color" slot="foot">
				{{obj1.time}}
			</view>
		</u-card>
		
		<u-card>
			<view class="u-flex u-row-between" slot="head">
				<view>自测:</view>
				<view>
					<u-button type="primary" size="mini">编辑</u-button>
				</view>
			</view>
			<view class="u-font-32" slot="body">
				<u-row v-for="(item,idx) in obj1.data" :key="idx" class="u-m-20" gutter="16">
					<u-col span="5">
						{{item.label}}
					</u-col>
					<u-col span="7">
						{{item.value}}
					</u-col>
				</u-row>
			</view>
			<view class="u-text-right u-font-32 u-content-color" slot="foot">
				 地点XXX，{{obj1.time}}
			</view>
		</u-card>
		<view style="height: 100px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj1: {
					time: '2022年5月1日',
					leave: '四类水',
					data: [{
						label: '氨氮',
						value: '0.33',
					}, {
						label: '溶解氧',
						value: '0.63',
					}, {
						label: '总磷',
						value: '8.1',
					}, {
						label: 'COD',
						value: '0.43',
					}, {
						label: 'PH值',
						value: '5.3',
					}]
				}
			};
		},
		onLoad(data) {
			uni.setNavigationBarTitle({
				title: data.riverName + '水质情况'
			})
		}
	}
</script>

<style lang="scss">

</style>
