<template>
	<view>
		<view class="right-option">
			<view class="right-option-item">
				<view class="icon1" @click="showDrawer()" :isWei="isWei" :change:isWei="openlayer.receiveMsg">
					<view class="img">
						<image style="width: 40rpx; height: 30rpx;" src="@/static/images/map/icon_zy@2x.png"></image>
					</view>
				</view>
			</view>
			<view class="icon-bottom">
				<view class="icon2" :centerInfo="centerInfo" :change:centerInfo="openlayer.receiveCenter"
					@click="getLocation()">
					<image src="@/static/images/map/icon_dw@2x.png" @click="getLocation()"></image>
				</view>
				<view class="icon3">
					<image id="scalc_big" src="@/static/images/map/icon_fd@2x.png"></image>
				</view>
				<view class="icon4">
					<image id="scalc_small" src="@/static/images/map/icon_sx@2x.png"></image>
				</view>
				<view class="icon2" style="margin-top: 10rpx;">
					<image id="drawId" src="@/static/images/map/draw.png"></image>
				</view>
				<view class="icon2" style="margin-top: 10rpx;">
					<image id="drawDelete" src="@/static/images/map/delete.png"></image>
				</view>
				<view class="icon2" style="margin-top: 10rpx;">
					<image id="drawCance" src="@/static/images/map/cancle.png"></image>
				</view>
				<view class="icon2" style="margin-top: 10rpx;">
					<image id="drawSubmit" src="@/static/images/map/complete.png"></image>
				</view>
			</view>

		</view>
		<view id="mymap" style="width: 100%;height: 100vh;"></view>
		<!-- 地图 -->
		<uni-drawer ref="layer" mode="right" :width="250">
			<reproduction @switchMap='switchMap' :isWei='isWei' :mapXing='mapXing' />
		</uni-drawer>
	</view>
</template>

<script module="openlayer" lang="renderjs">
	import {
		mapObject
	} from "@/common/openlayerMap.js"
	import duobianx from "@/common/duobianx.json"
	import point from "@/common/point.json"
	import line from "@/common/line.json"
	export default {
		data() {
			return {
				mapObject: null,
				center: [116.406658, 39.907096],
			}
		},
		methods: {
			initMap() {
				//初始化map对象
				this.mapObject = new mapObject('mymap', this.center, feature => {
					console.log("点击的feature为", feature);
				},false);
				//定位
				this.mapObject.drawMark([116.445493, 39.987137]);
				//初始化手绘功能
				this.mapObject.initModify(e => {
					console.log("修改", e.features);
				});
				//视口发生改变监听
				this.mapObject.setViewPortChange(e => {
					console.log("视口发生改变", e);
				});
				//隐藏地图默认按钮
				this.$nextTick(() => {
					this.mapObject.hideOption();
				});
				//以geoJson形式进行绘制
				this.mapObject.drawPolygonGeoJson(duobianx);
				this.mapObject.drawPointGeoJson(point);
				this.mapObject.drawPolygonGeoJson(line);
				//以坐标点形式进行绘制
				this.mapObject.drawPoint([116.397451, 39.909187]);
				this.mapObject.drawPolygon([
					[
						[116.38959947366399, 39.88038662712821],
						[116.4039010341015, 39.85233357529546],
						[116.42113624480564, 39.87690291551312],
						[116.38959947366399, 39.88038662712821]
					]
				]);
				this.mapObject.drawLine([[115.337247,40.161579],[117.707548,40.201449]]);
				//放大
				document.getElementById("scalc_big").addEventListener("click", () => {
					this.mapObject.zoomBig();
				});
				//缩小
				document.getElementById("scalc_small").addEventListener("click", () => {
					this.mapObject.zoomSmall();
				});
				//开始手绘
				document.getElementById("drawId").addEventListener("click", () => {
					this.mapObject.addDrawInteractions("Polygon", e => {
						console.log("绘制完成", e)
					});
				});
				//取消手绘
				document.getElementById("drawCance").addEventListener('click', e => {
					this.mapObject.removeLastPoint();
				});
				//手绘完成
				document.getElementById("drawSubmit").addEventListener("click", () => {
					this.mapObject.drawComplete();
				});
				//删除手绘
				document.getElementById("drawDelete").addEventListener("click", () => {
					this.mapObject.drawDelete();
				});
			},

			//图层改变
			receiveMsg(newValue, oldValue, ownerVm, vm) {
				this.mapObject.changeLayer("newValue", newValue);
			},
			//中心点改变
			receiveCenter(newValue) {
				this.mapObject.drawMark(newValue.center);
				console.log("newValue", newValue)
			}

		},
		mounted() {
			this.initMap();
		}

	}
</script>

<script>
	import mapMix from "./mix/mapMix.js"
	import reproduction from '@/components/map-drawer/reproduction.vue'

	export default {
		components: {
			reproduction
		},
		mixins: [mapMix],
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {
			this.getLocation();
		}
	}
</script>

<style scoped lang="less">
	.right-option {
		width: 88rpx;
		height: 100%;
		right: 10rpx;
		padding-top: 80rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 20;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.right-option-item {
			width: 80rpx;
			height: auto;
			background-color: #FFFFFF;
			border-radius: 5px;
		}

		.icon-bottom {
			margin-bottom: 300rpx;
			right: 10rpx;
		}
	}

	.icon1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-bottom: 16rpx;

		.img {
			margin-top: 20rpx;

			image {
				width: 40rpx;
				height: 30rpx;
			}
		}
	}

	.icon2,
	.icon3,
	.icon4 {
		width: 78rpx;
		height: 78rpx;
		background-color: #FFFFFF;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.icon3 {
		margin: 10rpx 0rpx 2rpx 0rpx;
		border-radius: 10px 10px 0px 0px;
	}

	.icon4 {
		border-radius: 0px 0px 10px 10px;
	}
</style>
