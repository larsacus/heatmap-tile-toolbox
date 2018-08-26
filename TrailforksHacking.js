
var patchLeafletsUpdate = function() {
    L.Marker.prototype.update = function () {
        if (this._icon) {
            var t = this._map.latLngToLayerPoint(this._latlng).round();
            L.Util.requestAnimFrame(function () {
                this._setPos(t);
            }, this);
        }
        console.log(this);
        return this;
    };
}

var patchLeafletsEndZoomAnim = function() {
    L.TileLayer.prototype._endZoomAnim = function () {
        var front = this._tileContainer,bg = this._bgBuffer;
        front.style.visibility = '';
        front.parentNode.appendChild(front);
        L.Util.falseFn(bg.offsetWidth);
        var zoom = this._map.getZoom();
        if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
            this._clearBgBuffer();
        }
        this._animating = false;
    };
}

var addLeafletsStravaLayer = function() {
    var stravaLayer = L.tileLayer('//heatmap-external-{s}.strava.com/tiles-auth/cycling/bluered/{z}/{x}/{y}.png?px=256', {attribution: 'Strava', maxNativeZoom: 16});
    L.control.layers(null, {"Strava Heatmap" : stravaLayer}).addTo(map);
}

var addHeatmapGoogleMap = function(map) {
    // Replace this with your URL.
    var stravaTileURL = 'https://heatmap-external-{s}.strava.com/tiles-auth/cycling/bluered/{z}/{x}/{y}.png?px=256';
    var layerID = 'strava_heatmap_layer'
    var shards =  ['a','b','c']

    // Create a new ImageMapType layer.
    var layer = new google.maps.ImageMapType({
    name: layerID,
    getTileUrl: function(coord, zoom) {
        var url = stravaTileURL
        .replace('{s}', shards[Math.floor(Math.random() * shards.length)])
        .replace('{x}', coord.x)
        .replace('{y}', coord.y)
        .replace('{z}', zoom);
        return url;
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 16
    });
    map.overlayMapTypes.insertAt(0, layer);
}

//addHeatmapGoogleMap(mapridingarea)  // for riding area map
//addHeatmapGoogleMap(mapDS_) // for trail map

// mapDS_.mapTypes.set(layerID, layer);
// mapDS_.setMapTypeId(layerID);
