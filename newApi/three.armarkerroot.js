THREE.ArMarkerRoot = function(){
	// create the marker Root
	var object = new THREE.Object3D();
	object.name = 'Marker Root'
	object.matrixAutoUpdate = false;
	object.visible = false
	// to store jsartoolkit matrix
	object.userData.markerMatrix = new Float64Array(12);

	this.markerWidth	= 1
	this.markerInfoId = -1

	// export object
	this.object = object
}

THREE.ArMarkerRoot.prototype.update = function (arContext) {
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
	var wasVisible = this.object.visible

	// objects visible IIF there is a marker
	this.object.visible = markerInfo !== null ? true : false

	if( markerInfo === null )	return

// console.log('tmpInfo', tmpInfo.id, this.markerInfoId)

	if( wasVisible === false ) {
		arController.getTransMatSquare(markerIndex, this.markerWidth, this.object.userData.markerMatrix);
	} else {
		arController.getTransMatSquareCont(markerIndex, this.markerWidth, this.object.userData.markerMatrix, this.object.userData.markerMatrix);
	}
	arController.transMatToGLMat(this.object.userData.markerMatrix, this.object.matrix.elements);
};
