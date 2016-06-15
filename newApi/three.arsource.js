/**
 * this should be custom way to create arcontext, not another function
 *
 * ArContext = THREE.ArtoolkitContext()
 * arContext.init(cameraParamsUrl, onReady)
 * arContext.initWithVideo(url, onReady)
 */

THREE.ArSource = {}


THREE.ArSource.initVideo = function(url, onReady){
	var srcElement = document.createElement('video');
	srcElement.src = url
	srcElement.autoplay = true;
	srcElement.webkitPlaysinline = true;
	srcElement.controls = false;
	srcElement.loop = true;
	srcElement.width = 640;
	srcElement.height = 480;
	setTimeout(function(){
		onReady && onReady()
	}, 0)
	return srcElement
}

THREE.ArSource.initImage = function(url, onReady){
	var srcElement = document.createElement('img')
	srcElement.src = url
	srcElement.width = 640
	srcElement.height = 480

	setTimeout(function(){
		onReady && onReady()
	}, 0)
	return srcElement
}

THREE.ArSource.initWebcam = function(onReady){
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
				onReady()
				clearInterval(interval)
			}, 1000/100);
		}, function(error) {
			console.log("Can't access user media", error);
			alert("Can't access user media :()");
		});
	})

	return srcElement
}
