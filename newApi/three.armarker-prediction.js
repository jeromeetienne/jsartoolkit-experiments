THREE.ArMarker = function(){
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
	
	
	this._positionSpeed = new THREE.Vector3()
}

THREE.ArMarker.prototype.update = function (arContext) {
	var arController = arContext.controller
	var markerNum = arController.getMarkerNum();

	var markerInfo = null
	for(var markerIndex = 0; markerIndex < markerNum; markerIndex++){
		var tmpInfo = arController.getMarker(markerIndex);
		// http://www.artoolworks.com/support/doc/artoolkit5/apiref/ar_h/index.html#//apple_ref/c/tdef/ARMarkerInfo
// console.log('tmpInfo', tmpInfo.idMatrix)

		if( tmpInfo.idMatrix === this.markerInfoId ){
			markerInfo = tmpInfo
			break;
		}
	}
	var wasVisible = this.markerObject.visible

	// objects visible IIF there is a marker
	this.markerObject.visible = markerInfo !== null ? true : false

	if( markerInfo === null )	return

// console.log('tmpInfo', tmpInfo.id, this.markerInfoId)

	if( wasVisible === false ) {
		arController.getTransMatSquare(markerIndex, this.markerWidth, this.markerObject.userData.markerMatrix);
	} else {
		arController.getTransMatSquareCont(markerIndex, this.markerWidth, this.markerObject.userData.markerMatrix, this.markerObject.userData.markerMatrix);
	}
	arController.transMatToGLMat(this.markerObject.userData.markerMatrix, this.markerObject.matrix.elements);
	
	// refeed position/quaternion/scale
	this.markerObject.matrix.decompose(this.markerObject.position, this.markerObject.quaternion, this.markerObject.scale )
	
	
};
