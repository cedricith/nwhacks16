(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function MyoMapExplorer(position, mapEl, searchEl) {
  var panoOptions = {
    position: position,
    addressControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    linksControl: false,
    panControl: false,
    zoomControl: false,
    enableCloseButton: false
  };

  this.panorama = new google.maps.StreetViewPanorama(mapEl , panoOptions);
  this.panorama.controls[google.maps.ControlPosition.TOP_CENTER].push(searchEl);

  this.searchBox = new google.maps.places.SearchBox(searchEl);
  google.maps.event.addListener(this.searchBox, 'places_changed', this.placeChanged.bind(this));
}

MyoMapExplorer.prototype.placeChanged = function() {
  var places = this.searchBox.getPlaces();
  if (!places.length) return;
  this.setLatLng(places[0].geometry.location, function(){});
}

MyoMapExplorer.prototype.setLatLng = function(latLng, cb) {
    var sv = new google.maps.StreetViewService();
    sv.getPanoramaByLocation(latLng, 1e2, function(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        this.panorama.setPosition(data.location.latLng);
        cb();
      } else {
        cb(new Error('Unable to find StreetView for that location'));
      }
    }.bind(this));
}

MyoMapExplorer.prototype.setMyoEmitter = function(emitter) {
  this.emitter = emitter;
  emitter.on('move_forward', this.moveForward.bind(this));
  emitter.on('move_backwards', this.moveBackward.bind(this));
  emitter.on('left_rotate', this.zoomOut.bind(this));
  emitter.on('right_rotate', this.zoomIn.bind(this));
  //emitter.on('mark_page', this.turnRight.bind(this));
};

MyoMapExplorer.prototype.moveForward = function() {
  // var pov   = this.panorama.getPov();
  var heading = currHeading;
  var links = panoLoader.panorama.getLinks();
  var best  = {diff: 0, link: null};

  for (var i in links) {
    var diff = (links[i].heading - heading) % 360;
    if (diff < 0) diff += 360;
    if (diff > 180) diff = 360 - diff;
    if (diff < 45) {
      if (!best.link || diff < best.diff) {
        best = {diff: diff, link: links[i]};
      }
    }
  }

  // if (best.link) this.panorama.setPano(best.link.pano);
  if (best.link) panoLoader.load(best.link.pano);
};

MyoMapExplorer.prototype.moveBackward = function() {
  var pov   = this.panorama.getPov();
  var links = this.panorama.getLinks();
  var best  = {diff: 0, link: null};

  for (var i in links) {
    var diff = (links[i].heading - pov.heading) % 360;
    if (diff < 0) diff += 360;
    if (diff > 180) diff = 360 - diff;
    if (diff > 135) {
      if (!best.link || diff < best.diff) {
        best = {diff: diff, link: links[i]};
      }
    }
  }

  if (best.link) this.panorama.setPano(best.link.pano);
};

MyoMapExplorer.prototype.zoomIn = function() {
  this.panorama.setZoom(this.panorama.getZoom() + 1);
};

MyoMapExplorer.prototype.zoomOut = function() {
  this.panorama.setZoom(this.panorama.getZoom() - 1);
};

module.exports = MyoMapExplorer;

},{}]},{},[1])
