import * as THREE from "three";
// import GLTFLoader from "three-gltf-loader";

export default function ImaginationScene(scene) {
  this.sceneGroup = new THREE.Group();
  scene.add(this.sceneGroup);
  this.material = null;
  // this.loader = new GLTFLoader();

  // scene.background
  this.init = () => {
    this.load();
    this.start = Date.now();
  };

  this.load = () => {
    // instantiate a loader
    var panoTexture = new THREE.TextureLoader().load("src/assets/pano.jpg");

    var uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["lights"],
      {
        diffuse: { type: "c", value: new THREE.Color(0xffffff) },
        tShine: { type: "t", value: panoTexture },
        time: { type: "f", value: 0 },
        weight: { type: "f", value: 0 }
      }
    ]);

    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById("vertexShader").textContent,
      fragmentShader: document.getElementById("fragmentShader").textContent,
      lights: true
    });
    console.log(this.material);
    let mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(20, 5),
      this.material
    );
    console.log(mesh);
    mesh.scale.setScalar(0.7);
    mesh.position.set(0, 0, 0);
    this.sceneGroup.add(mesh);
  };

  this.update = delta => {
    if (this.material) {
      this.material.uniforms["time"].value =
        0.00025 * (Date.now() - this.start);
      this.material.uniforms["weight"].value =
        10.0 * (0.5 + 0.5 * Math.sin(0.00025 * (Date.now() - this.start)));
    }
  };
}
