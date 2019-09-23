//setting up the scene, camera, and the renderer
let scene = new THREE.Scene( { background: 0xABCDEF } )
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

let renderer = new THREE.WebGLRenderer()
renderer.gammaOutput = true
renderer.gammaFactor = 3
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


//lights
let light = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add( light )

var skyLight = new THREE.HemisphereLight( 0xFFF5F9, 0x080820, 0.5)
scene.add( skyLight )
dirLight = new THREE.DirectionalLight( 0xffffff, 1 )
				dirLight.color.setHSL( 0.1, 1, 0.95 )
				dirLight.position.set( - 1, 1.75, 1 )
				dirLight.position.multiplyScalar( 0.5 )
scene.add( dirLight )


//load 3d model
let loader = new THREE.GLTFLoader()

let map

loader.load( '/3dmodel/goodmap.gltf', function ( gltf ) {
    map = gltf.scene
    scene.add( gltf.scene )
    map.scale.set( 25, 25, 25 )
    map.position.y = -15
}, undefined, function ( error ) {
	 console.error( error )
} )


let texture = new THREE.TextureLoader().load( '/3dmodel/ncloudtx.png' )

//skybox
let sgeometry = new THREE.BoxGeometry( 250, 250, 250 )
let smaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} )
let skybox = new THREE.Mesh( sgeometry, smaterial )
skybox.shadow
scene.add( skybox )

//controls
controls = new THREE.MapControls( camera, renderer.domElement )

//controls.addEventListener( 'change', render ) // call this only in static scenes (i.e., if there is no animation loop)
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 1
controls.screenSpacePanning = false
controls.minDistance = 1
controls.maxDistance = 20
controls.maxPolarAngle = 10

//server
let serverFMap = new THREE.TextureLoader().load( '3dmodel/normals/serverfmap.png')
let serverFTexture = new THREE.TextureLoader().load( '3dmodel/serverfront.png' )
let serverFMaterial = new THREE.MeshStandardMaterial( {map: serverFTexture, normalMap: serverFMap} )

let serverFGeometry = new THREE.BoxGeometry( 3, 1, 2)
let serverFront = new THREE.Mesh( serverFGeometry, serverFMaterial )

let serverSMap = new THREE.TextureLoader().load( '3dmodel/normals/serversmap.png')
let serverSTexture = new THREE.TextureLoader().load( '3dmodel/servershell.png' )
let serverSMaterial = new THREE.MeshStandardMaterial( {map: serverSTexture, normalMap: serverSMap} )

let serverSGeometry = new THREE.BoxGeometry( 3.1, 1.1, 3)
let serverShell = new THREE.Mesh( serverSGeometry, serverSMaterial )

scene.add( serverFront, serverShell )

serverFront.position.z = 0.55

//sparkles
let geometry = new THREE.BufferGeometry()
let vertices = []
let sparkle1 = new THREE.TextureLoader().load( 'sprites/sparkle.png' )

for ( let i = 0; i < 30; i ++){

      let x = Math.random() * 10 - 5
      let y = Math.random() * 10 - 5
      let z = Math.random() * 10 - 5

      vertices.push( x, y, z);
}

geometry.addAttribute( 'position', new THREE.Float32BufferAttribute(vertices, 3) )

parameters =[
  [[ 0.90, 0.05, 0.01 ], sparkle1, 10 ]
]

for ( let i = 0; i < parameters.length; i++){
    let color = parameters[ i ][ 0 ]
    let sprite = parameters[ i ][ 1 ]
    let size = parameters[ i ][ 2 ]

    let materials = new THREE.PointsMaterial( {size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true })
    materials.color.setHSL( color[ 0 ], color [ 1], color [2] )

    let particles = new THREE.Points( geometry, materials )
    particles.rotation.x = Math.random() * 3
    particles.rotation.y = Math.random() * 3
    particles.rotation.z = Math.random() * 3

    scene.add( particles );

}


//audio
let listener = new THREE.AudioListener()
camera.add( listener )

let sound = new THREE.PositionalAudio( listener )

let audioLoader = new THREE.AudioLoader()
audioLoader.load('sound/serversound.wav', function( buffer ) {
    sound.setBuffer( buffer )
    sound.setRefDistance( 1 )
    sound.setRolloffFactor( 3 )
    sound.setMaxDistance( 10 )
		sound.setLoop( true )
    sound.play()
})

serverShell.add( sound )

//renderer

function render(){

	renderer.render( scene, camera )
}




//a function to render the scene
function animate() {
    requestAnimationFrame( animate )

	  renderer.render( scene, camera )
}
animate()
