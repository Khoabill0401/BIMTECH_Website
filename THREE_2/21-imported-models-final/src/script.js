import './style.css'
import * as THREE from 'three'
import '../static/libs/inflate.min.js'
import * as Detector from '../static/libs/Detector.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { Int8Attribute } from 'three'

/**
 * Base
 */
const parameters = {
    ambientColor: 0xaaaaaa,
    ambientIntensity: 0.1,
    directionalColor: 0xffffff,
    directionalIntensity: 1,
    highlightColor: 0xff0000,
    floorColor: 0x00ff00,
    backgroundScene: 0xffffff,
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( parameters.backgroundScene );


/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 30;
camera.position.y = 8;
camera.position.x = 18;
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const ifcLoader = new IFCLoader();
// console.log(ifcLoader)
ifcLoader.ifcManager.setWasmPath( '/ifc/' );

const fbxLoader = new FBXLoader();

let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {   
        gltf.scene.position.set(5, 0, 5)
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
// console.log(ifcLoader)
ifcLoader.load( '/ifc/05.ifc', 
    (model3) =>
    {
        scene.add( model3);
        model3.position.set(0, 0, 0)
    } 
)


/**
 * Floor
 */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(1000, 1000),
//     new THREE.MeshStandardMaterial({
//         color: parameters.floorColor,
//         // metalness: 0,
//         // roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.position.z = -3
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

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
 
 // Axes
 scene.add( new THREE.AxesHelper( 5 ) );
 
 const highlightMaterial = new THREE.MeshPhongMaterial( { color: parameters.highlightColor, depthTest: false, transparent: true, opacity: 0.1 } );
 
 // Select Object
 function selectObject( event ) {
 
    if ( event.button != 0 ) return;
 
    const mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
 
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
 
    const intersected = raycaster.intersectObjects( scene.children, false );
    if ( intersected.length ) 
    {
 
        const found = intersected[ 0 ];
        const faceIndex = found.faceIndex;
        const geometry = found.object.geometry;
        const id = ifcLoader.ifcManager.getExpressId( geometry, faceIndex );
        
        const modelID = found.object.modelID;
        // IFC
        ifcLoader.ifcManager.createSubset( { modelID, ids: [ id ], scene, removePrevious: true, material: highlightMaterial } );
        const props = ifcLoader.ifcManager.getItemProperties( modelID, id, true );
        console.log( props );

        // FBX
        

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
 * Load character
 */

class BasicCharacterControllerProxy {
    constructor(animations) 
    {
        this._animations = animations;
    }
  
    get animations() 
    {
        return this._animations;
    }
};

class BasicCharacterController {
    constructor(params)
    {
        this._Init(params);
    }

    _Init(params) 
    {
        this._params = params;
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(1, 0.25, 5.0);
        this._velocity = new THREE.Vector3(0, 0, 0);
    
        this._animations = {};
        this._input = new BasicCharacterControllerInput();
        this._stateMachine = new CharacterFSM(
            new BasicCharacterControllerProxy(this._animations));
    
        this._LoadModels();
    }

    _LoadModels() 
    {
        const loader = new FBXLoader();
        loader.setPath('/fbx/char2/');
        loader.load('mremireh_o_desbiens.fbx', (fbx) => 
        {
            fbx.position.set(4, 0, 30)
            fbx.scale.setScalar(0.01);
            fbx.traverse(c => {
                c.castShadow = true;
            });
    
            this._target = fbx;
            this._params.scene.add(this._target);
    
            this._mixer = new THREE.AnimationMixer(this._target);
    
            this._manager = new THREE.LoadingManager();
            this._manager.onLoad = () => {
                this._stateMachine.SetState('idle');
            };
    
            const _OnLoad = (animName, anim) => {
                const clip = anim.animations[0];
                const action = this._mixer.clipAction(clip);
      
                this._animations[animName] = {
                    clip: clip,
                    action: action,
                };
            };
    
            const loader = new FBXLoader(this._manager);
            loader.setPath('/fbx/char2/');
            loader.load('walk.fbx', (a) => { _OnLoad('walk', a); });
            loader.load('run.fbx', (a) => { _OnLoad('run', a); });
            loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
        });
    }

    Update(timeInSeconds) 
    {
        if (!this._target) {
            return;
        }
    
        this._stateMachine.Update(timeInSeconds, this._input);
    
        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z)
        );
    
        velocity.add(frameDecceleration);
    
        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();
    
        const acc = this._acceleration.clone();
        if (this._input._keys.shift) 
        {
            acc.multiplyScalar(2.0);
        }
    
        if (this._input._keys.forward) 
        {
            velocity.z += acc.z * timeInSeconds;
        }
        if (this._input._keys.backward) 
        {
            velocity.z -= acc.z * timeInSeconds;
        }
        if (this._input._keys.left) 
        {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        if (this._input._keys.right) 
        {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
    
        controlObject.quaternion.copy(_R);
    
        const oldPosition = new THREE.Vector3();
        oldPosition.copy(controlObject.position);
    
        const forward = new THREE.Vector3(0, 0, 0.01);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();
    
        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();
    
        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);
    
        controlObject.position.add(forward);
        controlObject.position.add(sideways);
    
        oldPosition.copy(controlObject.position);
    
        if (this._mixer) 
        {
          this._mixer.update(timeInSeconds);
        }
    }
};

class BasicCharacterControllerInput {
    constructor()
    {
        this._Init();  
    }

    _Init() 
    {
        this._keys = 
        {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        };
        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }
    
    _onKeyDown(event) 
    {
        switch (event.keyCode) 
        {
            case 87: // w
                this._keys.forward = true;
            break;
            case 65: // a
                this._keys.left = true;
            break;
            case 83: // s
                this._keys.backward = true;
            break;
            case 68: // d
                this._keys.right = true;
            break;
            case 32: // SPACE
                this._keys.space = true;
            break;
            case 16: // SHIFT
                this._keys.shift = true;
            break;
        }
    }
    
    _onKeyUp(event) 
    {
        switch(event.keyCode) 
        {
            case 87: // w
                this._keys.forward = false;
            break;
            case 65: // a
                this._keys.left = false;
            break;
            case 83: // s
                this._keys.backward = false;
            break;
            case 68: // d
                this._keys.right = false;
            break;
            case 32: // SPACE
                this._keys.space = false;
            break;
            case 16: // SHIFT
                this._keys.shift = false;
            break;
        }
    }
};

class FiniteStateMachine {
    constructor() 
    {
        this._states = {};
        this._currentState = null;
    }
    
    _AddState(name, type) 
    {
        this._states[name] = type;
    }
    
    SetState(name) 
    {
        const prevState = this._currentState;
        
        if (prevState) 
        {
            if (prevState.Name == name) 
            {
                return;
            }
            prevState.Exit();
        }
    
        const state = new this._states[name](this);
    
        this._currentState = state;
        state.Enter(prevState);
    }
    
    Update(timeElapsed, input) 
    {
        if (this._currentState) 
        {
            this._currentState.Update(timeElapsed, input);
        }
    }
};

class CharacterFSM extends FiniteStateMachine {
    constructor(proxy) 
    {
        super();
        this._proxy = proxy;
        this._Init();
    }
  
    _Init() 
    {
        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
    }
};

class State {
    constructor(parent) 
    {
        this._parent = parent;
    }
  
    Enter() {}
    Exit() {}
    Update() {}
};

class WalkState extends State {
    constructor(parent) 
    {
        super(parent);
    }
  
    get Name() 
    {
        return 'walk';
    }
  
    Enter(prevState) 
    {
        const curAction = this._parent._proxy._animations['walk'].action;
        if (prevState) 
        {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;
  
            curAction.enabled = true;
  
            if (prevState.Name == 'run') 
            {
                const ratio = curAction.getClip().duration / prevAction.getClip().duration;
                curAction.time = prevAction.time * ratio;
            } 
            else 
            {
                curAction.time = 0.0;
                curAction.setEffectiveTimeScale(0.1);
                curAction.setEffectiveWeight(1.0);
            }
  
            curAction.crossFadeFrom(prevAction, 0.05, true);
            curAction.play();
        } 
        else 
        {
            curAction.play();
        }
    }
  
    Exit() {}
  
    Update(timeElapsed, input) 
    {
        if (input._keys.forward || input._keys.backward) 
        {
            if (input._keys.shift) 
            {
                this._parent.SetState('run');
            }
            return;
        }
  
        this._parent.SetState('idle');
    }
};

class RunState extends State {
    constructor(parent) 
    {
        super(parent);
    }
  
    get Name() 
    {
        return 'run';
    }
  
    Enter(prevState) 
    {
        const curAction = this._parent._proxy._animations['run'].action;
        if (prevState) 
        {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;
  
            curAction.enabled = true;
  
            if (prevState.Name == 'walk') 
            {
                const ratio = curAction.getClip().duration / prevAction.getClip().duration;
                curAction.time = prevAction.time * ratio;
            } 
            else 
            {
                curAction.time = 0.0;
                curAction.setEffectiveTimeScale(0.1);
                curAction.setEffectiveWeight(1.0);
            }
  
            curAction.crossFadeFrom(prevAction, 0.5, true);
            curAction.play();
        } 
        else 
        {
            curAction.play();
        }
    }
  
    Exit() {}
  
    Update(timeElapsed, input) 
    {
        if (input._keys.forward || input._keys.backward) 
        {
            if (!input._keys.shift) 
            {
                this._parent.SetState('walk');
            }
            return;
        }
  
        this._parent.SetState('idle');
    }
};

class IdleState extends State {
    constructor(parent) 
    {
        super(parent);
    }
  
    get Name() 
    {
        return 'idle';
    }
  
    Enter(prevState) 
    {
        const idleAction = this._parent._proxy._animations['idle'].action;
        if (prevState) 
        {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;
            idleAction.time = 0.0;
            idleAction.enabled = true;
            idleAction.setEffectiveTimeScale(0.1);
            idleAction.setEffectiveWeight(1.0);
            idleAction.crossFadeFrom(prevAction, 0.5, true);
            idleAction.play();
        } 
        else 
        {
            idleAction.play();
        }
    }
  
    Exit() {}
  
    Update(_, input) 
    {
        if (input._keys.forward || input._keys.backward) 
        {
            this._parent.SetState('walk');
        } 
    }
};


/**
 * Animate
 */

const clock = new THREE.Clock()
let previousTime = 0

class CharacterControllerDemo {
    constructor() 
    {
        this._Initialize();
    }
  
    _Initialize() 
    {
        this._mixers = [];
        this._previousRAF = null;
  
        this._LoadAnimatedModel();
        this._RAF();
    }
  
    _LoadAnimatedModel() 
    {
        const params = 
        {
            camera: camera,
            scene: scene,
        }
        this._controls = new BasicCharacterController(params);
    }
  
    _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset)
    {
        const loader = new FBXLoader();
        loader.setPath(path);
        loader.load(modelFile, (fbx) => 
        {
            fbx.scale.setScalar(0.01);
            fbx.traverse(c => 
                {
                    c.castShadow = true;
                }
            );
            fbx.position.copy(offset);
  
            const anim = new FBXLoader();
            anim.setPath(path);
            anim.load(animFile, (anim) => 
            {
                const m = new THREE.AnimationMixer(fbx);
                this._mixers.push(m);
                const idle = m.clipAction(anim.animations[0]);
                idle.play();
            });
            this._scene.add(fbx);
        });
    }
  
    _RAF() 
    {
        requestAnimationFrame(
        (t) => 
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
            if (this._previousRAF === null) 
            {
                this._previousRAF = t;
            }
  
            this._RAF();
            console.log(scene.children[4].position)
            console.log(scene.children[4].rotation)
            

            renderer.render(scene, camera);
            // camera.position.set(scene.children[3].position.x, scene.children[3].position.y + 5, scene.children[3].position.z - 20)
            // camera.rotation.set(scene.children[3].rotation)
            this._Step(t - this._previousRAF);
            this._previousRAF = t;
            // console.log(camera.position)
            // console.log(fbx.position)
        });
    }
  
    _Step(timeElapsed) 
    {
        const timeElapsedS = timeElapsed * 0.001;
        if (this._mixers) 
        {
            this._mixers.map(m => m.update(timeElapsedS));
        }
  
        if (this._controls) 
        {
            this._controls.Update(timeElapsedS);
        }
    }
};

let _APP = null;

window.addEventListener('DOMContentLoaded', () => 
{
    _APP = new CharacterControllerDemo();
});



/**
 * Animate
 */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     // Model animation
//     if(mixer)
//     {
//         mixer.update(deltaTime)
//     }

//     // Update controls
//     controls.update()

//     // Char
    
//     const timeElapsedS = elapsedTime * 0.001;
//         if (CharacterControllerDemo._mixers) 
//         {
//             CharacterControllerDemo._mixers.map(m => m.update(timeElapsedS));
//         }
//     // console.log(CharacterControllerDemo._previousRAF)
    
//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
