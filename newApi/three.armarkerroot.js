THREE.ArMarkerRoot = function(){
	// create the marker Root
	var object = new THREE.Object3D();
	object.name = 'Marker Root'
	object.matrixAutoUpdate = false;
	object.visible = false
	// to store jsartoolkit matrix
	object.userData.markerMatrix = new Float64Array(12);

	// export object
	this.object = object
}

THREE.ArMarkerRoot.prototype.update = function (arContext) {
	var arController = arContext.controller
	var markerNum = arController.getMarkerNum();
console.log('markerNum', markerNum)
	if (markerNum > 0) {
		// if( markerRoot.visible === false ) {
			arController.getTransMatSquare(0 /* Marker index */, 1 /* Marker width */, this.object.userData.markerMatrix);
		// } else {
			// arController.getTransMatSquareCont(0, 1, markerRoot.userData.markerMatrix, markerRoot.userData.markerMatrix);
		// }
		arController.transMatToGLMat(this.object.userData.markerMatrix, this.object.matrix.elements);
	}

	// objects visible IIF there is a marker
	if (markerNum > 0) {
		this.object.visible = true;
	} else {
		this.object.visible = false;
	}	
};
