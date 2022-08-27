import './style.css';
// import * as THREE from 'three';
import {
    IFCWALLSTANDARDCASE,
    IFCSLAB,
    IFCDOOR,
    IFCWINDOW,
    IFCFURNISHINGELEMENT,
    IFCMEMBER,
    IFCPLATE,
    IFCROOF,

} from 'web-ifc';

import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';


// head favicon
(function(){
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '../static/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
});

// container viewer
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({container, backgroundColor: new Color(0xffffff), opacity: 0});
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url){
    await viewer.IFC.setWasmPath("web-ifc.wasm");
    const model = await viewer.IFC.loadIfcUrl(url);
    model.removeFromParent();
    await viewer.shadowDropper.renderShadow(model.modelID);

    await setupAllcategories();
}

loadIfc("./RAC_basic_sample_project.ifc");

// create scene
const scene = viewer.context.getScene();

// list of categories names
const categories = {
    IFCWALLSTANDARDCASE,
    IFCSLAB,
    IFCFURNISHINGELEMENT,
    IFCDOOR,
    IFCWINDOW,
    IFCPLATE,
    IFCMEMBER,
    IFCROOF,
};

// get the name of a category
function getName(category){
    const names = Object.keys(categories);
    return names.find(name => categories[name] === category);
}

// get all the items of a category
async function getAll(category){
    return viewer.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
}

// create a new subset containing all elements of a catogory
async function newSubsetOfType(category) {
    const ids = await getAll(category);
    return viewer.IFC.loader.ifcManager.createSubset({
        modelID: 0,
        scene,
        ids,
        removePrevious: true,
        customID: category.toString(),
    });
}

// store the created subsets
const subsets = {};

async function setupAllcategories() {
    const allCategories = Object.values(categories);
    for (let i = 0; i < allCategories.length; i++){
        const category = allCategories[i];
        await setupCategory(category);
    }
}

// create a new subset and configure the checkbox
async function setupCategory(category){
    subsets[category] = await newSubsetOfType(category);
    setupCheckBox(category);
}

// setup the checkbox event to hide/ show elements
function setupCheckBox(category){
    const name = getName(category);
    const checkBox = document.getElementById(name);
    checkBox.addEventListener('change', (event) => {
        const checked = event.target.checked;
        const subset = subsets[category];
        if (checked) scene.add(subset);
        else subset.removeFromParent();
    });
}
    


// scene
// const scene = new THREE.Scene()


// red cube
// const geometry = new THREE.BoxGeometry(1, 2, 1)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x=1
// scene.add(mesh)

// scale
// mesh.scale.set(1, 1, 1)

// rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI*0.25

// axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// sizes
// const sizes = {
//     width: 800,
//     height: 600
// }

// camera
// const camera = new THREE.PerspectiveCamera(90, sizes.width/sizes.height, 1, 1000)
// camera.position.z = 2
// camera.position.x = 0
// camera.position.y = 0
// scene.add(camera)

// camera.lookAt(new THREE.Vector3(1, 0, 0))


// renderer
// const canvas = document.querySelector('.webgl')
// console.log(canvas)
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })



// renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)
