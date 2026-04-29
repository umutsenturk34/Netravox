"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ModelViewer({ style, className }) {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.offsetWidth;
    const H = mount.offsetHeight;

    // --- Scene ---
    const scene = new THREE.Scene();

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    camera.position.set(0, 0.5, 6);
    camera.lookAt(0, 0, 0);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.DirectionalLight(0xc7d2fe, 3.5); // indigo-200
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8); // sky-400
    fillLight.position.set(-3, 0, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x6366f1, 2.5, 30); // indigo
    rimLight.position.set(0, -2, -4);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xe0e7ff, 1.0);
    topLight.position.set(0, 6, 1);
    scene.add(topLight);

    // --- Load model ---
    let model = null;
    const loader = new THREE.ObjectLoader();

    loader.load(
      "/model.json",
      (object) => {
        // Center and scale
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        object.position.sub(center);
        object.scale.setScalar(3.2 / maxDim);

        // Shift down so text sits above it
        object.position.y -= 0.6;

        // Enhance materials for dark background
        object.traverse((child) => {
          if (!child.isMesh) return;
          const mats = Array.isArray(child.material)
            ? child.material
            : [child.material];
          mats.forEach((mat) => {
            if (!mat) return;
            mat.envMapIntensity = 1.2;
            if (mat.isMeshStandardMaterial || mat.isMeshPhongMaterial) {
              mat.emissive = mat.emissive || new THREE.Color(0);
              mat.emissiveIntensity = 0.06;
            }
          });
        });

        scene.add(object);
        model = object;
        setLoaded(true);
      },
      undefined,
      (err) => console.error("Model load error:", err)
    );

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Animation loop ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Lerp mouse
      smooth.x += (mouse.x * 0.35 - smooth.x) * 0.04;
      smooth.y += (mouse.y * 0.18 - smooth.y) * 0.04;

      if (model) {
        // Auto-rotation + mouse tilt
        model.rotation.y = smooth.x + t * 0.12;
        model.rotation.x = smooth.y * 0.5;
        // Gentle float
        model.position.y = -0.6 + Math.sin(t * 0.55) * 0.08;
      }

      // Slowly orbit rim light for drama
      rimLight.position.x = Math.sin(t * 0.3) * 4;
      rimLight.position.z = Math.cos(t * 0.3) * 4 - 3;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position: "relative", ...style }}
    >
      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
            <span className="text-xs text-white/30">Model yükleniyor…</span>
          </div>
        </div>
      )}
    </div>
  );
}
