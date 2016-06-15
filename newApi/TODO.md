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
- pass the video as texture ? like in webar
- DONE make a camera helper, and a debug camera

# About arMarker
- arMarker.markerObject 
  - this is the position of the marker in the scene
- arMarker.originObject
  - this is the offset between the marker position and the vrWorld origin
  - user adds his 3d here


# Better API
- DONE put video init in arcontext
- DONE make arMarker specific to a given marker
