var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

arScenes['armchairImage'] = {
	/**
	 * setup arContext and srcElement
	 */
	setupArContext : function(arContextOpts, onArContextReady){
		var url = '../../images/armchair.jpg'
		var srcElement = THREE.ArUtils.setupArContextWithImage(url, arContextOpts, function(arContext){
			onArContextReady(arContext)
		})
		return srcElement		
	},
	
	setupDetection : function(){
		// 
		// // good for roomspace
		// // For more information about AR_MATRIX_CODE_3x3_HAMMING63
		// // https://github.com/artoolkit/artoolkit5/tree/master/doc/patterns/Matrix%20code%203x3%20with%20Hamming%20(6%2C3)%20code
	        // arContext.controller.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
	        // arContext.controller.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_3x3_HAMMING63);
	        // arContext.controller.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_3x3_PARITY65)	
	},
	setupMarkers : function(){
		var markerRight = THREE.ArUtils.buildDebugArMarker(0)
		arMarkers.push( markerRight )
	}
}
