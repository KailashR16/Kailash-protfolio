import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThemeMode, SceneMode } from '../types';

interface ThreeCanvasProps {
  theme: ThemeMode;
  sceneMode: SceneMode;
  speed?: number;
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  theme,
  sceneMode,
  speed = 1,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const getThemeColors = (t: ThemeMode) => {
    switch (t) {
      case 'deep-amethyst':
        return {
          primary: 0x8b5cf6,
          secondary: 0xc084fc,
          glow: 0xec4899,
          particle: 0xd8b4fe,
          grid: 0x6d28d9,
          ambient: 0x180b2c,
        };
      case 'matrix-emerald':
        return {
          primary: 0x10b981,
          secondary: 0x34d399,
          glow: 0x059669,
          particle: 0x6ee7b7,
          grid: 0x047857,
          ambient: 0x032212,
        };
      case 'solar-amber':
        return {
          primary: 0xf59e0b,
          secondary: 0xfbbf24,
          glow: 0xf97316,
          particle: 0xfde68a,
          grid: 0xb45309,
          ambient: 0x241203,
        };
      case 'cyber-cyan':
      default:
        return {
          primary: 0x06b6d4,
          secondary: 0x38bdf8,
          glow: 0x3b82f6,
          particle: 0x7dd3fc,
          grid: 0x0284c7,
          ambient: 0x051a2e,
        };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.028);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTING
    const colors = getThemeColors(theme);
    const ambientLight = new THREE.AmbientLight(colors.ambient, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(colors.primary, 3, 60);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.glow, 2.5, 50);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    // Create custom smooth circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.25, 'rgba(255,255,255,0.85)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.2)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // References for dynamic animation updating per frame
    let updateAnimation: (time: number) => void = () => {};

    // ----------------------------------------------------
    // MODE 1: CYBER WAVE TERRAIN (Parametric 3D Waves)
    // ----------------------------------------------------
    if (sceneMode === 'cyber-wave') {
      camera.position.set(0, 7, 16);
      camera.rotation.x = -0.35;

      const gridX = 65;
      const gridY = 65;
      const waveGeo = new THREE.PlaneGeometry(60, 50, gridX, gridY);
      waveGeo.rotateX(-Math.PI / 2);
      waveGeo.translate(0, -4, 0);

      // Wireframe mesh material
      const waveMat = new THREE.MeshBasicMaterial({
        color: colors.grid,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const waveMesh = new THREE.Mesh(waveGeo, waveMat);
      scene.add(waveMesh);

      // Crest particles sitting on top of the vertices
      const posAttr = waveGeo.attributes.position;
      const particleGeo = new THREE.BufferGeometry();
      const pCount = posAttr.count;
      const pPositions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPositions[i * 3] = posAttr.getX(i);
        pPositions[i * 3 + 1] = posAttr.getY(i);
        pPositions[i * 3 + 2] = posAttr.getZ(i);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: colors.secondary,
        size: 0.32,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const crestParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(crestParticles);

      // Floating horizon cyber starfield
      const bgCount = 400;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount * 3; i += 3) {
        bgPos[i] = (Math.random() - 0.5) * 60;
        bgPos[i + 1] = 4 + Math.random() * 20;
        bgPos[i + 2] = (Math.random() - 0.5) * 40 - 15;
      }
      const bgGeo = new THREE.BufferGeometry();
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      const bgMat = new THREE.PointsMaterial({
        color: colors.particle,
        size: 0.4,
        map: particleTexture,
        transparent: true,
        opacity: 0.6,
      });
      const bgStars = new THREE.Points(bgGeo, bgMat);
      scene.add(bgStars);

      // Save initial Y positions to modulate dynamically
      const initialY = new Float32Array(posAttr.count);
      for (let i = 0; i < posAttr.count; i++) {
        initialY[i] = posAttr.getY(i);
      }

      updateAnimation = (time) => {
        const t = time * 0.9 * speed;
        const mouseX = mouseRef.current.x * 4;
        const mouseY = mouseRef.current.y * 3;

        // Wave displacement
        for (let i = 0; i < posAttr.count; i++) {
          const x = posAttr.getX(i);
          const z = posAttr.getZ(i);
          const waveHeight =
            Math.sin(x * 0.18 + t) * Math.cos(z * 0.15 + t * 0.8) * 2.2 +
            Math.sin(z * 0.25 - t * 1.2) * 1.0 +
            Math.sin(Math.sqrt(x * x + z * z) * 0.2 - t) * 0.8;

          posAttr.setY(i, initialY[i] + waveHeight);
          pPositions[i * 3 + 1] = initialY[i] + waveHeight;
        }

        posAttr.needsUpdate = true;
        particleGeo.attributes.position.needsUpdate = true;

        // Smooth camera drift
        camera.position.x = mouseRef.current.x * 2.5;
        camera.position.y = 7 + mouseRef.current.y * 1.2;
        camera.lookAt(0, -1, -10);
      };
    }

    // ----------------------------------------------------
    // MODE 2: COSMIC VORTEX (Galactic Spiral & Black Hole)
    // ----------------------------------------------------
    else if (sceneMode === 'cosmic-vortex') {
      camera.position.set(0, 14, 18);
      camera.lookAt(0, 0, 0);

      const particleCount = 2800;
      const positions = new Float32Array(particleCount * 3);
      const originalAngles = new Float32Array(particleCount);
      const radii = new Float32Array(particleCount);
      const speeds = new Float32Array(particleCount);

      const arms = 4;
      for (let i = 0; i < particleCount; i++) {
        const armIndex = i % arms;
        const baseAngle = (armIndex * (Math.PI * 2)) / arms;
        const r = 1.2 + Math.pow(Math.random(), 1.5) * 16;
        const spiralAngle = baseAngle + r * 0.55 + (Math.random() - 0.5) * 0.6;

        radii[i] = r;
        originalAngles[i] = spiralAngle;
        // Keplerian velocity: inner particles orbit faster
        speeds[i] = (1 / Math.sqrt(r)) * 1.5;

        positions[i * 3] = Math.cos(spiralAngle) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * (r * 0.18);
        positions[i * 3 + 2] = Math.sin(spiralAngle) * r;
      }

      const vortexGeo = new THREE.BufferGeometry();
      vortexGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const vortexMat = new THREE.PointsMaterial({
        color: colors.particle,
        size: 0.38,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const vortex = new THREE.Points(vortexGeo, vortexMat);
      scene.add(vortex);

      // Core singularity ring
      const ringGeo = new THREE.TorusGeometry(1.4, 0.05, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colors.glow,
        transparent: true,
        opacity: 0.8,
      });
      const singularityRing = new THREE.Mesh(ringGeo, ringMat);
      singularityRing.rotation.x = Math.PI / 2;
      scene.add(singularityRing);

      updateAnimation = (time) => {
        const t = time * 0.7 * speed;
        const pos = vortexGeo.attributes.position;

        for (let i = 0; i < particleCount; i++) {
          const currentAngle = originalAngles[i] + t * speeds[i];
          const r = radii[i];
          pos.setX(i, Math.cos(currentAngle) * r);
          pos.setZ(i, Math.sin(currentAngle) * r);
        }
        pos.needsUpdate = true;

        singularityRing.rotation.z = -t * 2;
        const pulse = 1 + Math.sin(t * 3) * 0.1;
        singularityRing.scale.set(pulse, pulse, pulse);

        // Orbit camera around vortex
        camera.position.x = Math.sin(mouseRef.current.x * 0.8) * 16;
        camera.position.y = 12 + mouseRef.current.y * 5;
        camera.position.z = Math.cos(mouseRef.current.x * 0.8) * 18;
        camera.lookAt(0, 0, 0);
      };
    }

    // ----------------------------------------------------
    // MODE 3: NEURAL DATA GLOBE (3D Interconnected Sphere)
    // ----------------------------------------------------
    else if (sceneMode === 'neural-globe') {
      camera.position.set(0, 0, 19);

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Outer Wireframe Geodesic Sphere
      const sphereGeo = new THREE.IcosahedronGeometry(6.5, 3);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: colors.grid,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      globeGroup.add(globeMesh);

      // Inner Core
      const innerGeo = new THREE.IcosahedronGeometry(4.2, 1);
      const innerMat = new THREE.MeshBasicMaterial({
        color: colors.primary,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      globeGroup.add(innerMesh);

      // Surface Node Particles
      const sphereVertices = sphereGeo.attributes.position;
      const nodeCount = sphereVertices.count;
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', sphereVertices);
      const nodeMat = new THREE.PointsMaterial({
        color: colors.particle,
        size: 0.35,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const nodes = new THREE.Points(nodeGeo, nodeMat);
      globeGroup.add(nodes);

      // Orbiting Equatorial & Polar Data Rings
      const ring1Geo = new THREE.TorusGeometry(8.2, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colors.glow,
        transparent: true,
        opacity: 0.45,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      globeGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(9.5, 0.03, 16, 100);
      const ring2 = new THREE.Mesh(ring2Geo, ringMat);
      ring2.rotation.y = Math.PI / 4;
      globeGroup.add(ring2);

      // Ambient star dust
      const dustCount = 800;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount * 3; i += 3) {
        dustPositions[i] = (Math.random() - 0.5) * 45;
        dustPositions[i + 1] = (Math.random() - 0.5) * 45;
        dustPositions[i + 2] = (Math.random() - 0.5) * 40;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      const dustPoints = new THREE.Points(dustGeo, nodeMat);
      scene.add(dustPoints);

      updateAnimation = (time) => {
        const t = time * 0.4 * speed;
        globeGroup.rotation.y = t * 0.8 + mouseRef.current.x * 0.5;
        globeGroup.rotation.x = mouseRef.current.y * 0.4;

        innerMesh.rotation.y = -t * 1.2;
        innerMesh.rotation.z = t * 0.5;

        ring1.rotation.z = t * 0.6;
        ring2.rotation.x = -t * 0.5;

        dustPoints.rotation.y = -t * 0.1;

        camera.position.x = mouseRef.current.x * 3;
        camera.position.y = mouseRef.current.y * 2;
        camera.lookAt(0, 0, 0);
      };
    }

    // ----------------------------------------------------
    // MODE 4: WARP TUNNEL (Hyperspace Star Stream)
    // ----------------------------------------------------
    else if (sceneMode === 'warp-tunnel') {
      camera.position.set(0, 0, 5);

      const starCount = 2200;
      const starPositions = new Float32Array(starCount * 3);
      const starVelocities = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        // Distribute in a cylinder / tunnel around z-axis
        const radius = 1.5 + Math.random() * 14;
        const angle = Math.random() * Math.PI * 2;
        starPositions[i * 3] = Math.cos(angle) * radius;
        starPositions[i * 3 + 1] = Math.sin(angle) * radius;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
        starVelocities[i] = 0.4 + Math.random() * 0.8;
      }

      const warpGeo = new THREE.BufferGeometry();
      warpGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

      const warpMat = new THREE.PointsMaterial({
        color: colors.particle,
        size: 0.45,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const warpStars = new THREE.Points(warpGeo, warpMat);
      scene.add(warpStars);

      // Tunnel concentric rings
      const ringsGroup = new THREE.Group();
      scene.add(ringsGroup);
      const ringMeshes: THREE.Mesh[] = [];
      for (let i = 0; i < 8; i++) {
        const ringGeo = new THREE.TorusGeometry(7 + (i % 3) * 1.5, 0.05, 12, 60);
        const ringMat = new THREE.MeshBasicMaterial({
          color: colors.grid,
          transparent: true,
          opacity: 0.25,
        });
        const rMesh = new THREE.Mesh(ringGeo, ringMat);
        rMesh.position.z = -i * 10;
        ringsGroup.add(rMesh);
        ringMeshes.push(rMesh);
      }

      updateAnimation = (time) => {
        const pos = warpGeo.attributes.position;
        const moveSpeed = 0.7 * speed;

        for (let i = 0; i < starCount; i++) {
          let z = pos.getZ(i) + starVelocities[i] * moveSpeed;
          if (z > 10) {
            z = -60;
          }
          pos.setZ(i, z);
        }
        pos.needsUpdate = true;

        // Animate tunnel rings moving forward
        ringMeshes.forEach((r) => {
          r.position.z += moveSpeed * 0.6;
          if (r.position.z > 8) {
            r.position.z = -65;
          }
          r.rotation.z += 0.005;
        });

        camera.position.x = mouseRef.current.x * 2.5;
        camera.position.y = mouseRef.current.y * 2.0;
        camera.lookAt(mouseRef.current.x * 1.5, mouseRef.current.y * 1.2, -30);
      };
    }

    // ----------------------------------------------------
    // MODE 5: FLOATING POLYHEDRAL TECH CRYSTALS
    // ----------------------------------------------------
    else if (sceneMode === 'floating-crystals') {
      camera.position.set(0, 0, 18);

      const crystalsGroup = new THREE.Group();
      scene.add(crystalsGroup);

      const crystalCount = 24;
      const crystalItems: {
        mesh: THREE.Mesh;
        rotSpeedX: number;
        rotSpeedY: number;
        rotSpeedZ: number;
        baseY: number;
        floatSpeed: number;
      }[] = [];

      const geometries = [
        new THREE.OctahedronGeometry(1.2, 0),
        new THREE.IcosahedronGeometry(1.0, 0),
        new THREE.TetrahedronGeometry(1.4, 0),
        new THREE.DodecahedronGeometry(1.1, 0),
      ];

      for (let i = 0; i < crystalCount; i++) {
        const geo = geometries[i % geometries.length];
        const mat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? colors.primary : colors.secondary,
          wireframe: i % 3 === 0,
          metalness: 0.85,
          roughness: 0.2,
          emissive: colors.ambient,
          emissiveIntensity: 0.3,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 34,
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 20
        );

        const scale = 0.6 + Math.random() * 0.9;
        mesh.scale.set(scale, scale, scale);

        crystalsGroup.add(mesh);
        crystalItems.push({
          mesh,
          rotSpeedX: (Math.random() - 0.5) * 0.03,
          rotSpeedY: (Math.random() - 0.5) * 0.03,
          rotSpeedZ: (Math.random() - 0.5) * 0.03,
          baseY: mesh.position.y,
          floatSpeed: 0.8 + Math.random() * 1.2,
        });
      }

      // Constellation lines between nearby crystals
      const lineMat = new THREE.LineBasicMaterial({
        color: colors.grid,
        transparent: true,
        opacity: 0.2,
      });

      // Background ambient star dust
      const dustCount = 600;
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount * 3; i += 3) {
        dustPos[i] = (Math.random() - 0.5) * 50;
        dustPos[i + 1] = (Math.random() - 0.5) * 40;
        dustPos[i + 2] = (Math.random() - 0.5) * 30;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: colors.particle,
        size: 0.35,
        map: particleTexture,
        transparent: true,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      updateAnimation = (time) => {
        const t = time * speed;
        crystalItems.forEach((item, idx) => {
          item.mesh.rotation.x += item.rotSpeedX;
          item.mesh.rotation.y += item.rotSpeedY;
          item.mesh.rotation.z += item.rotSpeedZ;
          item.mesh.position.y = item.baseY + Math.sin(t * item.floatSpeed + idx) * 0.8;
        });

        crystalsGroup.rotation.y = mouseRef.current.x * 0.3;
        crystalsGroup.rotation.x = mouseRef.current.y * 0.2;

        dust.rotation.y = -t * 0.02;

        camera.position.x = mouseRef.current.x * 2.5;
        camera.position.y = mouseRef.current.y * 1.8;
        camera.lookAt(0, 0, 0);
      };
    }

    // MOUSE TRACKING
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      updateAnimation(elapsedTime);
      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (rendererRef.current && container) {
        container.innerHTML = '';
        rendererRef.current.dispose();
      }
    };
  }, [theme, sceneMode, speed]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
      aria-hidden="true"
    />
  );
};
