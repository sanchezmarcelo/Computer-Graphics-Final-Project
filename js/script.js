		
		//Creates scene, camera, and render 
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );


		var blind;
		var ground;

		var frames = 0;
		scene.rotation.y = -0.5;

		var geometry = new THREE.SphereGeometry(2.5, 50, 50);

		var meshCollection, meshRadius, meshPhase, meshRand;

		meshCollection = []; 
    	meshRadius = [];
    	meshPhase = [];
    	meshRand = [];

    	material = new THREE.MeshNormalMaterial();
    	var plane=new THREE.BoxGeometry( 50.1,50.1, 50.1 );
    	blind= new THREE.Mesh(plane,new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
    	//blind.position.y=4
    	//blind.position.z=38;
    	blind.rotation.y=0;
    	//scene.add(blind);
   		var black= new THREE.MeshBasicMaterial({color: 0x000000})
    	blackHole = new THREE.Mesh(geometry, black);
    	//TODO Add a MineCraft Grass Texture(its only fitting... :) ) to the below box and readjust size to your discretion.
    
		scene.background= new THREE.Color(0xd0d0d0);

		var address = "textures/dark.jpg";
		var texture = new THREE.TextureLoader().load(address);
		var material = new THREE.MeshBasicMaterial({map: texture});
		
		var geometry = new THREE.BoxGeometry(50, 2, 50);
		var ground = new THREE.Mesh(geometry, material);

		scene.add(ground);
			
		ground.translateY(-7.58);

		//Render scene
		renderer.render(scene, camera);

		//Init orbit control
		//controls = new THREE.OrbitControls(camera);

		//Sets initial camera position
		camera.position.z = 40;
		camera.position.y = 5;

		
		//------------------Box--constructor----------------
			function newBox(width, height, depth, xpos, ypos, zpos, xrot, yrot){

			var geometry = new THREE.BoxGeometry(width, height, depth);
			var color = new THREE.MeshBasicMaterial({color: 0xffffff});
			var cube = new THREE.Mesh(geometry, color);
			//scene.add(cube);	

			cube.translateX(xpos);
			cube.translateY(ypos);
			cube.translateZ(zpos);

			cube.rotation.x = xrot;
			cube.rotation.y = yrot;
			return geometry;
			}

			//----------------Box--with--material--constructor------
			function newBoxAndMat(width, height, depth, xpos, ypos, zpos, address){

			var address = address;
			var texture = new THREE.TextureLoader().load(address);
			var material = new THREE.MeshBasicMaterial({map: texture});
			
			var geometry = new THREE.BoxGeometry(width, height, depth);
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);
			
			addMesh(cube);	

			
			cube.translateZ(zpos);
			cube.translateX(xpos);
			cube.translateY(ypos);
			}

		//function newBoxAndMat(width, height, depth, xpos, ypos, zpos, address)
		newBoxAndMat(2, 13, 8, -7, 0, -1, "textures/stone.jpg");

		newBoxAndMat(2, 13, 8, -2, 0, -1, "textures/greyWood.jpg"); //right
			
		//roof
		newBoxAndMat(3, 0.5, 8, -4.5, 6.25, -1, "textures/stone.jpg");

		//base floor 
		newBoxAndMat(20, 1, 20, 0, -7, 0, "textures/patio.jpg");

		//back side l box // right side l box
		newBoxAndMat(20, 4.85, 5, 0, -5, -7.5, "textures/otherConcrete.jpg");
		newBoxAndMat(5, 4.85, 20, 7.5, -5, 0, "textures/otherConcrete.jpg");	
	
		//	width, height, depth, xpos, ypos, zpos, xrot, yrot
		
		newBoxAndMat(1, 5, 10, 0, -5, -1, "textures/stone.jpg");

		//---------------Left-Pilars
		newBoxAndMat(1, 5, 0.5, 2, -5, 3.8, "textures/stone.jpg");
		newBoxAndMat(1, 5, 0.5, 4, -5, 3.8, "textures/stone.jpg");

		//---------------slim tall piece in between pillars

		newBoxAndMat(5, 12.5, 0.5, -5, 0, -4.74, "textures/stone.jpg");

		//--------Black--box--with-boolean-geomtry---------------------//

		var a = newBox(12, 6, 15, 5.5, 15, 0, 0, 0);

		var b = newBox(11, 5, 16, 5.5, 15, 0, 0, 0);

		var x = new ThreeBSP(a);

		var y = new ThreeBSP(b);

		var union = x.subtract(y);

		var address = "textures/black.jpg";

		var texture = new THREE.TextureLoader().load(address);
	
		var mesh = new THREE.Mesh(union.toGeometry(), new THREE.MeshBasicMaterial({map: texture}));

		mesh.geometry.computeFaceNormals();

		scene.add(mesh);

		addMesh(mesh);


		function glass(width, height, depth, xpos, ypos, zpos){
			var material = new THREE.MeshStandardMaterial({
			opacity: 0.30,
			transparent: true
			});
			var geometry = new THREE.BoxGeometry(width, height, depth);
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);
			addMesh(cube);	

			cube.translateZ(zpos);
			cube.translateX(xpos);
			cube.translateY(ypos);
		}

		//----small left window
		glass(2.75, 2.45, 0.15, -9.40, 0.8, -0.25);

		glass(0.15, 2.45, 9, -11, 0.8, -5);

		glass(10.6, 2.45, 0.15, -5.5, 0.75, -9.75);
		//-----

		//front
		glass(11.5, 2.8, 0.15, 5.5, 2, 3.8);

		glass(6.4, 2.79, 0.15, 3, -0.80, 3.8);

		glass(3.6, 2.79, 0.15, 9.6, -0.80, 3.8);

		glass(11.5, 5.4, 0.15, 5.5, 0.5, -10.5);

		//------------
		//--------Handrail-------
		newBoxAndMat(0.25, 2, 0.25, 5.5, -2, 9.5, "textures/graphite.jpg");
		newBoxAndMat(0.25, 2, 0.25, 9.5, -2, 9.5, "textures/graphite.jpg");
		newBoxAndMat(0.25, 2, 0.25, 9.5, -2, 5.5, "textures/graphite.jpg");

		newBoxAndMat(4, 0.25, 0.25, 7.5, -1.1, 9.5, "textures/graphite.jpg");
		newBoxAndMat(0.25, 0.25, 4, 9.5, -1.1, 7.6, "textures/graphite.jpg");
		//-------end of handrail

		//--------End--of--box--with--boolean-geomtry------------------//

		mesh.translateX(5.5);
		mesh.translateY(0.5);
		mesh.translateZ(-3.5);

		//-------Left--top--stone--corner-----------------------------//
		newBoxAndMat(11, 1, 5, -5.7, 2.5, -7.5, "textures/otherConcrete.jpg");

		//-------Left--bottom--stone--corner--------------------------//
		newBoxAndMat(11, 1, 5, -5.7, -1, -7.5, "textures/otherConcrete.jpg");

		//-------Left--top--back--stone--corner-----------------------//
		newBoxAndMat(3.5, 1, 5, -9.5, 2.5, -2.5, "textures/otherConcrete.jpg");
			
		//-------Left--bottom--back-stone--corner---------------------//
		newBoxAndMat(3.5, 1, 5, -9.5, -1, -2.5, "textures/otherConcrete.jpg");

		//--------------------------Stairs---------------------------//

		newBoxAndMat(1, 0.5, 5, 4.5, -2.82, 7.5, "textures/graphite.jpg");

		newBoxAndMat(1, 0.5, 5, 3.7, -3.62, 7.5, "textures/graphite.jpg");

		newBoxAndMat(1, 0.5, 5, 2.9, -4.42, 7.5, "textures/graphite.jpg");

		newBoxAndMat(1, 0.5, 5, 2.1, -5.22, 7.5, "textures/graphite.jpg");
			
		newBoxAndMat(1, 0.5, 5, 1.3, -6.02, 7.5, "textures/graphite.jpg");

		//----------------------End--of--Stairs---------------------//


		newBoxAndMat(0.5, 2.5, 0.5, -11, 0.75, -0.25, "textures/otherConcrete.jpg");
		newBoxAndMat(0.5, 2.5, 0.5, -11, 0.75, -9.75, "textures/otherConcrete.jpg");

		//--------------------------Animate-------------------------//
		var animate = function () {
    	frames++;
	    requestAnimationFrame(animate);
	  		scene.rotation.y+=0.005;
		    if(frames==980){
		        scene.add(blackHole)
		        scene.add(blind)
		    }
		    if(frames>1000){
		    swirlAll();
			}
		    if(frames==1050){
		        scene.remove(blind);
		    }
		    if((frames-1000)>60*meshCollection.length){
		    	blackHole.scale.x -= .005;
		    	blackHole.scale.y -= .005;
		    	blackHole.scale.z -= .005;
		    	if(blackHole.scale.x < 0.1 && blackHole.scale.y < 0.1 && blackHole.scale.z < 0.1){
		    		scene.remove(blackHole);
		    	}
		    }
	   	 renderer.render(scene, camera);
		}

		//---------End--of--animate---------------

			animate();
			
			function addMesh(Mesh) {

		    meshCollection.push(Mesh);
		    meshRadius.push(setRadius());
		    meshPhase.push(setPhase());
		    meshRand.push(Math.random());

			    for(var i=0; i<(Math.random()*5).floor;i++){
			    meshCollection[meshCollection.length] = newBoxandMat((1+(Math.random() * 4)), (1+(Math.random() * 4)), (1+(Math.random() * 4)), 2000, 3000, 200, 0, 0, "textures/otherConcrete.jpg");
			    meshPhase[meshPhase.length] = setPhase();
	    		}
			}

			function setRadius() {
			    //TODO if the 
			    var objectCount = meshCollection.length;
			    var Radius = 6.5+objectCount / 2;
			    return Radius;
			}

			function setPhase() {
			    var objectCount = meshCollection.length;
			    var Phase = Math.pow(objectCount,2)/3;
			    return Phase;
			}

function swirl(i) {
    var x= (1 - (frames % 800) / 100) * Math.cos((1 - (0.4 * frames % 200 + 1)) + frames / 6);
    meshCollection[i].position.x = (meshRadius[i] - ((frames-1000) %(60*meshCollection.length))*0.01) * Math.cos((1 - (0.05 * frames % 300 + meshPhase[i])));
    meshCollection[i].position.y = (meshRadius[i] - ((frames-1000) %(60*meshCollection.length))*0.01 ) * Math.sin((1 - (0.05 * frames % 300 + meshPhase[i])) );
    meshCollection[i].position.z=0;
    var dist = Math.sqrt(Math.pow(meshCollection[i].position.x,2)+Math.pow(meshCollection[i].position.y,2));
    if(dist<5){
        scene.remove(meshCollection[i]);
    }


/*function swirl(i) {
    //var x= (meshRadius[i] - ((frames-1000)*0.0000001) * Math.cos((1 - (0.05 * frames % 300 + meshPhase[i])));
    meshCollection[i].position.x = (meshRadius[i] - (frames-1500)*0.00000000000000000001) * Math.cos((1 - (0.05 * frames % 300 + meshPhase[i])));
    meshCollection[i].position.z = (meshRadius[i] - (frames-1500)*0.01) * Math.sin((1 - (0.05 * frames % 300 + meshPhase[i])) );
    meshCollection[i].position.y=0;
    var dist = Math.sqrt(Math.pow(meshCollection[i].position.x,2)+Math.pow(meshCollection[i].position.y,2));
    if(dist<3){
        scene.remove(meshCollection[i]);
    }

*/

   //meshCollection[i].position.x +=0.01;// (meshRadius[i] - (frames % 800) / 100) * Math.cos((1 - (0.4 * frames % 200 + meshPhase[i])) + frames / 6);
  // meshCollection[i].position.y +=0.01 //(meshRadius[i] - (frames % 800) / 100) * Math.sin((1 - (0.4 * frames % 200 + meshPhase[i])) + frames / 6);

}

function swirlAll() {
    for (var i = 0; i < meshCollection.length; i++) {
        swirl(i);
    }
}
