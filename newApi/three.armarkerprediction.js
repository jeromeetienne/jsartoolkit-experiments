/**
 * Handle a marker from jsartoolkit
 * - markerObject = object3d excatly on the marker
 * - originObject = the origin of the scene attached to this marker
 */
THREE.ArMarkerPrediction = function(){
	this.markerWidth = 1
	this.markerInfoId = -1

	// create the marker Root
	this.markerObject = new THREE.Object3D();
	this.markerObject.name = 'marker-root'
	this.markerObject.matrixAutoUpdate = false;
	this.markerObject.visible = false
	this.markerObject.userData.markerMatrix = new Float64Array(12); // to store jsartoolkit matrix

	// create the origin root
	this.originObject = new THREE.Object3D();
	this.originObject.name = 'marker-origin'
	this.markerObject.add(this.originObject)

	this._lastDetectionDate = null
	this._lastPosition = new THREE.Vector3()
}

THREE.ArMarkerPrediction.prototype.updateOrigin = function(arContext){
	var arController = arContext.controller

	var deltaTime = performance.now() - arContext.detectionDate

	if( this._lasDate === null ){
		return
	}

	var currentPosition = new THREE.Vector3()
// 	currentPosition.
// currentPosition = detectionPosition + deltaTime * detectionSpeed


	this._lastDetectionDate = arContext.detectionDate
	this._lastPosition.copy( this.markerObject.position )
}


/**
 * update this marker pose if it is found in last arContext detection
 */
THREE.ArMarkerPrediction.prototype.updatePose = function (arContext) {
	var arController = arContext.controller

	// see if this marker has been found by arContext
	var foundMarkerInfo = null
	var nFoundMarkers = arController.getMarkerNum();
	for(var markerIndex = 0; markerIndex < nFoundMarkers; markerIndex++){
		var markerInfo = arController.getMarker(markerIndex);
		if( markerInfo.idMatrix === this.markerInfoId ){
			foundMarkerInfo = markerInfo
			break;
		}
	}

	// store the previous visibility
	var wasVisible = this.markerObject.visible
	// objects visible IIF there is a marker has been found
	this.markerObject.visible = foundMarkerInfo !== null ? true : false

	// if this marker has not been found, return now
	if( foundMarkerInfo === null )	return

	// if it wasnt visible, get initial matrix, else get a cont-matrix
	if( wasVisible === false ) {
		arController.getTransMatSquare(markerIndex, this.markerWidth, this.markerObject.userData.markerMatrix);
	} else {
		arController.getTransMatSquareCont(markerIndex, this.markerWidth, this.markerObject.userData.markerMatrix, this.markerObject.userData.markerMatrix);
	}
	// transform the jsartoolkit matrix into webgl matrix
	arController.transMatToGLMat(this.markerObject.userData.markerMatrix, this.markerObject.matrix.elements);

	// refeed position/quaternion/scale from matrix
	this.markerObject.matrix.decompose(this.markerObject.position, this.markerObject.quaternion, this.markerObject.scale )
}
