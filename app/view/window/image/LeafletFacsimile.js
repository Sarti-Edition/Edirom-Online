/**
 * Creates class pmdCE.view.facsimileView.LeafletFacsimile that extend from Ext.Component.
 * @class
 * @classdesc pmdCE.view.facsimileView.LeafletFacsimile for create leaflet component.
 */
Ext.define('EdiromOnline.view.window.image.LeafletFacsimile', {
	extend: 'Ext.Component',
	
	alias: 'widget.leafletmapview',
	//id: 'leafletfacsimile',
	config: {
		map: null
	},
	
	zones: null,
	facsimileTile: null,
	facsimileHeight: null,
	facsimileWidth: null, 
	
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
		
		var pageId = 'edirom_surface_4b5b3e05-bbc5-4db0-988b-2b0da51fa292';
		var uri = 'xmldb:exist:///db/contents/sources/edirom_source_01b5977f-4075-4373-a709-5e762b81e8ca.xml';
		
		/*if(typeof EdiromOnline.controller.window.source.PageBasedView.activeView !== 'undefined' 
		&& typeof EdiromOnline.controller.window.source.PageBasedView.getActivePage() !== 'undefined'){		
			pageId = EdiromOnline.controller.window.source.PageBasedView.getActivePage().get('id');
			
			uri = EdiromOnline.view.window.source.SourceView.activeView.uri;		
		}	*/		
		console.log(pageId);
		console.log(uri);
			/*Ext.Ajax.request({
				 url: 'data/xql/getFacsimileSize.xql',
				async: false,
				method: 'GET',
				params: {
					uri: uri,
                	pageId: pageId
				},
				success: function (result) {
				
				 var data = result.responseText;

                var size = Ext.create('Ext.data.Store', {
                    fields: ['height', 'width'],
                    data: Ext.JSON.decode(data)
                });
				
					facsimileHeight = parseInt(size.data.items[0].data.height); 
					//977;
					facsimileWidth = parseInt(size.data.items[0].data.width); 
					//1280;*/
					
					/*var originalMaxSize = null;
					 console.log("imageSet");
					console.log(EdiromOnline.view.window.source.PageBasedView.imageSet);
					
					if (me.facsimileHeight > me.facsimileWidth) {
						originalMaxSize = me.facsimileHeight;
					} else {
						originalMaxSize = me.facsimileWidth;
					}
					
					var maxZoomLevel = 0;
					while (originalMaxSize > 256) {
						originalMaxSize = originalMaxSize / 2;
						maxZoomLevel++;
					}
					console.log("maxZoomLevel :" + maxZoomLevel);
					
					var map = L.map(me.getId());
					
					map.setView([0,0], 0);*/
					
					
					
					/*var corrd1 = me.facsimileWidth/2;
       				var corrd2 = me.facsimileHeight/2;
          			 var centerPoint = L.point(corrd1, corrd2);	
          			 var latLngCenterPoint = map.unproject(centerPoint, maxZoomLevel);	
					map.setView([latLngCenterPoint.lat, latLngCenterPoint.lng], 0);*/
					
					
					
					/*me.setMap(map);
					
					var path = 'http://localhost:8080/exist/rest/db/contents/example';
					
					me.facsimileTile = 
					L.tileLayer.facsimileLayer(path+'/{z}-{x}-{y}.jpg', {
						minZoom: 0,
						maxZoom: maxZoomLevel,
						continuousWorld: true
					});
					
					
					me.facsimileTile.setWidth(me.facsimileWidth);
					
					me.facsimileTile.setHeight(me.facsimileHeight);
					
					me.facsimileTile.addTo(map);*/
				
					
				/*	map.on('click', function (e) {
						console.log(e.latlng);
						console.log(e.layerPoint);
						console.log(e.containerPoint);
						console.log(e.originalEvent);
					});*/
					
					
					
				/*}
			});*/
			
		
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
		}
	},
	
	 addMeasures: function(shapes) {
	 
	 console.log('addMeasures Leaflet');
     console.log(shapes);
	 
	 for (i = 0; i < shapes.data.items.length; i++) {
				var name = shapes.data.items[i].data.name;
				var lrx = shapes.data.items[i].data.lrx;
				var lry = shapes.data.items[i].data.lry;
				var ulx = shapes.data.items[i].data.ulx;
				var uly = shapes.data.items[i].data.uly;
				this.facsimileTile.showRectangleCenter(ulx, uly, lrx, lry, name);		
		}
    },
    
     removeShapes: function(groupName) {
        console.log('removeShapes Leaflet');
        console.log(groupName);
        if(this.facsimileTile !== null){
        this.facsimileTile.removeMarkers();
        this.facsimileTile.disableRectangle();
        }
    },
    
    clear: function() {
    	console.log('Clear Leaflet');
    	if(this.facsimileTile !== null){
    		this.facsimileTile.removeMarkers();
        this.facsimileTile.disableRectangle(); 
        var map = this.getMap();
        map.remove();
    	}
    	
    },
    
    showImage: function(path, width, height, pageId) {
    console.log("showImage Leaflet");
					console.log(path);
					console.log(width);
					console.log(height);
					console.log(pageId);
		
		var leaflet_prefix = getPreference('leaflet_prefix');
		var fields = path.split('.');
		var name = fields[0];
		var leaflet_path = leaflet_prefix+name;
		console.log(leaflet_path);
		
    	var me = this;
    	me.facsimileHeight = parseInt(height);
		me.facsimileWidth = parseInt(width); 
		
		var originalMaxSize = null;
					 
					if (me.facsimileHeight > me.facsimileWidth) {
						originalMaxSize = me.facsimileHeight;
					} else {
						originalMaxSize = me.facsimileWidth;
					}
					
					var maxZoomLevel = 0;
					while (originalMaxSize > 256) {
						originalMaxSize = originalMaxSize / 2;
						maxZoomLevel++;
					}
					console.log("maxZoomLevel :" + maxZoomLevel);
					
					var map = L.map(me.getId());
					
					var corrd1 = me.facsimileWidth/2;
       				var corrd2 = me.facsimileHeight/2;
          			 var centerPoint = L.point(corrd1, corrd2);	
          			 var latLngCenterPoint = map.unproject(centerPoint, maxZoomLevel);	
					map.setView([latLngCenterPoint.lat, latLngCenterPoint.lng], 0);
					
					
					
					
					//map.setView([0,0], 0);
					
					me.setMap(map);
					
					me.facsimileTile = 
					L.tileLayer.facsimileLayer(leaflet_path+'/{z}-{x}-{y}.jpg', {
						minZoom: 0,
						maxZoom: maxZoomLevel
					});
										
					me.facsimileTile.setWidth(me.facsimileWidth);
					
					me.facsimileTile.setHeight(me.facsimileHeight);
					
					me.facsimileTile.addTo(map);
					
					this.facsimileTile.fitInImage();
    },
    
    fitInImage: function(){
    	console.log('fitInImage Leaflet');
    	this.facsimileTile.fitInImage();
    },
    
    addAnnotations: function(annotations) {
       console.log('Add Annotations Leaflet');     
					console.log(annotations);
    },
    
   showRect: function(ulx, uly, width, height, highlight) {
   	console.log('showRect Leaflet');     
					console.log(ulx);
					console.log(uly);
					console.log(width);
					console.log(height);
					console.log(highlight);
   
   	this.facsimileTile.enableRectangle(ulx, uly, ulx+width, uly+height);
   	
   },

	showMeasure: function(selectedObject){
		console.log('showMeasure Leaflet');
		console.log(selectedObject);
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
	
	}
	
	
});