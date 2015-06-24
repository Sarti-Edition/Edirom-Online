/**
 * Creates class pmdCE.view.facsimileView.LeafletFacsimile that extend from Ext.Component.
 * @class
 * @classdesc pmdCE.view.facsimileView.LeafletFacsimile for create leaflet component.
 */
Ext.define('pmdCE.view.facsimileView.LeafletFacsimile', {
	extend: 'Ext.Component',
	
	alias: 'widget.leafletmapview',
	id: 'leafletfacsimile',
	config: {
		map: null
	},
	
	zones: null,
	facsimileTile: null,
	
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
		} else {
			
			var selectedPage = Ext.getCmp('pages').getText();
			
			Ext.Ajax.request({
				 url: 'resources/xql/getZones.xql',
				//url: 'data/getZones.xql',
				async: false,
				method: 'GET',
				params: {
					path: selectedPage
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					this.zones = json.zones;
					var page = json.page;
					
					facsimileHeight = 
					//2992;
					page.height;
					facsimileWidth = 
					//3991;
					page.width;
					
					var originalMaxSize = null;
					
					if (facsimileHeight > facsimileWidth) {
						originalMaxSize = facsimileHeight;
					} else {
						originalMaxSize = facsimileWidth;
					}
					
					var maxZoomLevel = 0;
					while (originalMaxSize > 256) {
						originalMaxSize = originalMaxSize / 2;
						maxZoomLevel++;
					}
					console.log("maxZoomLevel :" + maxZoomLevel);
					
					var map = L.map(me.getId());
					
					map.setView([0, 0], Math.round(maxZoomLevel / 2));
					
					me.setMap(map);
					
					var sourceName = Ext.getCmp('source').getText();
					
					var pageName = Ext.getCmp('pages').getText();
					
					 var path = 'http://localhost:8080'+json.path;
					 
					 console.log('facsimile path');
					 console.log(json.path);
					
					me.facsimileTile = 
					/*L.tileLayer.facsimileLayer('data/example/{z}-{x}-{y}.jpg', {
						minZoom: 0,
						maxZoom: maxZoomLevel,
						continuousWorld: true
					});*/
					
					
					 L.tileLayer.facsimileLayer(path, {
					minZoom: 0,
					maxZoom: maxZoomLevel,
					continuousWorld : true
					});
					
					me.facsimileTile.setWidth(facsimileWidth);
					
					me.facsimileTile.setHeight(facsimileHeight);
					
					me.facsimileTile.addTo(map);
					
					/* var selectedPage = Ext.getCmp('pages').getText();
					var pageStaffMap = Ext.getCmp('cetoolbar').staffNr;
					var test = pageStaffMap[selectedPage];
					var staffNr = test[test.length-1];
					var pageMeasuresMap = Ext.getCmp('cetoolbar').pageMeasuresMap;
					var test = pageMeasuresMap[selectedPage];
					var value = test[0];*/
					
					for (i = 0; i < zones.length; i++) {
						/* if(zones[i].type === 'measure'){
						var lrx = zones[i].lrx;
						var lry = zones[i].uly;
						var ulx = zones[i].ulx;
						var uly = 0;
						me.facsimileTile.showRectangleCenter(ulx, uly, lrx, lry, zones[i].n);
						}*/
						if (zones[i].type === 'staff') {
							//console.log(zones[i]);
							var lrx = zones[i].lrx;
							var lry = zones[i].lry;
							var ulx = zones[i].ulx;
							var uly = zones[i].uly;
							var id = zones[i].id;
							var splittedId = id.split('_');
							var splittedId = splittedId[3];
							var mrNr = splittedId.substring(7);
							var name = 's' + zones[i].n + 'm' + mrNr;
							me.facsimileTile.showRectangleCenter(ulx, uly, lrx, lry, name);
						}
						/*if(zones[i].type === 'staff' && zones[i].n <= staffNr && zones[i].id.indexOf(value) > -1){
						var lrx = zones[i].ulx;
						var lry = zones[i].lry;
						var ulx = 0;
						var uly = zones[i].uly;
						me.facsimileTile.showRectangleCenter(ulx, uly, lrx, lry, zones[i].n);
						}*/
					}
					
					map.on('click', function (e) {
						/*console.log(e.latlng);
						console.log(e.layerPoint);
						console.log(e.containerPoint);
						console.log(e.originalEvent);*/
					});
				}
			});
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
			map.invalidateSize();
		}
	},
	
	showMeasure: function(selectedObject){
		//console.log('Show');
		//console.log(selectedObject);
		var measureNr = 'measure'+selectedObject.data.measurenr+'_s'+selectedObject.data.staff;
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
		}
	
	}
	
	/* listeners: {
	click : {
	fn: function() {
	
	var app = pmdCE.getApplication();
	var store = app.getFacsimileStore();
	console.log(store);
	console.log(document);
	
	facsimileHeight = store.data.items[0].data.page.height;
	facsimileWidth = store.data.items[0].data.page.width;
	
	},
	element: 'el'
	
	}
	}*/
});