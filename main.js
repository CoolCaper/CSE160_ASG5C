import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

//CLASSES

class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min;  // this will call the min setter
    }
  }

  

  const scene = new THREE.Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

const geometry = new THREE.BoxGeometry( boxWidth * 10, boxHeight * 10, boxDepth * 10);
const circle = new THREE.SphereGeometry(20)
const pentagon = new THREE.SphereGeometry()
const knot = new THREE.TorusKnotGeometry()
const octagon = new THREE.TorusGeometry()
const sphere = new THREE.SphereGeometry(10)
const decagon = new THREE.TubeGeometry()
const dodecahedron = new THREE.RingGeometry()
const lathe = new THREE.LatheGeometry()
lathe.scale.x = 3;
lathe.scale.y = 3;
console.log("lathe ", lathe)


const cylGeo = new THREE.CylinderGeometry(1, 1, 2)
const pyr = new THREE.ConeGeometry(1, 3, 4)

const flames = new THREE.ConeGeometry(3, 15, 4)


//Functions

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

const gui = new MinMaxGUIHelper();

const loader = new THREE.TextureLoader();
const texture = loader.load( 'fur.jpg' );
const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
function updateCamera() {
    camera.updateProject
}

const fur = new THREE.MeshBasicMaterial({
    color: 0xFF8844,
    map: texture,
});


const scales = new THREE.MeshBasicMaterial({
    color: 0x1983CC,
    map: texture
})
//make cylinder



{

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
        './2294472375_0f11ed3731_k.jpg',
        () => {

            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            scene.background = texture;

        } );

}


// const canvas = document.querySelector( '#c' );
const canvas = document.getElementById("c")
const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
camera.position.z = 3;

const controls = new OrbitControls( camera, canvas );
controls.target.set( 0, 0, 0 );

const rug = makeInstance( circle, 0x44aa88, 50, null, -70);
    rug.scale.x = 3;
    rug.scale.z = 3;
    console.log(rug)
const plaque = makeInstance( sphere, 0xDDaa88, 55, null, 25, -80 )
plaque.scale.x = 3
plaque.scale.z = 0

const candle = makeInstance( lathe, 0x838800, 100, null, -18.5, 75 )
const handle = makeInstance( cylGeo, 0x8300bb,  100, null, -20, 64 )
const cup = makeInstance( cylGeo, 0x8300bb, 100, null, -20, 65 )
handle.scale.z = .5;
handle.scale.x = .5;
const head2 = new THREE.ConeGeometry(7, 7, 4)
//head2.rotation.isEuler = false;
const head = new THREE.BoxGeometry( boxWidth * 7, boxHeight * 7, boxDepth * 7);
const ear = new THREE.ConeGeometry(3, 6.5, 4)
const fur_pyr = new THREE.ConeGeometry(3, 100, 4)
const fire = new THREE.CylinderGeometry(5, 5, 15)
    fire.rotateZ(Math.PI / 2)
//rug.updateMatrix()
const cubes = [
    makeInstance(head2, 0x198383, -30, fur, -70, -5),
    makeInstance(ear, 0x198383, -30, fur, -60.5, -1.5),
    makeInstance(ear, 0x198383, -30, fur, -60.5, -7.5),
    makeInstance( geometry,  0x198383, -20, fur, -70),    
    makeInstance( fur_pyr, 0x198383, -18, fur, -70 ),
    //5
    makeInstance( knot, 0xCCaa88, 100, null, -20,  90),
    plaque,
    makeInstance( cylGeo, 0xbbbbbb, 100, null, -20, 75),    
    candle,
    rug,
    //10
    makeInstance( cylGeo, 0x8388bb, - 24, null, -10, 40 ),   
    makeInstance( flames, 0xbb0000, 48.25, null, -50, -70.75 ),
    makeInstance( flames, 0xbb0000, 60, null, -50, -65 ),
    handle,
    cup,
    makeInstance( flames, 0xbb8300, 45, null, -50, -60 ),
    //15
    makeInstance( flames, 0xbb8300, 57, null, -50, -62.5 ),
    //yellow
    makeInstance( flames, 0xbbff00, 62, null, -50, -62.5 ),
    makeInstance( flames, 0xbbff00, 57, null, -50, -75 ),
    makeInstance( fire, 0x836644, 55, null, -60, -65)
];
console.log(cubes.length)
function main() {

	controls.update();

    	//fish! fish, fish, fish

	{
		const mtlLoader = new MTLLoader();
			mtlLoader.load('12265_Fish_v1_L2.mtl', (mtl) => {
		  		mtl.preload();
				const objLoader = new OBJLoader();
		  		objLoader.setMaterials(mtl);
		  		objLoader.load('12265_Fish_v1_L2.obj', (root) => {
                    
                    console.log(root)    
                    root.position.z -= 70
                    root.position.x += 50
                    root.position.y += 20
                    root.rotation.isEuler = false
                    root.rotation.x = 80
					scene.add(root);
		  		});
                console.log(objLoader)
                objLoader.z = -100
			});
        console.log(mtlLoader)
    }

	{
		const color = 0xFFFFFF;
		const intensity = 3;		
		const light = new THREE.AmbientLight( color, intensity );
		light.position.set( - 1, 2, 4 );		
		scene.add( light );
	}

	{
		const color = 0xFFFFFF;
		const intensity = 3;		
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );		
		scene.add( light );
	}

    

	{
		const color = 0xFFFFFF;
		const intensity = 300;       
		const light = new THREE.PointLight( color, intensity );
		light.position.set( 40, 2, 4 );		
		scene.add( light );
	}
	
    for (var c = 0; c < cubes.length; c++) {
        scene.add(cubes[c])
    }
    

    render(1)

}

function makeInstance( geometry, color, x , mtl=null, y=null, z=null) {

    if (mtl == null) {
        mtl = new THREE.MeshPhongMaterial( { color } );
    }		
    const cube = new THREE.Mesh( geometry, mtl );

    cube.position.x = x;

    if (y != null) {
        cube.position.y = y;
    }

    
    if (y != null) {
        cube.position.y = y;
    }

    
    if (z != null) {
        cube.position.z = z;
    }

    return cube;

}

function resizeRendererToDisplaySize( renderer ) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {

        renderer.setSize( width, height, false );

    }

    return needResize;

}

function render( time ) {

    time *= 0.001;

    if ( resizeRendererToDisplaySize( renderer ) ) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

    }

    // cubes.forEach( ( cube, ndx ) => {

    //     const speed = 1 + ndx * .1;
    //     const rot = time * speed;
    //     cube.rotation.x = rot;
    //     cube.rotation.y = rot;

    // } );

    renderer.render( scene, camera );
    requestAnimationFrame( render );

}



main();
