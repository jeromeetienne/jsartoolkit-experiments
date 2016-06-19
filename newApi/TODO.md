# TODO before release
- fix the smoothing in ArMarkerMulti
  - markerObject is the average of other originObject
  - if smoothing is disabled, originObject is untouched
  - if smoothing is enabled, originObject is smoothed
- intrument the demo
  - enable/disable text output of the found markerInfo
- clean up artoolkit.context contructor parameters
  - close to the source init
  - crappy verbose parameters, hardcoded url
- stats.js report seems buggy and not measure the time spend rendering or detecting
- fix the aspect issue, this is WAY long due
- write a good basic.html
  - have the function for demo.html ready - all the scene build
  - once basic.html is ready, split the 2 files
  - thus you keep a non-duplicated file when you are developping

# Examples
- basic.html: simple model on marker
- demo.html - url to describe the scene
  - multi marker - room space
  - multi marker - ar cube
  - single marker - model

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
