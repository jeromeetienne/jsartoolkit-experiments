var arScenes = arScenes || {}

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

arScenes['roomspaceVideo'] = {
	setupArContext : function(debugDetectEnabled, onArContextReady){
		var url = '../../videos/VID_20160503_165602-640x480.mp4'
		var srcElement = THREE.ArUtils.setupArContextWithVideo(url, debugDetectEnabled, function(arContext){
			onArContextReady(arContext)
		})
		return srcElement		
	},
	setupDetection : function(){
	        arContext.controller.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
	        arContext.controller.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_3x3_HAMMING63);			
	},
	setupMarkers : function(){
		// var arMarker = THREE.ArUtils.buildDebugArMarker(0)
		// arMarkers.push( arMarker )
		// 
		// var mesh = buildTorusCube()
		// arMarker.originObject.add( mesh );

		var markerUnknown = THREE.ArUtils.buildDebugArMarker(-1, 'torusknot')
		arMarkers.push( markerUnknown );
		markerUnknown.originObject.position.y = 1
		
		var markerLeft = THREE.ArUtils.buildDebugArMarker(1)
		arMarkers.push( markerLeft )
		markerLeft.originObject.position.x =  3.8
		markerLeft.originObject.position.y = -0.1
		
		var markerMiddle = THREE.ArUtils.buildDebugArMarker(2)
		arMarkers.push( markerMiddle )

		var markerRight = THREE.ArUtils.buildDebugArMarker(0)
		arMarkers.push( markerRight )
		markerRight.originObject.position.x = -3.3
		markerRight.originObject.position.y = -0.2

		var multiMarker = new THREE.ArMarkerMulti()
		arMarkers.push( multiMarker )
		multiMarker.arMarkers = arMarkers
		multiMarker.originObject.rotateX(-Math.PI/2)
		multiMarker.originObject.position.y = 5 
		var geometry	= new THREE.PlaneGeometry(40,40);
		var material	= new THREE.MeshBasicMaterial({
			map :  new THREE.TextureLoader().load( '../../textures/UV_Grid_Sm.jpg', function onLoaded(texture){
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set(4, 4);
			}),
			side : THREE.DoubleSide,
			opacity: 0.5,
			transparent: true,
		}); 
		var torus	= new THREE.Mesh( geometry, material );
		multiMarker.originObject.add( torus );
		scene.add(multiMarker.markerObject)
		
		window.multiMarker = multiMarker
	}
}
