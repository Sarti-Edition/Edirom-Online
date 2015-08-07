/**
 * Creates a new class FacsimileLayer that extend from L.TileLayer.
 * @class
 * @classdesc FacsimileLayer is for show not square tile layers.
 */
L.TileLayer.FacsimileLayer = L.TileLayer.extend({
	
	/**
    * Global variable to define bounds of the rectangle.
    * @type {LatLngBounds}
    */
	bounds: null,
	
	/**
    * Global variable to define a rectangle.
    * @type {Rectangle}
    */
	rectangle: null,
	
	/**
    * Global variable to define the rectangle center.
    * @type {Circle}
    */
	rectangleCenter: null,
	
	facsimileWidth: null,
	
	facsimileHeight: null,
	
	markersArray: null,
	annotArray: null,
	
	/** 
	 * Initialite a facsimile layer.
     * @overrides
     * @param {string} url - path.
     * @param {object} options - optionally options for layer.
     */
	initialize: function (url, options) {
	   L.TileLayer.prototype.initialize.call(this, url, options);
	},
	
	setWidth: function(facsimileWidth){
	    this.facsimileWidth = facsimileWidth;
	},
	
	setHeight: function(facsimileHeight){
	    this.facsimileHeight = facsimileHeight;
	},
	
	enableAnnotationRectangle: function(ulx, uly, lrx, lry){  
		if(typeof  this.annotArray === 'undefined' || this.annotArray === null){
       		this.annotArray = [];
       }
		var rect = this.enableRectangle(ulx, uly, lrx, lry);
		this.annotArray.push(rect);
	},
	
	removeAnnotations: function(){
       	if(typeof  this.annotArray !== 'undefined' && this.annotArray !== null){
       		for(i = 0; i < this.annotArray.length; i++){
       			this._map.removeLayer(this.annotArray[i]);
       		}
       		this.annotArray = null;
       	}
     },
	
    /**
    * Create and show a rectangle with given coordinates in pixel
    * @param {number} ulx - left x coordinate.
    * @param {number} uly - left y coordinte.
    * @param {number} lrx - right x coordinate.
    * @param {number} lry - right y coordinste.
    */
     enableRectangle: function(ulx, uly, lrx, lry){  
      // if(typeof this.rectangle === 'undefined' || this.rectangle === null){
            // define points in coordinates system
            var pointLeft = L.point(ulx, uly);
            var pointRight = L.point(lrx, lry);
           
            // convert coordinates in degrees
            var latLngLeft = this._map.unproject(pointLeft, this._map.getMaxZoom());
            var latLngRight = this._map.unproject(pointRight, this._map.getMaxZoom());
            
           // var latLngLeft = L.latLng(ulx, uly);
            // var latLngRight = L.latLng(lrx, lry);
         
	       // create bounds for a rectangle
	       bounds = L.latLngBounds(latLngLeft, latLngRight);
	       
            // create rectangle
           // console.log(Ext.getCmp('leafletfacsimile').getMap());
	       this.rectangle = L.rectangle(bounds, {color: 'black', weight: 1, opacity: 0.8}).addTo(this._map);
	       return this.rectangle;
	      // zoom rectangle in windows center
	      //this._map.fitBounds(bounds);
	        
	 //   }
       },     
       
     /**
      * Remove rectanle and center from map.
     */
       disableRectangle: function(){
          if(typeof this.rectangle !== 'undefined' && typeof  this._map  !== 'undefined'
          && this._map.hasLayer(this.rectangle)){
            this._map.removeLayer(this.rectangle);
            this.rectangle = null;
          }
         /* if(typeof rectangleCenter !== 'undefined' && this._map.hasLayer(rectangleCenter)){
            this._map.removeLayer(rectangleCenter);
            rectangleCenter = null;
          }  */ 
       },
       
     /**
      * Show and zoom rectangle in windows center.
     */
       zoomRectangle: function(){
           if(typeof bounds !== 'undefined' && bounds !== null){
            this._map.fitBounds(bounds);
           }         
       },
       
       fitInImage: function(){
       
       var corrd1 = this.facsimileWidth/2;
       var corrd2 = this.facsimileHeight/2;
       var centerPoint = L.point(corrd1, corrd2);	
       var latLngCenterPoint = this._map.unproject(centerPoint, this._map.getMaxZoom());	
	    this._map.setView([latLngCenterPoint.lat, latLngCenterPoint.lng], 0);
	   		
		/*var targetPoint1 =  this._map.project(latLngCenterPoint, this._map.getMaxZoom()).subtract([0, 0]);
    	var targetLatLng1 =  this._map.unproject(targetPoint1, this._map.getMaxZoom());
    				
    				
    				var coord4 =  L.point(this.facsimileWidth, this.facsimileHeight);
    				var targetLatLng2 =  this._map.unproject(coord4, this._map.getMaxZoom());
    				
    				var targetPoint2 =  this._map.project(targetLatLng2, this._map.getMaxZoom()).subtract([0, 0]);
    				
    				
    				var mapBoundsLng = L.latLngBounds(targetPoint1, targetLatLng2);
					
					 this._map.fitBounds(mapBoundsLng, {padding: []});			
		*/
					
		 
		// var maxZoom = this._map.getMaxZoom();    
    	//var currZoom = this._map.getZoom();
    
    	//var numberCol =this.facsimileWidth/(256*(Math.pow(2,maxZoom-currZoom)));
    	//var numberRow = this.facsimileHeight/(256*(Math.pow(2,maxZoom-currZoom)));
		 
		var coord3 =  L.point(0, 0);	
		var coord4 =  L.point(this.facsimileWidth, this.facsimileHeight);
		//var coord4 =  L.point(256*numberCol, 256*numberRow);
		
		//var latLngLeft = this._map.unproject(centerPoint, this._map.getMaxZoom());
		var latLngLeft = this._map.unproject(coord3, this._map.getMaxZoom());
        var latLngRight = this._map.unproject(coord4, this._map.getMaxZoom());
            
		var bounds = L.latLngBounds(latLngLeft, latLngRight);
		
		this._map.fitBounds(bounds);
		
	  
      // this._map.fitBounds(this._map.getBounds());
      
       /*var corrd1 = this.facsimileWidth/2;
       				var corrd2 = this.facsimileHeight/2;
          			 var centerPoint = L.point(corrd1, corrd2);	
          			 var latLngCenterPoint =  this._map.unproject(centerPoint, this._map.getMaxZoom());	
					 this._map.setView([latLngCenterPoint.lat, latLngCenterPoint.lng], 0);
       		var targetPoint1 =  this._map.project(latLngCenterPoint, this._map.getMaxZoom()).subtract([0, 0]);
    				var targetLatLng1 =  this._map.unproject(targetPoint1, this._map.getMaxZoom());
    				
    				var targetPoint2 =  this._map.project(latLngCenterPoint, this._map.getMaxZoom()).subtract([0, 0]);
    				var targetLatLng2 =  this._map.unproject(targetPoint2, this._map.getMaxZoom());
    				
    				var mapBoundsLng = L.latLngBounds(targetPoint1, targetLatLng2);
					console.log( this._map.getBounds());
					 this._map.fitBounds(mapBoundsLng);
					console.log( this._map.getBounds());*/
       	/*	var mapBounds = this._map.getPixelBounds();
					var minPoint = mapBounds.min;
					var maxPoint = mapBounds.max;
					var minPointLng = this._map.unproject(minPoint, this._map.getZoom());
					var maxPointLng = this._map.unproject(maxPoint, this._map.getZoom());
					var mapBoundsLng = L.latLngBounds(minPointLng, maxPointLng);
					 
					var zoomPossible = this._map.getBoundsZoom(mapBoundsLng, true);
					console.log(zoomPossible);
					
					this._map.fitBounds(mapBoundsLng);*/
       },
          
   /**
    * Compute and show center for given bounds.
    * @param {number} ulx - left x coordinate.
    * @param {number} uly - left y coordinte.
    * @param {number} lrx - right x coordinate.
    * @param {number} lry - right y coordinste.
    */
     showRectangleCenter: function(ulx, uly, lrx, lry, nr){  
       var me = this;
       //if(typeof rectangleCenter === 'undefined' || rectangleCenter === null){
       if(typeof  this.markersArray === 'undefined' || this.markersArray === null){
       		this.markersArray = [];
       }
       
       
       ulx = parseInt(ulx);      
       uly = parseInt(uly);       
       lrx = parseInt(lrx);       
       lry = parseInt(lry);
       
       var corrd1 = ((lrx-ulx)/2+ulx);
       var corrd2 = ((lry-uly)/2)+uly;
           var centerPoint = L.point(corrd1, corrd2);
          
           // convert coordinates in degrees
		   var latLngCenterPoint = this._map.unproject(centerPoint, this._map.getMaxZoom());
		   // create circle in center          
          /* var rectangleCenter = L.circle([latLngCenterPoint.lat, latLngCenterPoint.lng], 100, {
               color: 'red',
               fillColor: '#f03',
               fillOpacity: 0.5
           }).addTo(this._map);*/
           
           var myIcon = L.divIcon({ 
           	iconSize: new L.Point(17, 17),
    		html: '<center>'+nr+'</center>'
		});

		var marker = L.marker([latLngCenterPoint.lat, latLngCenterPoint.lng], {icon: myIcon}); 
        marker.addTo(this._map);
        marker.on('mouseover', function (e) {
        	if(typeof me.rectangle !== 'undefined' && me.rectangle !== null){
        		me.disableRectangle();      		
        	}
        	me.enableRectangle(ulx, uly, lrx, lry);
						/*console.log(e.latlng);
						console.log(e.layerPoint);
						console.log(e.containerPoint);
						console.log(e.originalEvent);*/
					});
       
        this.markersArray.push(marker);
     },	
        
     /**
      * Remove markers from the map.
      */
       removeMarkers: function(){
       	if(typeof  this.markersArray !== 'undefined' && this.markersArray !== null){
       		for(i = 0; i < this.markersArray.length; i++){
       			this._map.removeLayer(this.markersArray[i]);
       		}
       		this.markersArray = null;
       	}
       },
      
	/**
	* Add tiles that contain to image only.
	* @override
	* @param {Point} coords.
	* @param {Object} container.
    */
    _addTile: function (coords, container) {
    
    var originalMaxWidth = this.facsimileWidth;//3991;   
    var originalMaxHeight = this.facsimileHeight;//2992;
	
	var maxZoom = this._map.getMaxZoom();    
    var currZoom = this._map.getZoom();
    
    var numberCol = originalMaxWidth/(256*(Math.pow(2,maxZoom-currZoom)));
    var numberRow = originalMaxHeight/(256*(Math.pow(2,maxZoom-currZoom)));
   
    if((currZoom === 0 && coords.x === 0 && coords.y === 0)){
        L.TileLayer.prototype._addTile.call(this, coords, container);
    }    
    else if(coords.y < numberRow && coords.x < numberCol
    && coords.x >= 0 && coords.y >=0 && currZoom > 0){
        L.TileLayer.prototype._addTile.call(this, coords, container);
    }  
  }, 	
	
    /**
    * Create a canvas element to override tileSize of Tilelayer.
    * @override
    */
	_tileOnLoad: function () {
		var canvasTiles = document.createElement("canvas");		
		canvasTiles.width = canvasTiles.height = this._layer.options.tileSize;
		this.canvasContext = canvasTiles.getContext("2d");		
		var ctx = this.canvasContext;
		if (ctx) {
			this.onload  = null; 
			ctx.drawImage(this, 0, 0);
			var imgData = ctx.getImageData(0, 0, this._layer.options.tileSize, this._layer.options.tileSize);
			ctx.putImageData(imgData, 0, 0);
			this.src = ctx.canvas.toDataURL();			
		}

		L.TileLayer.prototype._tileOnLoad.call(this);
	}
});

/**
    * create instance of FacsimileLayer, passing url and options to the constructor
    * @override
    * @param {string} url - path.
    * @param {object} options - optionally options for layer.
    */
L.tileLayer.facsimileLayer = function (url, options) {
	return new L.TileLayer.FacsimileLayer(url, options);
};