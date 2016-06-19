var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

arScenes['cubeImage'] = {
	/**
	 * setup arContext and srcElement
	 */
	setupArContext : function(debugDetectEnabled, onArContextReady){
		var type = 'image'
		var url = '../../images/marker_cube_hamming63.png'
		var srcElement = THREE.ArUtils.setupArContextWithImage(url, debugDetectEnabled, function(arContext){
			onArContextReady(arContext)
		})
		return srcElement		
	},
	
	setupDetection : function(){
	        arContext.controller.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
	        arContext.controller.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_3x3_HAMMING63);
	},
	setupMarkers : function(){
		var marker = THREE.ArUtils.buildDebugArMarker(0)
		arMarkers.push( marker )
		var marker = THREE.ArUtils.buildDebugArMarker(1)
		arMarkers.push( marker )
		var marker = THREE.ArUtils.buildDebugArMarker(2)
		arMarkers.push( marker )
		var marker = THREE.ArUtils.buildDebugArMarker(3)
		arMarkers.push( marker )
		var marker = THREE.ArUtils.buildDebugArMarker(4)
		arMarkers.push( marker )
		var marker = THREE.ArUtils.buildDebugArMarker(5)
		arMarkers.push( marker )
	}
}
