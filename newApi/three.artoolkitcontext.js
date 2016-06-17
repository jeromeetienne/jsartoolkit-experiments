THREE.ArtoolkitContext = function(width, height, camera, debugEnabled, onReady){
	var _this = this

	this.controller = null
	this.debugEnabled = debugEnabled
	this.ready = false

	this.detectionDate = null

	// TODO put that in a function init
	var cameraParamsUrl = '../data/camera_para.dat'
	var cameraParameters = new ARCameraParam(cameraParamsUrl, function() {
	
		_this.controller = new ARController(width, height, cameraParameters);
		if( _this.debugEnabled  )	_this.controller.debugSetup();

		// put that elsewhere
		var projectionMatrix = _this.controller.getCameraMatrix();
		camera.projectionMatrix.elements.set(projectionMatrix);

		_this.ready = true

		onReady && onReady()	
	})
}

THREE.ArtoolkitContext.prototype.detect = function (srcElement) {
	this.detectionDate = performance.now();
	this.controller.detectMarker(srcElement);

	if( this.debugEnabled  )	this.controller.debugDraw();	
};
