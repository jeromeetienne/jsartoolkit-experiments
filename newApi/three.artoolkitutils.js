/**
 * this should be custom way to create arcontext, not another function
 *
 * ArContext = THREE.ArtoolkitContext()
 * arContext.init(cameraParamsUrl, onReady)
 * arContext.initWithVideo(url, onReady)
 */

THREE.ArUtils = {}


THREE.ArUtils.buildDebugArMarker = function (markerInfoId) {
	// create the marker Root
	var arMarker = new THREE.ArMarker();
	// var arMarker = new THREE.ArMarkerPrediction();
	arMarker.markerInfoId = markerInfoId
	scene.add(arMarker.markerObject);

	// build the canvas for the texture
	var canvas = document.createElement('canvas')
	canvas.width = canvas.height = 256
	var context = canvas.getContext('2d')
	context.fillStyle = "rgb(0, 0, 200)";
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.translate(canvas.width/2 * 3/5, canvas.height/2 * 5/3);
	context.fillStyle = "rgb(200, 0, 200)";
	context.font = "256px monospace";
	context.fillText(markerInfoId, 0, 1)

	// add a plane on the marker
	var geometry	= new THREE.PlaneGeometry(1,1);
	var material	= new THREE.MeshBasicMaterial({
		map: new THREE.CanvasTexture( canvas ),
		transparent : true,
		opacity: 0.5,
		side: THREE.DoubleSide
	}); 
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.name	= 'plane'
	arMarker.markerObject.add( mesh );

	// return arMarker
	return arMarker
};

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////



THREE.ArUtils.setupArContextWithVideo = function(url, arContextOpts, onReady){
	var srcElement = document.createElement('video');
	srcElement.src = url
	srcElement.autoplay = true;
	srcElement.webkitPlaysinline = true;
	srcElement.controls = false;
	srcElement.loop = true;
	srcElement.width = 640;
	srcElement.height = 480;
	srcElement.volume = 0
	setTimeout(function(){
		var width = srcElement.width
		var height = srcElement.height
		var arContext = new THREE.ArtoolkitContext({
			width: width,
			height: height,
			debugEnabled: arContextOpts.debugEnabled
		}, function(){
			onReady && onReady(arContext)
		})
	}, 0)
	return srcElement
}

// TODO port other type of source 

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

THREE.ArUtils.setupArContextWithImage = function(url, arContextOpts, onReady){
	var srcElement = document.createElement('img')
	srcElement.src = url
	srcElement.width = 640
	srcElement.height = 480

	setTimeout(function(){
		var width = srcElement.width
		var height = srcElement.height
		var arContext = new THREE.ArtoolkitContext({
			width: width,
			height: height,
			debugEnabled: arContextOpts.debugEnabled
		}, function(){
			onReady && onReady(arContext)
		})
	}, 0)
	return srcElement
}

THREE.ArUtils.setupArContextWithWebcam = function(arContextOpts, onReady){
	navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	var srcElement = document.createElement('video');

	if (navigator.getUserMedia == false )	console.log("navigator.getUserMedia not present in your browser");

        // get the media sources
        MediaStreamTrack.getSources(function(sourceInfos) {
                // define getUserMedia() constraints
                var constraints = {
			audio: false,
			video: {
				mandatory: {
					maxWidth: 640,
					maxHeight: 480
		    		}
		  	}
                }

                // it it finds the videoSource 'environment', modify constraints.video
                for (var i = 0; i != sourceInfos.length; ++i) {
                        var sourceInfo = sourceInfos[i];
                        if(sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
                                constraints.video.optional = [{sourceId: sourceInfo.id}]
                        }
                }
		navigator.getUserMedia(constraints, function success(stream) {
			console.log('success', stream);
			srcElement.src = window.URL.createObjectURL(stream);
			// to start the video, when it is possible to start it only on userevent. like in android
			document.body.addEventListener('click', function(){
				srcElement.play();
			})
			srcElement.play();
		
			// wait until the video stream is ready
			var interval = setInterval(function() {
				if (!srcElement.videoWidth)	return;
				clearInterval(interval)

				var width = srcElement.videoWidth
				var height = srcElement.videoHeight
				var arContext = new THREE.ArtoolkitContext({
					width: width,
					height: height,
					debugEnabled: arContextOpts.debugEnabled
				}, function(){
					onReady && onReady(arContext)
				})
			}, 1000/100);
		}, function(error) {
			console.log("Can't access user media", error);
			alert("Can't access user media :()");
		});
	})

	return srcElement
}
