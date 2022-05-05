<template>
	<view class="u-page__item">
		<u-navbar :is-back="false" title="开源工业物联网网关" title-width="300" :background="bgColor" title-color="#ffffff"
			:title-bold="true">
		</u-navbar>
		<u-swiper :list="banner" duration="2000" :circular="true" height="375"></u-swiper>



		<u-divider text="分割线" :dot="true">·</u-divider>
		<u-divider text="分割线" :dot="true">
			<pre
				style='border: 0px solid #ccc;background-color:#FFFFFF'>▪        ▄▄▄▄▄ ▄▄ •  ▄▄▄· ▄▄▄▄▄▄▄▄ .▄▄▌ ▐ ▄▌ ▄▄▄·  ▄· ▄▌</pre>
		</u-divider>
		<u-divider text="分割线" :dot="true">
			<pre
				style='border: 0px solid #ccc;background-color:#FFFFFF'>██ ▪     •██  ▐█ ▀ ▪▐█ ▀█ •██  ▀▄.▀·██· █▌▐█▐█ ▀█ ▐█▪██▌</pre>
		</u-divider>
		<u-divider text="分割线" :dot="true">
			<pre
				style='border: 0px solid #ccc;background-color:#FFFFFF'>▐█· ▄█▀▄  ▐█.▪▄█ ▀█▄▄█▀▀█  ▐█.▪▐▀▀▪▄██▪▐█▐▐▌▄█▀▀█ ▐█▌▐█▪</pre>
		</u-divider>
		<u-divider text="分割线" :dot="true">
			<pre
				style='border: 0px solid #ccc;background-color:#FFFFFF'>▐█▌▐█▌.▐▌ ▐█▌·▐█▄▪▐█▐█ ▪▐▌ ▐█▌·▐█▄▄▌▐█▌██▐█▌▐█ ▪▐▌ ▐█▀·.</pre>
		</u-divider>
		<u-divider text="分割线" :dot="true">
			<pre
				style='border: 0px solid #ccc;background-color:#FFFFFF'>▀▀▀ ▀█▄▀▪ ▀▀▀ ·▀▀▀▀  ▀  ▀  ▀▀▀  ▀▀▀  ▀▀▀▀ ▀▪ ▀  ▀   ▀ • </pre>
		</u-divider>
		<u-divider text="分割线" :dot="true">·</u-divider>
		<text class="u-page__item__title">网关功能</text>
		<u-collapse accordion>
			<u-collapse-item title="协议转换">
				<text class="u-collapse-content">通过可视化配置，轻松的连接到你的任何设备和系统
					(如PLC、扫码枪、CNC、数据库、串口设备、上位机、OPC Server、OPC UA Server、Mqtt Server等).</text>
			</u-collapse-item>
			<u-collapse-item title="云端连接">
				<text class="u-collapse-content">内置Mqtt服务端，OPCUA服务端，轻松的与MES、SCADA交互数据.
					支持IoTSharp、ThingsBoard等私有云平台. 持续更新以支持阿里、百度、腾讯、中移物联等公有云平台.</text>
			</u-collapse-item>
			<u-collapse-item title="双向通讯">
				<text class="u-collapse-content">将遥测、属性的上传到平台；接收平台MQTT RPC指令，反向控制.</text>
			</u-collapse-item>
			<u-collapse-item title="跨平台运行">
				<text class="u-collapse-content">既可以是windows，也可以是linux系统;
					既可以是主机运行，也可以通过docker运行;
					既可以是x86主机，也可以是arm32、arm64嵌入式开发板。</text>
			</u-collapse-item>
			<u-collapse-item title="保证安全">
				<text
					class="u-collapse-content">所有物联网设备都有被外部影响和攻击的可能，但IoT网关在互联网和设备本身之间增加了另外一层，大幅度减少了连接到互联网的设备的数量，网关变成了第一道防线，进而防止外部各方对物联网设备进行未经授权的控制.</text>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList: [],
				bgColor: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				banner: [{
						image: 'https://user-images.githubusercontent.com/29589505/147798707-cf4de713-9bb6-48c1-88a6-ac9f703f89d2.gif',
						title: ''
					},
					{
						image: 'https://user-images.githubusercontent.com/29589505/147055534-3954039c-2723-4fc3-8981-c9ce3bb0163e.gif',
						title: ''
					},
					{
						image: 'https://user-images.githubusercontent.com/29589505/147056511-14611d19-8498-4a3c-bd67-3749ab75462f.gif',
						title: ''
					}, {
						image: 'https://user-images.githubusercontent.com/29589505/145705166-d5818557-4ba1-4e7b-b8d8-8f5f4b28868f.png',
						title: ''
					},
				],

			}
		},
		onLoad() {
			console.log('onload');
		},
		onShow() {},
		methods: {

		}
	}
</script>

<style lang="scss">
	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: #3c9cff;
					font-size: 14px;
				}
			}
		}
	}

	.u-collapse-content {
		color: #909193;
		font-size: 14px;
	}
</style>
