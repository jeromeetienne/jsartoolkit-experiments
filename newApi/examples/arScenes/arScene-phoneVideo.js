var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////
arScenes['phoneVideo'] = {
	setupArContext : function(arContextOpts, onArContextReady){
		var url = '../../videos/output_4.mp4';
		var srcElement = THREE.ArUtils.setupArContextWithVideo(url, arContextOpts, function(arContext){
			onArContextReady(arContext)
		})
		return srcElement		
	},
	setupDetection : function(){},
	setupMarkers : function(){
		var arMarker = THREE.ArUtils.buildDebugArMarker(0)
		arMarkers.push( arMarker )

		var mesh = buildTorusCube()
		arMarker.originObject.add( mesh );
	}
}
