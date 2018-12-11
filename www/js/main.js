//setting up the scene, camera, and the renderer
let scene = new THREE.Scene( { background: 0xABCDEF } )
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

let renderer = new THREE.WebGLRenderer()
renderer.gammaOutput = true
renderer.gammaFactor = 2.2
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


//lights
let light = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add( light )

//load server 3dmodel
let loader1 = new THREE.GLTFLoader()

let server

loader1.load('/3dmodel/server.gltf', function ( gltf1 ){
    server = gltf1.scene
    scene.add( gltf1.scene )
    server.scale.set(0.2,0.2,0.2)
    server.position.y = 0.8

}, undefined, function ( error ) {
  console.error( error )
} )

//load 3d model
let loader = new THREE.GLTFLoader()

let map

loader.load( '/3dmodel/goodmap.gltf', function ( gltf ) {
    map = gltf.scene
    scene.add( gltf.scene )
}, undefined, function ( error ) {
	 console.error( error )
} )

//creating and adding a cube into the scene
let geometry = new THREE.BoxGeometry( 1, 1, 1 )
let material = new THREE.MeshNormalMaterial( {light: true} )
let cube = new THREE.Mesh( geometry, material )
scene.add( cube )

let texture = new THREE.TextureLoader().load( '/3dmodel/ncloudtx.png' )

//skybox
let sgeometry = new THREE.BoxGeometry( 15, 15, 15)
let smaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} )
let skybox = new THREE.Mesh( sgeometry, smaterial )
scene.add( skybox )


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
