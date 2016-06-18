var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

arScenes['generic'] = {
	/**
	 * setup arContext and srcElement
	 */
	setupArContext : function(debugDetectEnabled, onArContextReady){
		var type = 'image'
		// var type = 'image'
		if( type === 'webcam' ){
			var srcElement = THREE.ArUtils.createArContextWithWebcam(debugDetectEnabled, function(arContext){
				onArContextReady(arContext)
			})
		}else if( type === 'image' ){
			// var url = '../../images/armchair.jpg'
			// var url = '../../images/chalk.jpg'
			// var url = '../../images/chalk_multi.jpg'
			// var url = '../../images/kuva.jpg'
			var url = '../../images/img.jpg'
			var url = '../../images/marker_cube_hamming63.png'
			var srcElement = THREE.ArUtils.createArContextWithImage(url, debugDetectEnabled, function(arContext){
				onArContextReady(arContext)
			})
		}else if( type === 'video' ){
			// var url = '../../videos/output_4.mp4';
			var url = '../../videos/VID_20160503_165602-640x480.mp4'
			// var url = '../../videos/headtracking.mp4'
			// var url = '../../videos/me-marker-cube.mp4'
			var srcElement = THREE.ArUtils.createArContextWithVideo(url, debugDetectEnabled, function(arContext){
				onArContextReady(arContext)
			})
		}else {
			console.assert(false)
		}


		return srcElement		
	},
	
	setupDetection : function(){
		// load kanji pattern
		// TODO pass that into promise
		// arContext.controller.loadMarker('../../data/patt.kanji', function(markerId) {
		// 	var markerWidth = 1
		// 	var markerTracker = arContext.controller.trackPatternMarkerId(markerId, markerWidth);
		// 
		// 	// load hiro pattern
		// 	arContext.controller.loadMarker('../../data/patt.hiro', function(markerId) {
		// 		var markerWidth = 1
		// 		var markerId = arContext.controller.trackPatternMarkerId(markerId, markerWidth);
		// 		console.log('hiro markerId', markerId)
		// 	});
		// });

		// good for roomspace
		// For more information about AR_MATRIX_CODE_3x3_HAMMING63
		// https://github.com/artoolkit/artoolkit5/tree/master/doc/patterns/Matrix%20code%203x3%20with%20Hamming%20(6%2C3)%20code
	        arContext.controller.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
	        arContext.controller.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_3x3_HAMMING63);
	        // arContext.controller.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_3x3_PARITY65)	
	},
	setupMarkers : function(){
		var markerUnknown = THREE.ArUtils.buildDebugArMarker(-1, 'torusknot')
		arMarkers.push( markerUnknown );
		
		var markerLeft = THREE.ArUtils.buildDebugArMarker(1)
		arMarkers.push( markerLeft )
		
		var markerMiddle = THREE.ArUtils.buildDebugArMarker(2)
		arMarkers.push( markerMiddle )

		var markerRight = THREE.ArUtils.buildDebugArMarker(0)
		arMarkers.push( markerRight )
	}
}
