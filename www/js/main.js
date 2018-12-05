//setting up the scene, camera, and the renderer
let scene = new THREE.Scene( { background: 0xABCDEF } )
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

let renderer = new THREE.WebGLRenderer()
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

//lights
let light = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add( light )

//load 3d model
let loader = new THREE.GLTFLoader()

loader.load( '/3dmodel/goodmap.gltf', function ( gltf ) {
    scene.add( gltf.scene )
}, undefined, function ( error ) {
	 console.error( error )
} )


//creating and adding a cube into the scene
let geometry = new THREE.BoxGeometry( 1, 1, 1 )
let material = new THREE.MeshNormalMaterial( {light: true} )
let cube = new THREE.Mesh( geometry, material )
scene.add( cube )

let texture = new THREE.TextureLoader().load( '/3dmodel/cloudtx.png' )
//plane 4 backdrop
let pgeometry = new THREE.PlaneGeometry( 30, 25, 32 )
let pmaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} )
let plane = new THREE.Mesh( pgeometry, pmaterial )
let plane2 = new THREE.Mesh( pgeometry, pmaterial )
let plane3 = new THREE.Mesh( pgeometry, pmaterial )
let plane4 = new THREE.Mesh( pgeometry, pmaterial )
let plane5 = new THREE.Mesh( pgeometry, pmaterial )
scene.add( plane, plane2, plane3, plane4, plane5, )
plane.position.z = -5
plane.position.x = 10
plane.rotation.y = 45
plane2.rotation.y = -225
plane2.position.x = -15
plane3.position.z = -10
plane4.rotation.x = 90
plane5.rotation.x = 90
plane4.position.y = -10
plane5.position.y = 5


//moving the camera
camera.position.z = 5
camera.position.y = 1


//a function to render the scene
function animate() {
    requestAnimationFrame( animate )
	  renderer.render( scene, camera )
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();
