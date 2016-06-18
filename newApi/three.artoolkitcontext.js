
THREE.ArtoolkitContext = function(width, height, debugEnabled, onReady){
	var _this = this

	this.controller = null
	this.debugEnabled = debugEnabled
	this.ready = false

	this.detectionDate = null

	// TODO put that in a function init
	var cameraParamsUrl = '../../data/camera_para.dat'
	var cameraParameters = new ARCameraParam(cameraParamsUrl, function() {
	
		_this.controller = new ARController(width, height, cameraParameters);
		if( _this.debugEnabled  )	_this.controller.debugSetup();

		_this.ready = true

		onReady && onReady(_this)	
	})
}

/**
 * setup the camera
 * 
 * @param {THREE.Camera} camera - the camera
 */
THREE.ArtoolkitContext.prototype.setupCamera = function (camera) {
	console.assert( camera instanceof THREE.Camera )
	camera.matrixAutoUpdate = false;

	var projectionMatrix = this.controller.getCameraMatrix();
	camera.projectionMatrix.elements.set(projectionMatrix);
}

THREE.ArtoolkitContext.prototype.detect = function (domElement) {
	this.detectionDate = performance.now();
	this.controller.detectMarker(domElement);

	if( this.debugEnabled  )	this.controller.debugDraw();	

	// console.log('markerNum', this.controller.getMarkerNum(), this.controller.getMarker(0))
};
