//from three.js examples
var SEPARATION = 100, AMOUNTX = 80, AMOUNTY = 80;
var wcanvas;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var scaleFactor = 1;
var windowHalfY = scaleFactor * window.innerHeight / 2;
//var dotcolour = 0x8effe6;
var dotcolour = 0x20cabd;
var speed=0.05;
var mousespeed=0.01;
var now;
var then = new Date().getTime();
var startx = -800;

function init() {
	wcanvas = document.getElementById("waves_canvas");
	wcanvas.width = window.innerWidth;
	wcanvas.height = scaleFactor*window.innerHeight;
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / (scaleFactor * window.innerHeight), 1, 10000 );
	camera.position.x = -20000;
	camera.position.z = 1000;
	scene = new THREE.Scene();
	particles = new Array();
	var PI2 = Math.PI * 2;
	var material = new THREE.SpriteCanvasMaterial( {
		color: dotcolour,
		program: function ( context ) {
			context.beginPath();
			context.arc( 0, 0, 0.5, 0, PI2, true );
			context.fill();
		}
	} );
	var i = 0;
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[ i ++ ] = new THREE.Sprite( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );
		}
	}
	renderer = new THREE.CanvasRenderer({canvas: wcanvas, alpha: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( wcanvas.width, wcanvas.height );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	wcanvas.width = window.innerWidth;
	wcanvas.height = scaleFactor*window.innerHeight;
	windowHalfX = wcanvas.width / 2;
	windowHalfY = wcanvas.height / 2;
	camera.aspect = wcanvas.width / wcanvas.height;
	camera.updateProjectionMatrix();
	renderer.setSize( wcanvas.width, wcanvas.height );
}
//
function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}
function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	now = new Date().getTime();
	var delta = now-then;
	camera.position.x += ( mouseX - (camera.position.x-startx) ) * (mousespeed*delta)*(60/1000);
	camera.position.y = 500;
	//console.log(camera.position.x);
	camera.lookAt( scene.position );
	var i = 0;
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
				( Math.sin( ( iy + count ) * 0.5 ) * 50 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
				( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
		}
	}
	renderer.render( scene, camera );
	count += (speed*delta)*(60/1000);
	//count += 0.1;
	then=now;
}