THREE.ArtoolkitContext = function(width, height, camera, onReady){
	var _this = this
	this.controller = null
	this.debugEnabled = true
	this.ready = false
	var cameraParameters = new ARCameraParam('../data/camera_para.dat', function() {
	
		_this.controller = new ARController(width, height, cameraParameters);
		if( _this.debugEnabled  )	_this.controller.debugSetup();
	
		var projectionMatrix = _this.controller.getCameraMatrix();
		camera.projectionMatrix.elements.set(projectionMatrix);
		
		// load kanji pattern
		_this.controller.loadMarker('../data/patt.kanji', function(markerId) {
			var markerWidth = 1
			var markerTracker = _this.controller.trackPatternMarkerId(markerId, markerWidth);
		});

		// load hiro pattern
		_this.controller.loadMarker('../data/patt.hiro', function(markerId) {
			var markerWidth = 1
			var markerTracker = _this.controller.trackPatternMarkerId(markerId, markerWidth);
		});
		
		_this.ready = true

		onReady && onReady()
	
	})
}

THREE.ArtoolkitContext.prototype.update = function (srcElement) {
	this.controller.detectMarker(srcElement);

	if( this.debugEnabled  )	this.controller.debugDraw();	
};
