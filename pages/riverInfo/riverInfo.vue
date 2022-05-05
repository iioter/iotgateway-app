<template>
	<view>
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"
			:polygons="polygons">
		</map>
		<view>
			<view class="u-font-32 u-p-40 u-flex u-flex-wrap u-border-bottom u-row-between">
				<view>
					{{riverName}}监测点
				</view>
				<view class="u-m-b-20" v-for="(item,idx) in pointList" :key="idx">
					<u-icon class="u-m-r-20" name="map-fill" color="#2979ff" size="50"></u-icon>
					{{item.PointName}}
				</view>
			</view>

			<u-card title="水质" sub-title="详情>>" @head-click="goWaterQuality">
				<view class="u-font-30" slot="body">
					<view>市测：四类水</view>
					<view class="u-m-t-30">环测：四类水</view>
				</view>
			</u-card>

			<u-card title="已实施项目">
				<view class="u-font-30" slot="body">
					2022年已对河道进行多次水检测维护
				</view>
			</u-card>

			<u-card title="养护单位">
				<view class="u-font-30" slot="body">
					<view>2022年 江苏永汇</view>
					<view class="u-m-t-30">联系人：周工</view>
					<view class="u-m-t-30">联系电话：13655454545</view>
				</view>
			</u-card>

			<u-card title="河道设备状态" sub-title="详情>>" @head-click="goEquipmentStatus">
			</u-card>

			<u-card title="今日养护状态" sub-title="详情>>" @head-click="goTodayMantance">
			</u-card>

			<u-card title="排口情况">
			</u-card>

			<u-card title="河道信息">
				<view class="u-font-32" slot="body">
					{{riverSurvey}}
				</view>
			</u-card>
		</view>
		<view style="height: 100px;">

		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				riverId: '',
				riverName: '',
				riverSurvey: '',
				polygons: [],
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				pointList:[],
			};
		},
		methods: {
			// 河道信息
			async getRiverFun() {
				await this.$u.get(`/river/${this.riverId}`).then(res => {
					console.log('getRiverFun');
					const {
						Entity
					} = res;
					this.riverName = Entity.Name;
					this.riverSurvey = Entity.Survey;
					uni.setNavigationBarTitle({
						title: Entity.Name + '详细信息'
					})
					//地图定位点
					this.latitude = Entity.Latitude;
					this.longitude = Entity.Longitude;
					//点
					this.covers = [{
						latitude: Entity.Latitude,
						longitude: Entity.Longitude,
						iconPath: '/static/image/map-filling.png',
						width: 32,
						height: 32,
						callout: {
							content: Entity.Name,
							textAlign: 'center',
							borderRadius: 4,
							padding: 4,
							display: 'ALWAYS'
						}
					}]
					// 河流
					let obj = {};
					let geoJson = JSON.parse(Entity.GeoJson);
					let points = geoJson.features[0].geometry.coordinates[0].map(o => {
						return {
							longitude: o[0],
							latitude: o[1]
						}
					})
					obj.strokeWidth = 2;
					obj.strokeColor = '#000000';
					obj.fillColor = '#0000ff';
					obj.points = points;
					this.polygons = [obj];
				});
			},
			// 打卡点
			async getPointFun() {
				await this.$u.post(`/point/search`, {
					RiverId: this.riverId,
					Page: 1,
					Limit: 100
				}).then(res => {
					this.pointList=res.Data;
				});
			},
			// 水质
			goWaterQuality() {
				uni.navigateTo({
					url: `/pages/waterQuality/waterQuality?riverName=${this.riverName}`
				});
			},
			// 设备运行情况
			goEquipmentStatus() {
				uni.navigateTo({
					url: `/pages/equipmentStatus/equipmentStatus?riverName=${this.riverName}`
				});
			},
			// 今日养护情况
			goTodayMantance() {
				uni.navigateTo({
					url: `/pages/todayMantance/todayMantance?riverName=${this.riverName}`
				});
			}
		},
		async onLoad(data) {
			this.riverId = data.id;
			await this.getRiverFun();
			await this.getPointFun();
		},
		onShow() {}
	}
</script>

<style lang="scss">

</style>
