import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js'
import { Int8Attribute } from 'three'

/**
 * Base
 */
const parameters = {
    ambientColor: 0xaaaaaa,
    ambientIntensity: 0.1,
    directionalColor: 0xaaaaaa,
    directionalIntensity: 1,
    highlightColor: 0xff0000,
    floorColor: 0x00ff00,
    backgroundScene: 0x000000,
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( parameters.backgroundScene );

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const ifcLoader = new IFCLoader();
console.log(ifcLoader)
ifcLoader.ifcManager.setWasmPath( '/ifc/' );

let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)

        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[2])
        action.play()
    }
)

// ifcLoader.load( '/ifc/RAC_basic_sample_project.ifc', 
//     (model) =>
//     {
//         scene.add( model);
//         model.position.set(120, 0, -50)
//         model.rotation.set(0, -Math.PI/4, 0)
//     } 
// )

// ifcLoader.load( '/ifc/04.ifc', 
//     (model2) =>
//     {
//         scene.add( model2);
//         model2.position.set(100, 0, 30)
//     } 
// )

// ifcLoader.load( '/ifc/05.ifc', 
//     (model3) =>
//     {
//         scene.add( model3);
//         model3.position.set(0, 0, 0)
//     } 
// )

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({
        color: parameters.floorColor,
        // metalness: 0,
        // roughness: 0.5
    })
)
floor.receiveShadow = true
floor.position.z = -3
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(parameters.ambientColor, parameters.ambientIntensity)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(parameters.directionalColor, parameters.directionalIntensity)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.left = - 500
directionalLight.shadow.camera.top = 500
directionalLight.shadow.camera.right = 500
directionalLight.shadow.camera.bottom = - 500
directionalLight.position.set( 1, 1, 1 )
scene.add(directionalLight)



const highlightMaterial = new THREE.MeshPhongMaterial( { color: parameters.highlightColor, depthTest: false, transparent: true, opacity: 0.5 } );

// Select Object
function selectObject( event ) {

    if ( event.button != 0 ) return;

    const mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );

    const intersected = raycaster.intersectObjects( scene.children, false );
    if ( intersected.length ) {

        const found = intersected[ 0 ];
        const faceIndex = found.faceIndex;
        const geometry = found.object.geometry;
        const id = ifcLoader.ifcManager.getExpressId( geometry, faceIndex );

        const modelID = found.object.modelID;
        ifcLoader.ifcManager.createSubset( { modelID, ids: [ id ], scene, removePrevious: true, material: highlightMaterial } );
        const props = ifcLoader.ifcManager.getItemProperties( modelID, id, true );
        console.log( props );
        renderer.render( scene, camera );
    }

}

// Debug
const gui = new dat.GUI({
    width: 400
})

// gui.hide()
window.addEventListener('keydown', (event) =>
{
    if(event.key === 'h')
    {
        if(gui._hidden)
            gui.show()
        else
            gui.hide()
    }
})

// gui
//     .addColor(parameters, 'ambientLight')
//     .onChange(() =>
//     {
//         ambientLight.color.set(parameters.ambientColor)
//     })
// gui
//     .addColor(parameters, 'directionalLight')
//     .onChange(() =>
//     {
//         directionalLight.color.set(parameters.directionalColor)
//     })
// gui
//     .addColor(parameters, 'highlightMaterial')
//     .onChange(() =>
//     {
//         highlightMaterial.color.set(parameters.highlightColor)
//     })


window.onpointerdown = selectObject;



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = - 10;
camera.position.y = 20;
camera.position.x = 10;
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
