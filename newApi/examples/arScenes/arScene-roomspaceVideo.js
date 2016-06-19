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
		function buildMarker(markerInfoId){
			var arMarker = THREE.ArUtils.buildDebugArMarker(markerInfoId)

			// add a plane on the marker
			var geometry	= new THREE.PlaneGeometry(1,1);
			var material	= new THREE.MeshBasicMaterial({
				map: arMarker.markerObject.getObjectByName('plane').material.map,
				transparent : true,
				opacity: 0.5,
				side: THREE.DoubleSide,
				color: 'red'
			}); 
			var mesh	= new THREE.Mesh( geometry, material );
			arMarker.originObject.add( mesh );

			// arMarker.markerObject.getObjectByName('plane').visible = false

			return arMarker
		}
		
		// build each marker
		var markerLeft = buildMarker(1)
		arMarkers.push( markerLeft )
		markerLeft.originObject.position.x =  3.8
		markerLeft.originObject.position.y =  1.9

		var markerMiddle = buildMarker(2)
		markerMiddle.originObject.position.y = 2
		arMarkers.push( markerMiddle )

		var markerRight = buildMarker(0)
		arMarkers.push( markerRight )
		markerRight.originObject.position.x = -3.3
		markerRight.originObject.position.y = 1.8

		// handle the markerMulti
		var multiMarker = new THREE.ArMarkerMulti()
		arMarkers.push( multiMarker )
		multiMarker.arMarkers = arMarkers
		multiMarker.originObject.rotateX(-Math.PI/2)
		multiMarker.originObject.position.y = 3 
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
	}
}
