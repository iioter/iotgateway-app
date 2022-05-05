import config from "@/common/config.js"
import "ol/ol.css";
import axios from 'axios'
import 'ol/ol.css';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import Overlay from 'ol/Overlay';
import {
	GeoJSON,
	WFS
} from 'ol/format';
import {
	Circle as CircleStyle,
	Fill,
	Stroke,
	Style,
	Icon
} from 'ol/style';
import {
	Control,
	defaults as defaultControls
} from 'ol/control';
import {
	intersects as intersectsFilter,
} from 'ol/format/filter';
import {
	bbox as bboxStrategy
} from 'ol/loadingstrategy';
import Feature from 'ol/Feature';
import {
	GeometryCollection,
	Point,
	Polygon,
	LineString,
	Circle
} from 'ol/geom';
import {
	toSize
} from 'ol/size';
import TileWMS from "ol/source/TileWMS"
import duobianx from "@/common/duobianx.json"
import point from "@/common/point.json"
import line from "@/common/line.json"
import {
	Draw,
	Modify,
	Snap,
	Select,
	defaults as defaultInteractions,
} from 'ol/interaction';
import {
	OSM,
	Vector as sourceVector
} from 'ol/source';
import {
	Tile as TileLayer,
	Vector as VectorLayer
} from 'ol/layer';
import {
	circular
} from 'ol/geom/Polygon';
import {
	getDistance
} from 'ol/sphere';
import {
	transform,
	applyTransform
} from 'ol/proj';
let deafalutIcon =
	"data:image/png;base64,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";

export class mapObject {
	/**
	 * 构造函数初始化map 对象
	 * @param {Object} id map容器ID
	 * @param {Object} center 中心点
	 * @param {Object} callback 点击事件回调
	 */
	constructor(id, center, callback, isWms) {
		this.center = center;
		if (isWms) {
			let wmsVsource = new TileWMS({
				//此处替换为自有wms
				url: "http://xx.xx.xx.xx:9000/geoserver/BeiJing/wms?LAYERS=BeiJing:BJVector1",
				parmas: {
					'LAYERS': ['BeiJing:BJVector1'],
					'TILED': true,
					"CRS": "EPSG:4326",
					"SRS": "EPSG:4326",
					"STYLES": "",
					"tileSize": [256, 256],
					"exceptions": 'application/vnd.ogc.se_inimage'
				},
				serverType: 'geoserver',
			});
			this.wmslayer = new TileLayer({
				source: wmsVsource
			});
		} else {
			this.weiLayer = new TileLayer({
				source: new XYZ({
					url: config.tianImg
				}),
				visible: true,
				zIndex: 0
			});
			this.xinLayer = new TileLayer({
				source: new XYZ({
					url: config.tianVec
				}),
				visible: false,
				zIndex: 0
			});
			this.lableLayer = new TileLayer({
				source: new XYZ({
					url: config.tianLabel
				}),
				visible: true,
				zIndex: 0
			});
		}

		const style = new Style({
			fill: new Fill({
				color: 'rgba(255, 255, 255, 0.2)',
			}),
			stroke: new Stroke({
				color: '#33cc33',
				width: 3,
			}),
			image: new CircleStyle({
				radius: 7,
				fill: new Fill({
					color: '#ffcc33',
				}),
			}),
		});
		const geodesicStyle = new Style({
			geometry: function(feature) {
				return feature.get('modifyGeometry') || feature.getGeometry();
			},
			fill: new Fill({
				color: 'rgba(255, 255, 255, 0.2)',
			}),
			stroke: new Stroke({
				color: '#ff3333',
				width: 3,
			}),
			image: new CircleStyle({
				radius: 7,
				fill: new Fill({
					color: 'rgba(0, 0, 0, 0)',
				}),
			}),
		});
		//线，面与手动绘制共用图层使用的资源
		this.sourceVector = new sourceVector({
			wrapX: false
		});
		this.vectorLayer = new VectorLayer({
			source: this.sourceVector,
			style: function(feature) {
				const geometry = feature.getGeometry();
				return geometry.getType() === 'GeometryCollection' ? geodesicStyle : style;
			}
		});
		//点使用的资源
		this.pointLayer = new VectorLayer();
		this.pointSourceVector = new sourceVector();
		this.pointLayer.setSource(this.pointSourceVector);
		//初始化map对象
		this.map = new Map({
			view: new View({
				center: this.center,
				projection: 'EPSG:4326',
				zoom: 11,
				minZoom: 4,
				maxZoom: 18
			}),
			target: id
		});
		if (isWms) {
			this.map.addLayer(this.wmslayer);
		} else {
			this.map.addLayer(this.weiLayer);
			this.map.addLayer(this.xinLayer);
			this.map.addLayer(this.lableLayer);
		}
		this.map.addLayer(this.vectorLayer);
		this.map.addLayer(this.pointLayer);
		//map添加点击事件
		this.map.on('singleclick', (e) => {
			let pixel = this.map.getEventPixel(e.originalEvent);
			// let Features = this.map.getFeaturesAtPixel(pixel);
			// console.log("获取到的Features",Features);
			let feature = this.map.forEachFeatureAtPixel(pixel,
				function(feature, layer) {
					return feature;
				});
			if (feature) {
				if (feature.getGeometry().getType() == 'Point') {
					this.select.setActive(false);
				} else {
					this.select.setActive(true);
				}
				let property = feature.getProperties();
				let type = feature.getGeometry().getType();
				callback(feature);
			}
		});

	}

	//================================手动绘制功能开始=======================================

	/**
	 * 初始化绘制编辑
	 * @param {Object} callback 编辑事件回调
	 */
	initModify(callback) {
		this.select = new Select({
			wrapX: false,
		});
		const defaultStyle = new Modify({
				source: this.sourceVector
			})
			.getOverlay()
			.getStyleFunction();
		this.modify = new Modify({
			features: this.select.getFeatures(),
			source: this.sourceVector,
		});
		this.modify.on('modifystart', function(event) {
			event.features.forEach(function(feature) {
				const geometry = feature.getGeometry();
				if (geometry.getType() === 'GeometryCollection') {
					feature.set('modifyGeometry', geometry.clone(), true);
				}
			});
		});
		this.modify.on('modifyend', function(event) {
			callback(event);
			event.features.forEach(function(feature) {
				const modifyGeometry = feature.get('modifyGeometry');
				if (modifyGeometry) {
					feature.setGeometry(modifyGeometry);
					feature.unset('modifyGeometry', true);
				}
				console.log(feature.getGeometry().getCoordinates());
			});
		});
		this.map.addInteraction(this.modify);
		this.map.addInteraction(this.select);
		this.select.on('select', e => {
			this.selectFeature = e.target.getFeatures();
		})
	}

	/**
	 * 绘制 点 线 面
	 * @param {Object} type  point line Polygon Circle
	 * @param {Object} endCallback 绘制完成回调
	 */
	addDrawInteractions(type, endCallback) {
		this.draw = new Draw({
			source: this.vectorLayer.getSource(),
			type: type ? type : "Polygon",
		});
		this.draw.on("drawend", e => {
			console.log("绘制完成", e.feature.getGeometry().getCoordinates());
			this.draw.setActive(false); //关闭绘制交互
			this.select.setActive(false);
			this.select.setActive(false);
			this.draw.finishDrawing(); //绘制完成
			endCallback(e);
		})
		this.map.addInteraction(this.draw);
	}

	/**
	 * 撤销点
	 */
	removeLastPoint() {
		this.draw.removeLastPoint();
		this.modify.removePoint();
	}

	/**
	 * 删除要素
	 */
	drawDelete() {
		try {
			this.selectFeature.forEach(item => {
				this.vectorLayer.getSource().removeFeature(item);
			})
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * 绘制完成
	 */
	drawComplete() {
		if (this.draw) {
			this.draw.setActive(false);
			this.draw.finishDrawing();
		}
		if (this.select) {
			this.select.setActive(false);
			this.select.getFeatures().clear();
		}
	}
	//================================手动绘制功能结束=======================================


	/**
	 * geoJson加载点线面
	 */
	drawPolygonGeoJson(geoJson) {
		let style = new Style({
			stroke: new Stroke({
				color: '#ff5722',
				width: 1,
			}),
			fill: new Fill({
				color: 'rgba(171,54,65, 0.3)'
			}),
		});
		this.vectorLayer.setStyle(style);
		this.sourceVector.addFeatures((new GeoJSON()).readFeatures(geoJson));
	}


	/**
	 * 绘制点
	 * @param {Object} genjson
	 */
	drawPointGeoJson(geoJson, icon) {
		let iconStyle = new Style({
			image: new Icon(({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				size: toSize({
					size: [20, 20]
				}),
				src: icon ? icon : deafalutIcon
			}))
		});
		this.pointLayer.setStyle(iconStyle);
		this.pointSourceVector.addFeatures((new GeoJSON()).readFeatures(geoJson));
	}

	/**
	 * 设置中心点
	 * @param {Object} center
	 */
	setMapCenter(center) {
		this.map.getView().setCenter(center);
	}

	/**
	 * 定位中心点绘制
	 */
	drawMark(ponit, icon) {
		if (this.centerLayer != null || this.centerLayer != undefined) {
			this.map.removeLayer(this.centerLayer)
		}
		let iconFeature = new Feature({
			geometry: new Point(ponit),
			name: 'marks',
			population: 4000,
			rainfall: 500
		});

		let iconStyle = new Style({
			image: new Icon(({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				scale:0.3,
				src: icon ? icon : deafalutIcon
			}))
		});
		iconFeature.setStyle(iconStyle);
		let vectorSource = new sourceVector({
			features: [iconFeature]
		});
		this.centerLayer = new VectorLayer({
			source: vectorSource
		});
		this.map.addLayer(this.centerLayer);
	}


	/**
	 * 绘制点
	 */
	drawPoint(ponit, icon) {
		let iconFeature = new Feature({
			geometry: new Point(ponit),
			name: 'marks',
			population: 4000,
			rainfall: 500
		});
		let iconStyle = new Style({
			image: new Icon(({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				scale:0.3,
				src: icon ? icon : deafalutIcon
			}))
		});
		iconFeature.setStyle(iconStyle);
		this.pointSourceVector.addFeature(iconFeature);
	}

	/**
	 * 绘制多边形
	 */
	drawPolygon(polyCoords) {
		let polygon = new Polygon(polyCoords);
		let iconFeature = new Feature(polygon);
		let style = new Style({
			stroke: new Stroke({
				color: '#ff5722',
				width: 3,
			}),
			fill: new Fill({
				color: 'rgba(171,54,65, 0.3)'
			}),
		});
		iconFeature.setStyle(style);
		this.sourceVector.addFeature(iconFeature);
	}

	/**
	 * 绘制线
	 */
	drawLine(coordinates) {
		let lineString = new LineString(coordinates);
		let style = new Style({
			stroke: new Stroke({
				color: '#ff00ff',
				width: 3,
			}),
			fill: new Fill({
				color: 'rgba(171,54,65, 0.3)'
			}),
		});
		let lineFeature = new Feature(lineString);
		lineFeature.setStyle(style);
		this.sourceVector.addFeature(lineFeature);
	}
	
	/**
	 * 隐藏原有的按钮
	 */
	hideOption() {
		let olControl = document.getElementsByClassName("ol-zoom-in");
		let olControlOut = document.getElementsByClassName("ol-zoom-out");
		olControl[0].style.display = "none"
		olControlOut[0].style.display = "none"
	}

	/**
	 * 行政图与影像图层切换
	 */
	changeLayer(isShow) {
		if (isShow) {
			this.weiLayer.setVisible(true);
			this.xinLayer.setVisible(false);
		} else {
			this.weiLayer.setVisible(false);
			this.xinLayer.setVisible(true);
		}
	}

	/**
	 * 缩小
	 */
	zoomSmall() {
		let view = this.map.getView();
		let zoom = view.getZoom();
		view.setZoom(zoom - 1);
	}

	/**
	 * 放大
	 */
	zoomBig() {
		let view = this.map.getView();
		let zoom = view.getZoom();
		view.setZoom(zoom + 1);
		this.getViewPort();
	}

	/**
	 * 获取可视区域
	 */
	setViewPortChange(callback) {
		this.map.on("moveend", e => {
			let view = this.map.getView();
			let array = view.calculateExtent(this.map.getSize());
			callback(array);
		})
	}
}
