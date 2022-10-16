import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IntercomServiceService } from '../services/intercom-service.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-render-component',
  templateUrl: './render-component.component.html',
  styleUrls: ['./render-component.component.css']
})
export class RenderComponentComponent implements OnInit {
  name = 'Angular';
  showRenderingProgress = false;

  private renderingModelSubscription!: Subscription;

  constructor(
    private intercomService: IntercomServiceService
  ) { }

  ngOnInit() {
    this.renderingModelSubscription = this.intercomService.notifyObservable$.subscribe((res) => {
      this.renderSimplifiedGlbModel(res);
    });
  }

  renderSimplifiedGlbModel(file: any) {
    console.log(file)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const canvas = <HTMLCanvasElement>document.querySelector('#renderingCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("#222222")
    camera.position.z = 5

    // ambient light
    var ambientLight = new THREE.AmbientLight(0xffffff, 3)
    scene.add(ambientLight)

    // point light
    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 50, 25);
    scene.add(pointLight);

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    // resize canvas on resize window
    window.addEventListener('resize', () => {
      let width = window.innerWidth
      let height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })

    const manager = new THREE.LoadingManager();

    manager.onStart = () => { this.showRenderingProgress = true; }
    manager.onLoad  = () => { this.showRenderingProgress = false; }

    const loader = new GLTFLoader(manager);
    loader.load(file, function (gltf) {
      var root = gltf.scene
      console.log(root)
      scene.add(gltf.scene)
      camera.position.z = 0.25
      renderer.render(scene, camera)

      function loop() {
        requestAnimationFrame(loop)
        renderer.render(scene, camera)
      }
      loop()
    }, undefined, function (error) {
      console.error(error);
    });
  }

  ngOnDestroy() {
    this.renderingModelSubscription?.unsubscribe();
  }
}
