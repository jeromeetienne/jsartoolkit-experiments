
# About arMarker
- arMarker.markerObject 
  - this is the position of the marker in the scene
- arMarker.originObject
  - this is the offset between the marker position and the vrWorld origin
  - user adds his 3d here

# Improvement
- make a camera helper, and a debug camera
- make tweening on ar marker
  - simply apply a smoothen on the arMarker.markerObject
  - cant not be done at the matrix level
  - do it at the position/quaternion/scale with matrix.decompose
- make averaging on several marker
  - several THREE.ArMarker
  - average the pose from each arMarker.originObject
- make motion prediction

# Better API
- DONE put video init in arcontext
- DONE make arMarker specific to a given marker
