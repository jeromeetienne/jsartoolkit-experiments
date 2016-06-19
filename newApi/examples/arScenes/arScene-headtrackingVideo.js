var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

arScenes['headtrackingVideo'] = {
	setupArContext : function(arContextOpts, onArContextReady){
		var url = '../../videos/headtracking.mp4'
		var srcElement = THREE.ArUtils.setupArContextWithVideo(url, arContextOpts, function(arContext){
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
		arMarker.marContEnabled = false

		var mesh = buildTorusCube()
		arMarker.originObject.add( mesh );
	}
}
