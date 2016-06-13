THREE.ArtoolkitContext = function(width, height, camera, debugEnabled, onReady){
	var _this = this
	this.controller = null
	this.debugEnabled = debugEnabled
	this.ready = false
	
	// TODO put that in a function init
	var cameraParamsUrl = '../data/camera_para.dat'
	var cameraParameters = new ARCameraParam(cameraParamsUrl, function() {
	
		_this.controller = new ARController(width, height, cameraParameters);
		if( _this.debugEnabled  ){
			_this.controller.debugSetup();
			// _this.controller.canvas.style.position = 'absolute'
			// _this.controller.canvas.style.top = '0px'
			// _this.controller.canvas.style.left = '0px'
			// _this.controller.canvas.style.opacity = '0.2'
		}

		// put that elsewhere
		var projectionMatrix = _this.controller.getCameraMatrix();
		camera.projectionMatrix.elements.set(projectionMatrix);

		_this.ready = true

		onReady && onReady()	
	})
}

THREE.ArtoolkitContext.prototype.update = function (srcElement) {
	this.controller.detectMarker(srcElement);

	if( this.debugEnabled  )	this.controller.debugDraw();	
};
