// Import Three.js
import * as THREE from './three.js-master/three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js'

// Create a scene
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

// Load model
const loader = new GLTFLoader()
loader.load('assets/rooms.gltf', function(gltf){
     // Called when the model is loaded
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.01,0.01,0.01)

    scene.add(root);

    // Called while loading is progressing
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
    // Called if loading fails
}, function(error){
    console.log('An error occurred')
})

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)

//This is Geomatry box for test
// const geomatry = new THREE.BoxGeometry(1,1,1)
// const material= new THREE.MeshBasicMaterial({
//     color: 'red'
// })
// const boxMesh = new THREE.Mesh(geomatry,material)
// scene.add(boxMesh)

// set size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Create a camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height,0.1,100)
camera.position.set(0,50,50)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
 canvas: canvas
})

renderer.setSize(size.width,size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true
renderer.render(scene,camera)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()