
THREE.ArtoolkitContext = function(options, onReady){
	var _this = this

	// parse options
	this.debugEnabled = options.debugEnabled !== undefined ? options.debugEnabled : false
	console.assert(options.width !== undefined)
	console.assert(options.height !== undefined)

	// set some states
	this.controller = null
	this.ready = false
	this.detectionDate = null

	// load camera parameters
	var cameraParamsUrl = options.cameraParamsUrl !== undefined ? options.cameraParamsUrl : '../../data/camera_para.dat'
	var cameraParameters = new ARCameraParam(cameraParamsUrl, function() {
		
		_this.controller = new ARController(options.width, options.height, cameraParameters);
		if( _this.debugEnabled  )	_this.controller.debugSetup();

		// honor arContext.ready
		_this.ready = true
		// notify the callback
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
