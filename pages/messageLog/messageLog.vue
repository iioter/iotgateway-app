<template>
	<view class="px-30">
		<view class="bg-white-color">
			<u-field v-model="instrumentName" label="数采仪" placeholder="请选择数采仪" disabled @click="selectShow=true;">
			</u-field>
			<u-field v-model="beginTime" label="开始时间" placeholder="请输入开始时间" disabled>
			</u-field>
			<u-field v-model="endTime" label="结束时间" placeholder="请输入结束时间" disabled>
			</u-field>
			<u-select v-model="selectShow" mode="mutil-column-auto" :list="instrumentlist" @confirm="confirm">
			</u-select>
		</view>
		<u-button class="my-30" type="primary" @click="queryBtn">查询</u-button>
		<view class="item u-border-bottom" v-for="(item, index) in dataList" :key="index">
			<u-card :title="item.InTime">
				<view slot="body" style="word-break: break-word;white-space:pre-wrap;">
					{{item.MessageText}}
				</view>
			</u-card>
		</view>
		<u-loadmore :status="status" />
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				instrumentId: '',
				instrumentName: '',
				instrumentlist: [],
				selectShow: false,
				scrollTop: 0,
				page: 1,
				status: 'loadmore',
				dataList: [],
				beginTime: this.$u.timeFormat((new Date()).getTime() - 3600 * 3 * 1000, 'yyyy-mm-dd hh:MM:ss'),
				endTime: this.$u.timeFormat((new Date()).getTime(), 'yyyy-mm-dd hh:MM:ss'),
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			this.status = 'loading';
			this.page = ++this.page;
			this.searchFun();
		},
		methods: {
			queryBtn() {
				this.page = 1;
				this.dataList = [];
				this.searchFun();
			},
			searchFun() {
				this.status = 'loading';
				this.$u.post('/MessageLog/Search', {
					Page: this.page,
					Limit: 10,
					InTime: [this.beginTime, this.endTime],
					InstrumentId: this.instrumentId ? this.instrumentId : null,
				}).then(res => {
					this.dataList = this.dataList.concat(res.Data);
					if (res.Count > this.page * 10) {
						this.status = 'loadmore';
					} else {
						this.status = 'nomore';
					}
				});
			},
			confirm(data) {
				this.instrumentName = `${data[0].label}-${data[1].label}`;
				this.instrumentId = data[1].value;
			},
			getTreeInstrument() {
				this.$u.get('/RealTimeData/getCompanyTree')
					.then(res => {
						this.instrumentlist = res.treeData.map(x => {
							let obj = {};
							obj.label = x.Text;
							obj.value = x.Value;
							obj.children = [];
							x.Children.map(y => {
								obj.children.push({
									label: y.Text,
									value: y.Value,
								})
							})
							return obj;
						})
					});
			}
		},
		onShow() {
			this.getTreeInstrument();
			this.searchFun();
		}
	}
</script>

<style>

</style>
