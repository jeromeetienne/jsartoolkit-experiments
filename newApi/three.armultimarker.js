THREE.ArMultiMarker = function(options){
	// handle options
	options = options || {}
	this.options = {}
	this.options.smoothingEnabled = options.smoothingEnabled !== undefined ? options.smoothingEnabled : true
	this.options.smoothingFactor = options.smoothingFactor !== undefined ? options.smoothingFactor : 0.7
	
	
	this.arMarkers = []
	// create the marker Root
	this.markerObject = new THREE.Object3D();
	this.markerObject.name = 'Multi Marker Root'
	this.markerObject.visible = true
	
	this.originObject = new THREE.Object3D();
	this.originObject.name = 'Origin object'
	this.markerObject.add(this.originObject)

	this.smoothedOriginObject = new THREE.Object3D();
	this.smoothedOriginObject.name = 'Origin object'
	this.markerObject.add(this.smoothedOriginObject)
}

THREE.ArMultiMarker.prototype.update = function () {
	// average the world position of each originObject
	
	var isVisible = false
	var visibleCount = 0
	
	//////////////////////////////////////////////////////////////////////////////
	//		compute average position
	//////////////////////////////////////////////////////////////////////////////
	var averagedPosition = new THREE.Vector3
	this.arMarkers.forEach(function(arMarker){
		if( arMarker.markerObject.visible === false )	return
		// honor markerObject.visible
		isVisible = true
		// count how many are visible
		visibleCount++
		// add the world position of arMarker origin object
		var worldPosition = new THREE.Vector3
		arMarker.originObject.localToWorld(worldPosition)
		averagedPosition.add(worldPosition)
	})
	averagedPosition.multiplyScalar(1/visibleCount)

	// set marker position
	if( this.options.smoothingEnabled === false ){
		this.markerObject.position.copy(averagedPosition)
	}else{
		var smoothingFactor = this.options.smoothingFactor
		this.markerObject.position
			.multiplyScalar(smoothingFactor)
			.add(averagedPosition.clone().multiplyScalar(1-smoothingFactor))
	}


	// how to average the rotation
	// http://wiki.unity3d.com/index.php/Averaging_Quaternions_and_Vectors

	// honor markerObject.visible
	this.markerObject.visible = isVisible
};
