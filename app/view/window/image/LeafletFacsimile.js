/**
 * Creates class EdiromOnline.view.window.image.LeafletFacsimile that extend from Ext.Component.
 * @class
 * @classdesc EdiromOnline.view.window.image.LeafletFacsimile for create leaflet component.
 */
Ext.define('EdiromOnline.view.window.image.LeafletFacsimile', {
	extend: 'Ext.Component',
	
	/* requires: [
        'Ext.tip.*'
    ],*/
	
	alias: 'widget.leafletmapview',
	
	config: {
		map: null
	},
	
	zones: null,
	facsimileTile: null,
	imgHeight: null,
	imgWidth: null,
	imgId: null,
	imgPath: null,
	shapes: null,
	annotMap: new Map(),
	
	/**
	 * Get data for initialize a map, data for show measures and ftaffs numbers,
	 * create leaflet
	 * @overrides
	 */
	afterRender: function (t, eOpts) {
		var me = this;
		this.callParent(arguments);
		
		var leafletRef = window.L;
		if (leafletRef == null) {
			this.update('No leaflet library loaded');
		}
		
	},
	
	/**
	 * Get called anytime the size is changed in the layout
	 * and call the ‘invalidateSize’ method on the map.
	 * @overrides
	 */
	onResize: function (w, h, oW, oH) {
		this.callParent(arguments);
		var map = this.getMap();
		if (map) {
			console.log('onResize');
			map.invalidateSize();
			//Ext.QuickTips.init();
		}
	},
	
	addMeasures: function (shapes) {
		
		console.log('addMeasures Leaflet');
		console.log(shapes);
		var me = this;
		me.shapes.add('measures', shapes);
		//me.setShapes(shapes);
		//var plist = Ext.Array.toArray(annotation.get('plist'));
         //   Ext.Array.insert(me.shapes.get('annotations'), 0, plist);
		// me.shapes = shapes;
		for (i = 0; i < shapes.data.items.length; i++) {
			var name = shapes.data.items[i].data.name;
			var lrx = shapes.data.items[i].data.lrx;
			var lry = shapes.data.items[i].data.lry;
			var ulx = shapes.data.items[i].data.ulx;
			var uly = shapes.data.items[i].data.uly;
			this.facsimileTile.showRectangleCenter(ulx, uly, lrx, lry, name);
		}
	},
	
	/*setShapes: function (shapes) {
		this.shapes = shapes;
	},*/
	
	removeShapes: function (groupName) {
		console.log('removeShapes Leaflet');
		console.log(groupName);
		if (this.facsimileTile !== null) {
			if (groupName === 'annotations') {
			
				this.facsimileTile.removeAnnotations();
			} else {
				this.facsimileTile.removeMarkers();
				this.facsimileTile.disableRectangle();
			}
		}
	},
	
	removeDeselectedAnnotations: function (visibleCategories, visiblePriorities, annotations) {
		console.log('removeDeselectedAnnotations Leaflet');
		//console.log(groupName);
	
		this.facsimileTile.removeDeselectedAnnotations(visibleCategories, visiblePriorities);
		
	},
	
	clear: function () {
		console.log('Clear Leaflet');
		//console.log(this.shapes);
		if (this.facsimileTile !== null) {
			this.facsimileTile.removeMarkers();
			this.facsimileTile.disableRectangle();
			var map = this.getMap();
			map.remove();
			this.pageId = null;
		}
	},
	
	
	showShapes: function () {
		console.log("showShapes Leaflet");
		/*
		
		var me = this;
		if(me.shapesHidden) {
		me.shapesHidden = false;
		var shapeDiv = me.el.getById(me.id + '_facsContEvents');
		shapeDiv.removeCls('hiddenShapes');
		me.repositionShapes();
		}*/
	},
	
	/*   initComponent: function () {
	
	var me = this;
	
	me.items = [
	{
	html: 'test'
	}
	
	// me.imageViewer
	];
	
	me.callParent();
	},*/
	
	showImage: function (path, width, height, pageId) {
		console.log("showImage Leaflet");
		console.log(path);
		console.log(width);
		console.log(height);
		console.log(pageId);
		var me = this;
		me.shapes = new Ext.util.MixedCollection();
		
		var leaflet_path = null;
		if(pageId === 'annot'){
			var fields = path.split('.');
			leaflet_path = fields[0];
		}
		else{
			me.imgPath = path;
			var leaflet_prefix = getPreference('leaflet_prefix');
			var fields = path.split('.');
			var name = fields[0];
			leaflet_path = leaflet_prefix + name;
			console.log(leaflet_path);
			console.log(me.imgPath);
		}
		
		me.imgId = pageId;
		me.imgHeight = parseInt(height);
		me.imgWidth = parseInt(width);
		
		var originalMaxSize = null;
		
		if (me.imgHeight > me.imgWidth) {
			originalMaxSize = me.imgHeight;
		} else {
			originalMaxSize = me.imgWidth;
		}
		
		var maxZoomLevel = 0;
		while (originalMaxSize > 256) {
			originalMaxSize = originalMaxSize / 2;
			maxZoomLevel++;
		}
		console.log("maxZoomLevel :" + maxZoomLevel);
		
		/*var map = this.getMap();
		if(typeof map === 'undefined' || map === null){
			map = L.map(me.getId());
		}*/
		
		var map = null;
		if(pageId === 'annot'){
			map = this.getMap();
			if(typeof map === 'undefined' || map === null){
				map = L.map(me.getId());
			}
		}
		else{
			map = L.map(me.getId());
		}
			
		/*var corrd1 = me.imgWidth / 2;
		var corrd2 = me.imgHeight / 2;
		var centerPoint = L.point(corrd1, corrd2);
		var latLngCenterPoint = map.unproject(centerPoint, maxZoomLevel);
		map.setView([latLngCenterPoint.lat, latLngCenterPoint.lng], 0);
		*/
		
		map.setView([0,0], 0);
		
		me.setMap(map);
		
		me.facsimileTile =
		L.tileLayer.facsimileLayer(leaflet_path + '/{z}-{x}-{y}.jpg', {
			minZoom: 0,
			maxZoom: maxZoomLevel
		});
		
		me.facsimileTile.setWidth(me.imgWidth);
		
		me.facsimileTile.setHeight(me.imgHeight);
		
		me.facsimileTile.addTo(map);
		
		me.facsimileTile.fitInImage();
		
		/*var app = EdiromOnline.getApplication();
		var tools = app.getController('ToolsController');
		var isVisble = tools.areMeasuresVisible();
		console.log('showImage Leaflet is visible');
		console.log(isVisble);
		console.log(me.shapes);
		console.log(this.shapes);
		if(isVisble === 'true'){
		//tools.setGlobalMeasureVisibility(true);
		//me.addMeasures(me.shapes);
		}*/
	},
	
	fitInImage: function () {
		console.log('fitInImage Leaflet');
		this.facsimileTile.fitInImage();
	},
	
	addAnnotations: function (annotations) {
		console.log('Add Annotations Leaflet');
		console.log(annotations);
		var me = this;
		
		me.shapes.add('annotations', annotations);
		
		/*annotations.each(function(annotation) {
			var plist_1 = Ext.Array.toArray(annotation.get('plist'));
        	Ext.Array.insert(me.shapes.get('annotations'), 0, plist_1);
		});*/
		
		for (i = 0; i < annotations.data.items.length; i++) {
			var plist = annotations.data.items[i].data.plist;
			var annotURI = annotations.data.items[i].data.uri;
			var idInner = annotations.data.items[i].data.id;
			var name = annotations.data.items[i].data.title;
			var args_fn = annotations.data.items[i].data.fn;
			var priority = annotations.data.items[i].data.priority;
			var category = annotations.data.items[i].data.categories;
			//Ext.Array.insert(me.shapes.get('annotations'), 0, plist);
			for (j = 0; j < plist.length; j++) {
				var lrx = plist[j].lrx;
				var lry = plist[j].lry;
				var ulx = plist[j].ulx;
				var uly = plist[j].uly;
				
				var annotKey = null;
				/*if(priority.length > 1 && category.length > 1 ){
					annotKey = priority+category;
				}*/
				if(priority.length > 1){
					annotKey = priority;
					me.addToMap(me.annotMap, annotKey, plist[j]);
				}
				if(category.length > 1){
					annotKey = category;
					me.addToMap(me.annotMap, annotKey, plist[j]);
				}
				
				
				
				
				var rectangleCenter = me.facsimileTile.enableAnnotationRectangle(ulx, uly, lrx, lry, annotKey);
				//console.log('rectangleCenter_0');
				//console.log(rectangleCenter);
				me.addAnnotationsListener(rectangleCenter, ulx, uly, lrx, lry, annotURI, idInner, name, args_fn);
			}
		}
	
	},
	
	addToMap: function(annotMap, annotKey, el){
		if(annotMap.has(annotKey)){
					var arrayValue = annotMap.get(annotKey)
					arrayValue.push(el);					
				}
				else{
					var arrayValue = [];
					arrayValue.push(el);
					annotMap.set(annotKey, arrayValue);
				}
	},
	
	  addAnnotationsListener: function(rectangleCenter, ulx, uly, lrx, lry, annotURI, idInner, name, args_fn){
		var me = this;
		console.log('rectangleCenter');
		console.log(rectangleCenter);
		
		rectangleCenter.on('mouseover', function (e) {
					console.log("mouseover Leaflet");
					
					
               Ext.Ajax.request({
                        url: 'data/xql/getAnnotation.xql',
                        method: 'GET',
                        params: {
                            uri: annotURI,
                            target: 'tip',
                            edition: EdiromOnline.getApplication().activeEdition
                        },
                        success: function(response){
                            //this.update(response.responseText);
                            console.log('getAnnotation');
                            //console.log(response.responseText);
                       
                            me.facsimileTile.disableRectangle();
							var rect_tmp = me.facsimileTile.enableRectangle(ulx, uly, lrx, lry, true);
                          	me.facsimileTile.createPupup(lrx, lry);
                            me.facsimileTile.setPopupContent(response.responseText);
                            
                            rect_tmp.on('click', function (e) { 
         						console.log("click Leaflet");
         						console.log(args_fn);
         						eval(args_fn);
      						});
                           
                        }
                       // scope: this
                    });
        
                });
 
	},
	
	getShapeElem: function (shapeId) {
		
		console.log("getShapeElem Leaflet");
		console.log(shapeId);
		
		var me = this;
		console.log(me.shapes);
		
		var shapes_list = me.shapes.items[0];
		var shape = null;
		for (i = 0; i < shapes_list.length; i++) {
			if (shapes_list[i].id === shapeId) {
				shape = shapes_list[i];
				break;
			}
		}
		console.log(shapes_list);
		console.log(shape);
		
		return shape;
	},
	
	getShapes: function (groupName) {
		
		console.log("getShapes leaflet");
		console.log(groupName);
		
		
		var me = this;
		console.log(me.shapes.get(groupName));
		return me.shapes.get(groupName);
	},
	
	showRect: function (ulx, uly, width, height, highlight) {
		console.log('showRect Leaflet');
		console.log(ulx);
		console.log(uly);
		console.log(width);
		console.log(height);
		console.log(highlight);
		this.facsimileTile.disableRectangle();
		this.facsimileTile.enableRectangle(ulx, uly, ulx + width, uly + height, false);
	},
	
	showMeasure: function (selectedObject) {
		console.log('showMeasure Leaflet');
		console.log(selectedObject);
		//this.addMeasures(selectedObject);
		/*	var measureNr = 'measure'+selectedObject.data.measurenr+'_s'+selectedObject.data.staff;
		for (i = 0; i < zones.length; i++) {
		if(zones[i].id.indexOf(measureNr) > -1){
		var lrx = zones[i].lrx;
		var lry = zones[i].lry;
		var ulx = zones[i].ulx;
		var uly = zones[i].uly;
		this.facsimileTile.disableRectangle();
		this.facsimileTile.enableRectangle(ulx, uly, lrx, lry);
		break;
		}
		}*/
	},
	
	getActualRect: function () {
		
		console.log("getActualRect Leaflet");
		var me = this;
		return {
			x: 0,
			y: 0,
			width: me.imgWidth,
			height: me.imgHeight
		};
	},
	
	hideOverlay: function (overlayId) {
		console.log("hideOverlay Leaflet");
		console.log(overlayId);
		this.facsimileTile.removeLayerMarkers(overlayId);
	},
	
	showOverlay: function (overlayId, overlay) {
		console.log("showOverlay Leaflet");
		console.log(overlayId);
		console.log(overlay);
		
		var svgURL = "data:image/svg+xml;base64," + btoa(overlay);
		
		var xmlFile = jQuery.parseXML(overlay);
		
		var svg_name = xmlFile.getElementsByTagName('svg');
		var element = svg_name[0];
		var svg_width = parseInt(element.getAttribute('width'));
		var svg_height = parseInt(element.getAttribute('height'));
		
		this.facsimileTile.showOverlay(overlayId, svg_width, svg_height, svgURL);
	}
});