<script src="https://threejs.org/build/three.js"></script>
<div id="screensaver" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;"></div>

var screensaverDiv = document.getElementById('screensaver');

// Create the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

// Create the geometry and material for the cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Position the camera
camera.position.z = 5;

var inactivityTime = function() {
    var time;
    window.onload = resetTimer;

    // DOM events to reset the timer
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function logout() {
        screensaverDiv.style.display = "block";
        renderer.setSize(window.innerWidth, window.innerHeight);
        screensaverDiv.appendChild(renderer.domElement);

        // Animate the cube
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 60000)  // 1 minute of inactivity will trigger the screensaver
        if(screensaverDiv.style.display == "block") {
            screensaverDiv.innerHTML = '';
            screensaverDiv.style.display = "none";
        }
    }
};
window.onload = function() {
    inactivityTime(); 
}
