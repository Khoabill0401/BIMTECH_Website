import {
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    Scene,
    MeshLambertMaterial,
    Raycaster,
    Vector2,
    WebGLRenderer,
} from "three";
import {
	IFCWALLSTANDARDCASE,
	IFCSLAB,
	IFCDOOR,
	IFCWINDOW,
	IFCFURNISHINGELEMENT,
	IFCMEMBER,
	IFCPLATE,
} from 'web-ifc';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {IFCLoader} from "web-ifc-three/IFCLoader";
import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';
import {
    acceleratedRaycast,
    computeBoundsTree,
    disposeBoundsTree
} from 'three-mesh-bvh';


// ------------------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------TOUCHING FUNCTION-------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------------------- //

//Creates the Three.js scene
const scene = new Scene();

//Object to store the size of the viewport
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//Creates the camera (point of view of the user)
const camera = new PerspectiveCamera(75, size.width / size.height);
camera.position.z = 15;
camera.position.y = 13;
camera.position.x = 8;

//Creates the lights of the scene
const lightColor = 0xffffff;

const ambientLight = new AmbientLight(lightColor, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(lightColor, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("three-canvas");
const renderer = new WebGLRenderer({canvas: threeCanvas, alpha: true});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Creates grids and axes in the scene
const grid = new GridHelper(50, 30);
scene.add(grid);

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
scene.add(axes);

//Creates the orbit controls (to navigate the scene)
const controls = new OrbitControls(camera, threeCanvas);
controls.enableDamping = true;
controls.target.set(-2, 0, 0);

//Animation loop
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

//Adjust the viewport to the size of the browser
window.addEventListener("resize", () => {
    (size.width = window.innerWidth), (size.height = window.innerHeight);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
});

//Sets up the IFC loading
const ifcModels = [];
const ifcLoader = new IFCLoader();

async function loadIFC() {
    await ifcLoader.ifcManager.setWasmPath("../../../");
    // const model = await ifcLoader.loadAsync("../../../IFC/GMA_Q1-ARC-POD-L5_L7.ifc");
    const model = await ifcLoader.loadAsync("../../../IFC/01.ifc");
    scene.add(model);
    ifcModels.push(model);
}

loadIFC();

// Sets up optimized picking
ifcLoader.ifcManager.setupThreeMeshBVH(
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast);

const raycaster = new Raycaster();
raycaster.firstHitOnly = true;
const mouse = new Vector2();

function cast(event) {

    // Computes the position of the mouse on the screen
    const bounds = threeCanvas.getBoundingClientRect();

    const x1 = event.clientX - bounds.left;
    const x2 = bounds.right - bounds.left;
    mouse.x = (x1 / x2) * 2 - 1;

    const y1 = event.clientY - bounds.top;
    const y2 = bounds.bottom - bounds.top;
    mouse.y = -(y1 / y2) * 2 + 1;

    // Places it on the camera pointing to the mouse
    raycaster.setFromCamera(mouse, camera);

    // Casts a ray
    return raycaster.intersectObjects(ifcModels);
}

// Creates subset materials
const preselectMat = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.6,
    color: 0xff88ff,
    depthTest: false
})

const selectMat = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.6,
    color: 0xff00ff,
    depthTest: false
})

const ifc = ifcLoader.ifcManager;
// References to the previous selections
const highlightModel = { id: - 1};
const selectModel = { id: - 1};

function highlight(event, material, model, multiple = true) {
    const found = cast(event)[0];
    if (found) {

        // Gets model ID
        model.id = found.object.modelID;

        // Gets Express ID
        const index = found.faceIndex;
        const geometry = found.object.geometry;
        const id = ifc.getExpressId(geometry, index);

        // Creates subset
        ifcLoader.ifcManager.createSubset({
            modelID: model.id,
            ids: [id],
            material: material,
            scene: scene,
            removePrevious: multiple
        })
    } else {
        // Remove previous highlight
        ifc.removeSubset(model.id, scene, material);
    }
}

window.onmousemove = (event) => highlight(event, preselectMat, highlightModel);

window.ondblclick = (event) => highlight(event, selectMat, selectModel);

// ------------------------------------------------------------------------------------------------------------------- //
// -----------------------------------------------VISIBILITY FUNCTION------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------------------- //

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc() {
	await viewer.IFC.setWasmPath("../../../");
	const model = await viewer.IFC.loadIfcUrl("../../../IFC/01.ifc");
	model.removeFromParent();
	await viewer.shadowDropper.renderShadow(model.modelID);

	await setupAllCategories();
}

// loadIfc('D:\BIMTECH\IFC-CRASH-TOOLS\IFC\05.ifc');

// const scene = viewer.context.getScene();

// List of categories names
const categories = {
	IFCWALLSTANDARDCASE,
	IFCSLAB,
	IFCFURNISHINGELEMENT,
	IFCDOOR,
	IFCWINDOW,
	IFCPLATE,
	IFCMEMBER,
};

// Gets the name of a category
function getName(category) {
	const names = Object.keys(categories);
	return names.find(name => categories[name] === category);
}

// Gets all the items of a category
async function getAll(category) {
	return viewer.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
}

// Creates a new subset containing all elements of a category
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

// Stores the created subsets
const subsets = {};

async function setupAllCategories() {
	const allCategories = Object.values(categories);
	for (let i = 0; i < allCategories.length; i++) {
		const category = allCategories[i];
		await setupCategory(category);
	}
}

// Creates a new subset and configures the checkbox
async function setupCategory(category) {
	subsets[category] = await newSubsetOfType(category);
	setupCheckBox(category);
}

// Sets up the checkbox event to hide / show elements
function setupCheckBox(category) {
	const name = getName(category);
	const checkBox = document.getElementById(name);
	checkBox.addEventListener('change', (event) => {
		const checked = event.target.checked;
		const subset = subsets[category];
		if (checked) scene.add(subset);
		else subset.removeFromParent();
	});
}