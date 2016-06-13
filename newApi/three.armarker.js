THREE.ArMarker = function(){
	// create the marker Root
	var markerObject = new THREE.Object3D();
	markerObject.name = 'Marker Root'
	markerObject.matrixAutoUpdate = false;
	markerObject.visible = false
	// to store jsartoolkit matrix
	markerObject.userData.markerMatrix = new Float64Array(12);

	this.markerWidth	= 1
	this.markerInfoId = -1

	// export object
	this.markerObject = markerObject
	
	this.originObject = new THREE.Object3D();
	this.originObject.name = 'Origin object'
	markerObject.add(this.originObject)
}

THREE.ArMarker.prototype.update = function (arContext) {
	var arController = arContext.controller
	var markerNum = arController.getMarkerNum();
// console.log('markerNum', markerNum)

	var markerInfo = null
	for(var markerIndex = 0; markerIndex < markerNum; markerIndex++){
		var tmpInfo = arController.getMarker(markerIndex);
		if( tmpInfo.id === this.markerInfoId ){
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
};
