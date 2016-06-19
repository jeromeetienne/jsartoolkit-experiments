var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

arScenes['webcamKanji'] = {
	setupArContext : function(arContextOpts, onArContextReady){
		var srcElement = THREE.ArUtils.setupArContextWithWebcam(arContextOpts, function(arContext){
			onArContextReady(arContext)
		})
		return srcElement		
	},
	setupDetection : function(arContext){
		arContext.controller.loadMarker('../../data/patt.kanji', function(markerId) {
			var markerWidth = 1
			var markerTracker = arContext.controller.trackPatternMarkerId(markerId, markerWidth);
		})
	},
	setupMarkers : function(){
		var arMarker = THREE.ArUtils.buildDebugArMarker(0)
		arMarkers.push( arMarker )

		var mesh = buildTorusCube()
		arMarker.originObject.add( mesh );
	}
}
