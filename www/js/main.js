//setting up the scene, camera, and the renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//lights
let light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

//load 3d model
let loader = new THREE.GLTFLoader();

loader.load( '/3dmodel/goodmap.gltf', function ( gltf ) {
    scene.add( gltf.scene );
}, undefined, function ( error ) {
	 console.error( error );
} );

//creating and adding a cube into the scene
let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//let nMaterial = new THREE.MeshNormalMaterial()
//let plane = new THREE.

//moving the camera
camera.position.z = 5;
camera.position.y = 1;


//a function to render the scene
function animate() {
    requestAnimationFrame( animate );
	  renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();
