(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 */

THREE.VRControls = function ( object, callback ) {

	var scope = this;

	// Allow for multiple VR input devices.
	var vrInputs = [];

	var onVRDevices = function ( devices ) {

		for ( var i = 0; i < devices.length; i ++ ) {

			var device = devices[ i ];

			if ( device instanceof PositionSensorVRDevice ) {

				vrInputs.push( devices[ i ] );

			}

		}

		if ( callback !== undefined ) {

			callback( 'HMD not available' );

		}

	};

	if ( navigator.getVRDevices !== undefined ) {

		navigator.getVRDevices().then( onVRDevices );

	} else if ( callback !== undefined ) {

		callback( 'Your browser is not VR Ready' );

	}

	// the Rift SDK returns the position in meters
	// this scale factor allows the user to define how meters
	// are converted to scene units.
	this.scale = 1;

	this.update = function () {

	  for ( var i = 0; i < vrInputs.length; i++ ) {

	    var vrInput = vrInputs[ i ];

	    var state = vrInput.getState();

	    if ( state.orientation !== null ) {

	      object.quaternion.copy( state.orientation );

	    }

	    if ( state.position !== null ) {

	      object.position.copy( state.position ).multiplyScalar( scope.scale );

	    }

	  }

	};

	this.zeroSensor = function () {

	  for ( var i = 0; i < vrInputs.length; i++ ) {

	    var vrInput = vrInputs[ i ];

	    vrInput.zeroSensor();

	  }

	};

};

},{}]},{},[1])