import './style.css'
import * as THREE from 'three'

// scene
const scene = new THREE.Scene()


// red cube
const geometry = new THREE.BoxGeometry(1, 2, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x=1
scene.add(mesh)

// scale
mesh.scale.set(1, 1, 1)

// rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI*0.25

// axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// sizes
const sizes = {
    width: 800,
    height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(90, sizes.width/sizes.height, 1, 1000)
camera.position.z = 2
camera.position.x = 0
camera.position.y = 0
scene.add(camera)

camera.lookAt(new THREE.Vector3(1, 0, 0))


// renderer
const canvas = document.querySelector('.webgl')
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})



renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
