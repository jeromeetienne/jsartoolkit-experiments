- DONE make a canvas with the idMarker on it
- TODO rename markerObject in markerRoot
# motion prediction
- we get the pose of the marker periodically
- so we know when we receive the image
- then we get the pose from the image with the marker detection
- we got a serie of {timeStamp, pose} at regular interval

```
currentTimeStamp = Date.now()
deltaTime = currentTimeStamp - detectionTimeStamp
currentPosition = detectionPosition + deltaTime * detectionSpeed

// for angular, prediction . See pose-predictor.js
// https://github.com/borismus/webvr-polyfill/blob/master/src/sensor-fusion/pose-predictor.js
```

# Improvement
- make tweening on ar marker
  - simply apply a smoothen on the arMarker.markerObject
  - cant not be done at the matrix level
  - do it at the position/quaternion/scale with matrix.decompose
- make averaging on several marker
  - several THREE.ArMarker
  - average the pose from each arMarker.originObject
- make motion prediction
  - get a video and analyse at 10hz see how it react
- DONE pass the video as texture ? like in webar
- DONE make a camera helper, and a debug camera

- projection matrix make it look toward positive z, and positive y is going down
  - this is confusing, how can i change that ? i could have a transformMatrix in arContext
  - this would be applied to arMarker and init camera init


# Better API
- DONE put video init in arcontext
- DONE make arMarker specific to a given marker
