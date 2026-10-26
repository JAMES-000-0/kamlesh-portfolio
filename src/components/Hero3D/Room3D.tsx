import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye } from 'lucide-react';
import HeroFallback from './HeroFallback';

interface Room3DProps {
  onExploreClick: () => void;
  onShowroomClick: () => void;
}

export const Room3D: React.FC<Room3DProps> = ({ onExploreClick, onShowroomClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [activeWallpaper, setActiveWallpaper] = useState<number>(0);
  const [blindsAngle, setBlindsAngle] = useState<number>(45); // 0 = closed, 90 = open

  // References to dynamic 3D elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const backWallMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const blindSlatsRef = useRef<THREE.Mesh[]>([]);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Wallpaper texture generator function
  const createWallpaperTexture = (typeIndex: number): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    if (typeIndex === 0) {
      // Champagne Damask
      ctx.fillStyle = '#E8DDD0';
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.strokeStyle = '#B58B3C';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.35;
      for (let y = 0; y < 1024; y += 128) {
        for (let x = 0; x < 1024; x += 128) {
          ctx.beginPath();
          ctx.arc(x + 64, y + 64, 40, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 64, y + 64, 20, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeRect(x + 44, y + 44, 40, 40);
        }
      }
    } else if (typeIndex === 1) {
      // Botanical Foliage
      ctx.fillStyle = '#DDE4DC';
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.fillStyle = '#9FAFA1';
      ctx.globalAlpha = 0.45;
      for (let y = 0; y < 1024; y += 100) {
        for (let x = 0; x < 1024; x += 100) {
          ctx.beginPath();
          ctx.ellipse(x + 50, y + 50, 35, 12, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(x + 50, y + 50, 12, 35, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (typeIndex === 2) {
      // Art Deco Geometric Gold
      ctx.fillStyle = '#2B1B14';
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      for (let y = 0; y < 1024; y += 80) {
        for (let x = 0; x < 1024; x += 80) {
          ctx.beginPath();
          ctx.moveTo(x, y + 40);
          ctx.lineTo(x + 40, y);
          ctx.lineTo(x + 80, y + 40);
          ctx.lineTo(x + 40, y + 80);
          ctx.closePath();
          ctx.stroke();
        }
      }
    } else {
      // Textured Linen
      ctx.fillStyle = '#EFEAE2';
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.strokeStyle = '#D2C4B3';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 1024; i += 6) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1024, i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 3);
    return texture;
  };

  // Wood vinyl flooring texture
  const createWoodFlooringTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#9C6F44'; // Rich warm oak
    ctx.fillRect(0, 0, 1024, 1024);

    const plankHeight = 64;
    for (let y = 0; y < 1024; y += plankHeight) {
      const offset = (y / plankHeight) % 2 === 0 ? 0 : 256;
      for (let x = -256; x < 1024; x += 512) {
        // Plank color variations
        const lightness = (Math.sin(x * 0.05 + y * 0.1) * 15);
        ctx.fillStyle = `rgb(${156 + lightness}, ${111 + lightness * 0.8}, ${68 + lightness * 0.5})`;
        ctx.fillRect(x + offset + 2, y + 2, 508, plankHeight - 4);

        // Wood grain lines
        ctx.strokeStyle = 'rgba(60, 35, 15, 0.18)';
        ctx.lineWidth = 1;
        for (let g = 0; g < 4; g++) {
          ctx.beginPath();
          ctx.moveTo(x + offset, y + 10 + g * 12);
          ctx.bezierCurveTo(
            x + offset + 150, y + 12 + g * 12,
            x + offset + 350, y + 8 + g * 12,
            x + offset + 512, y + 10 + g * 12
          );
          ctx.stroke();
        }
      }
      // Seam line
      ctx.strokeStyle = '#26150B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 4);
    return texture;
  };

  useEffect(() => {
    // Check WebGL availability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#F7F1E7');
    scene.fog = new THREE.FogExp2('#F7F1E7', 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 6.2);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight('#F7EFE3', 1.2);
    scene.add(ambientLight);

    // Sunlight streaming from the window (Right side)
    const sunLight = new THREE.DirectionalLight('#FFF3DA', 3.5);
    sunLight.position.set(7, 6, -1);
    sunLight.target.position.set(-1, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    scene.add(sunLight.target);
    sunLightRef.current = sunLight;

    // Soft architectural interior fill light
    const fillLight = new THREE.PointLight('#FFE7C4', 1.8, 15);
    fillLight.position.set(-3, 3, 2);
    scene.add(fillLight);

    // Standing lamp warm accent light
    const lampLight = new THREE.PointLight('#FFB84D', 2.2, 5);
    lampLight.position.set(-3.2, 2.3, -1.8);
    scene.add(lampLight);

    // 1. FLOOR (Vinyl Wood Planks)
    const floorTexture = createWoodFlooringTexture();
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // 2. BACK WALL (Wallpaper)
    const backWallTexture = createWallpaperTexture(0);
    const backWallMaterial = new THREE.MeshStandardMaterial({
      map: backWallTexture,
      roughness: 0.85,
      metalness: 0.05,
      color: new THREE.Color('#FFFFFF'),
    });
    backWallMaterialRef.current = backWallMaterial;

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 6), backWallMaterial);
    backWall.position.set(0, 3, -4);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // 3. LEFT WALL
    const leftWallMaterial = new THREE.MeshStandardMaterial({
      color: '#E8DED0',
      roughness: 0.9,
    });
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 6), leftWallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-6, 3, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // 4. CEILING
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: '#FAF6EE',
      roughness: 0.95,
    });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    scene.add(ceiling);

    // 5. RIGHT WINDOW WALL (Floor-to-Ceiling Window with Frame, Netlon Screen & Vertical Blinds)
    const windowGroup = new THREE.Group();
    windowGroup.position.set(5.5, 3, -0.5);
    windowGroup.rotation.y = -Math.PI / 2;

    // Window frame (Black architectural aluminum)
    const frameMat = new THREE.MeshStandardMaterial({ color: '#1B1410', roughness: 0.4 });
    const topFrame = new THREE.Mesh(new THREE.BoxGeometry(6, 0.15, 0.15), frameMat);
    topFrame.position.y = 2.85;
    windowGroup.add(topFrame);

    const bottomFrame = new THREE.Mesh(new THREE.BoxGeometry(6, 0.15, 0.15), frameMat);
    bottomFrame.position.y = -2.85;
    windowGroup.add(bottomFrame);

    const leftFrame = new THREE.Mesh(new THREE.BoxGeometry(0.15, 5.8, 0.15), frameMat);
    leftFrame.position.x = -2.92;
    windowGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(new THREE.BoxGeometry(0.15, 5.8, 0.15), frameMat);
    rightFrame.position.x = 2.92;
    windowGroup.add(rightFrame);

    const centerMullion = new THREE.Mesh(new THREE.BoxGeometry(0.12, 5.8, 0.12), frameMat);
    centerMullion.position.x = 0;
    windowGroup.add(centerMullion);

    // Exterior garden daylight backdrop
    const gardenCanvas = document.createElement('canvas');
    gardenCanvas.width = 512;
    gardenCanvas.height = 512;
    const gCtx = gardenCanvas.getContext('2d')!;
    const gGrad = gCtx.createLinearGradient(0, 0, 0, 512);
    gGrad.addColorStop(0, '#CDE3F7');
    gGrad.addColorStop(0.6, '#F8E9C0');
    gGrad.addColorStop(1, '#6E8B58');
    gCtx.fillStyle = gGrad;
    gCtx.fillRect(0, 0, 512, 512);
    const gardenTex = new THREE.CanvasTexture(gardenCanvas);

    const glassPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.8, 5.6),
      new THREE.MeshBasicMaterial({ map: gardenTex, side: THREE.DoubleSide })
    );
    glassPlane.position.z = -0.05;
    windowGroup.add(glassPlane);

    // Netlon Insect Mesh Layer (Subtle fine grid overlay)
    const meshCanvas = document.createElement('canvas');
    meshCanvas.width = 128;
    meshCanvas.height = 128;
    const mCtx = meshCanvas.getContext('2d')!;
    mCtx.fillStyle = 'rgba(0,0,0,0)';
    mCtx.fillRect(0, 0, 128, 128);
    mCtx.strokeStyle = 'rgba(30,30,30,0.18)';
    mCtx.lineWidth = 1;
    for (let i = 0; i < 128; i += 4) {
      mCtx.beginPath();
      mCtx.moveTo(0, i);
      mCtx.lineTo(128, i);
      mCtx.stroke();
      mCtx.beginPath();
      mCtx.moveTo(i, 0);
      mCtx.lineTo(i, 128);
      mCtx.stroke();
    }
    const meshTex = new THREE.CanvasTexture(meshCanvas);
    meshTex.wrapS = THREE.RepeatWrapping;
    meshTex.wrapT = THREE.RepeatWrapping;
    meshTex.repeat.set(30, 30);
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 5.6),
      new THREE.MeshStandardMaterial({
        map: meshTex,
        transparent: true,
        opacity: 0.65,
        roughness: 0.9,
      })
    );
    screenMesh.position.set(-1.4, 0, 0.02);
    windowGroup.add(screenMesh);

    // Vertical Blinds: Slat louvers
    const slats: THREE.Mesh[] = [];
    const slatMat = new THREE.MeshStandardMaterial({
      color: '#F4EEE5',
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const slatCount = 18;
    const slatWidth = 0.28;
    const startX = -2.6;
    const spacing = 5.2 / slatCount;

    for (let i = 0; i < slatCount; i++) {
      const slat = new THREE.Mesh(new THREE.PlaneGeometry(slatWidth, 5.4), slatMat);
      slat.position.set(startX + i * spacing, 0, 0.15);
      slat.rotation.y = (45 * Math.PI) / 180;
      slat.castShadow = true;
      slat.receiveShadow = true;
      windowGroup.add(slat);
      slats.push(slat);
    }
    blindSlatsRef.current = slats;

    // Curtain Rod (Champagne Gold / Brass with Finials)
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#B58B3C',
      roughness: 0.2,
      metalness: 0.85,
    });
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 6.4, 32), brassMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(0, 2.95, 0.35);
    windowGroup.add(rod);

    // Decorative finials at ends
    const finialLeft = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), brassMat);
    finialLeft.position.set(-3.25, 2.95, 0.35);
    windowGroup.add(finialLeft);

    const finialRight = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), brassMat);
    finialRight.position.set(3.25, 2.95, 0.35);
    windowGroup.add(finialRight);

    // Curtains (Luxury gathered fabric on edges)
    const curtainMat = new THREE.MeshStandardMaterial({
      color: '#29170F',
      roughness: 0.8,
      metalness: 0.1,
    });
    const curtainLeft = new THREE.Mesh(new THREE.BoxGeometry(0.55, 5.6, 0.2), curtainMat);
    curtainLeft.position.set(-2.7, 0, 0.32);
    curtainLeft.castShadow = true;
    windowGroup.add(curtainLeft);

    const curtainRight = new THREE.Mesh(new THREE.BoxGeometry(0.55, 5.6, 0.2), curtainMat);
    curtainRight.position.set(2.7, 0, 0.32);
    curtainRight.castShadow = true;
    windowGroup.add(curtainRight);

    scene.add(windowGroup);

    // 6. LUXURY CREAM SOFA
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(-0.2, 0, -1.8);

    const creamFabricMat = new THREE.MeshStandardMaterial({
      color: '#F4ECE1',
      roughness: 0.85,
      metalness: 0.02,
    });

    const woodLegMat = new THREE.MeshStandardMaterial({
      color: '#321D12',
      roughness: 0.4,
    });

    // Sofa Base
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.38, 1.4), creamFabricMat);
    sofaBase.position.y = 0.45;
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    sofaGroup.add(sofaBase);

    // Sofa Backrest
    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.9, 0.35), creamFabricMat);
    sofaBack.position.set(0, 0.95, -0.52);
    sofaBack.castShadow = true;
    sofaBack.receiveShadow = true;
    sofaGroup.add(sofaBack);

    // Seat Cushions (3 cushions)
    for (let c = -1; c <= 1; c++) {
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.22, 1.15), creamFabricMat);
      cushion.position.set(c * 1.16, 0.72, 0.08);
      cushion.castShadow = true;
      cushion.receiveShadow = true;
      sofaGroup.add(cushion);

      // Back cushions
      const backCushion = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.2), creamFabricMat);
      backCushion.position.set(c * 1.16, 1.05, -0.32);
      backCushion.rotation.x = -0.12;
      backCushion.castShadow = true;
      sofaGroup.add(backCushion);
    }

    // Armrests
    const armrestLeft = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.75, 1.45), creamFabricMat);
    armrestLeft.position.set(-1.85, 0.7, 0);
    armrestLeft.castShadow = true;
    sofaGroup.add(armrestLeft);

    const armrestRight = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.75, 1.45), creamFabricMat);
    armrestRight.position.set(1.85, 0.7, 0);
    armrestRight.castShadow = true;
    sofaGroup.add(armrestRight);

    // Accent throw pillows (in rich espresso and gold)
    const pillowMatGold = new THREE.MeshStandardMaterial({ color: '#B58B3C', roughness: 0.6 });
    const pillowMatEspresso = new THREE.MeshStandardMaterial({ color: '#382117', roughness: 0.7 });

    const pillowLeft = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.15), pillowMatGold);
    pillowLeft.position.set(-1.45, 0.95, -0.15);
    pillowLeft.rotation.set(0.1, 0.2, -0.15);
    sofaGroup.add(pillowLeft);

    const pillowRight = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.15), pillowMatEspresso);
    pillowRight.position.set(1.45, 0.95, -0.15);
    pillowRight.rotation.set(0.1, -0.2, 0.15);
    sofaGroup.add(pillowRight);

    // Sofa legs (Brass tipped)
    const legPositions = [
      [-1.7, 0.13, 0.6],
      [1.7, 0.13, 0.6],
      [-1.7, 0.13, -0.6],
      [1.7, 0.13, -0.6],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.26, 16), woodLegMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      sofaGroup.add(leg);
    });

    scene.add(sofaGroup);

    // 7. COFFEE TABLE (Espresso timber with champagne gold trim)
    const tableGroup = new THREE.Group();
    tableGroup.position.set(-0.2, 0, 0.3);

    const tableTopMat = new THREE.MeshStandardMaterial({
      color: '#24140D',
      roughness: 0.25,
      metalness: 0.1,
    });
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 1.1), tableTopMat);
    tableTop.position.y = 0.48;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Table legs
    const tLegPositions = [
      [-0.95, 0.24, 0.45],
      [0.95, 0.24, 0.45],
      [-0.95, 0.24, -0.45],
      [0.95, 0.24, -0.45],
    ];
    tLegPositions.forEach(([x, y, z]) => {
      const tLeg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.48, 0.06), brassMat);
      tLeg.position.set(x, y, z);
      tLeg.castShadow = true;
      tableGroup.add(tLeg);
    });

    // Tabletop decorative accessories (Architectural catalog & gold vase)
    const bookMat = new THREE.MeshStandardMaterial({ color: '#FAF7F0', roughness: 0.8 });
    const book = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.3), bookMat);
    book.position.set(-0.35, 0.54, 0.05);
    book.rotation.y = 0.2;
    tableGroup.add(book);

    const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.28, 24), brassMat);
    vase.position.set(0.35, 0.65, -0.05);
    vase.castShadow = true;
    tableGroup.add(vase);

    scene.add(tableGroup);

    // 8. FLOOR LAMP (Left corner)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-3.2, 0, -1.8);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32), brassMat);
    lampBase.position.y = 0.025;
    lampGroup.add(lampBase);

    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.2, 16), brassMat);
    lampStem.position.y = 1.1;
    lampGroup.add(lampStem);

    const lampShadeMat = new THREE.MeshStandardMaterial({
      color: '#FFF2DB',
      roughness: 0.7,
      emissive: '#FFDA9E',
      emissiveIntensity: 0.5,
    });
    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.34, 0.45, 32, 1, true), lampShadeMat);
    lampShade.position.y = 2.15;
    lampGroup.add(lampShade);

    scene.add(lampGroup);

    // MOUSE PARALLAX & ANIMATION LOOP
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 1.6;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.2;
      mouseY = -y * 0.6;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width - 0.5;
        const y = (touch.clientY - rect.top) / rect.height - 0.5;
        mouseX = x * 0.8;
        mouseY = -y * 0.4;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetCameraX = mouseX;
      targetCameraY = 1.6 + mouseY;
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(-0.1, 1.2, -0.8);

      // Subtle atmospheric breathing in sunlight
      if (sunLightRef.current) {
        sunLightRef.current.intensity = 3.4 + Math.sin(elapsedTime * 0.8) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // UPDATE WALLPAPER TEXTURE DYNAMICALLY
  const handleWallpaperChange = (index: number) => {
    setActiveWallpaper(index);
    if (backWallMaterialRef.current) {
      const newTex = createWallpaperTexture(index);
      backWallMaterialRef.current.map = newTex;
      backWallMaterialRef.current.needsUpdate = true;
    }
  };

  // UPDATE BLINDS SLATS DYNAMICALLY
  const handleBlindsChange = (angle: number) => {
    setBlindsAngle(angle);
    const rad = (angle * Math.PI) / 180;
    blindSlatsRef.current.forEach((slat) => {
      slat.rotation.y = rad;
    });
    // Adjust sunlight intensity based on blinds closure
    if (sunLightRef.current) {
      const openRatio = Math.sin(rad);
      sunLightRef.current.intensity = 1.0 + Math.abs(openRatio) * 2.5;
    }
  };

  if (!webglSupported) {
    return <HeroFallback onExploreClick={onExploreClick} onShowroomClick={onShowroomClick} />;
  }

  const wallpaperOptions = [
    { name: 'Champagne Damask', hex: '#D4AF37' },
    { name: 'Botanical Foliage', hex: '#9FAFA1' },
    { name: 'Art Deco Gold', hex: '#2B1B14' },
    { name: 'Textured Linen', hex: '#D2C4B3' },
  ];

  return (
    <div className="relative w-full h-[90vh] md:h-[95vh] min-h-[640px] max-h-[1050px] overflow-hidden bg-[#F7F1E7]">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Vignette & Gradient Overlays for Readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#29170F]/75 via-[#29170F]/45 to-transparent w-full md:w-3/5" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[#F7F1E7] to-transparent" />

      {/* Hero Headline & Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-xl text-white">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B58B3C]/25 border border-[#B58B3C]/40 backdrop-blur-md mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#B58B3C] animate-pulse" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-[#F7F1E7]">
              Salem's Premier Interior Destination
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] text-white tracking-tight drop-shadow-md mb-5">
            Transform Your Space.<br />
            <span className="italic font-light text-[#E7D9C5]">Elevate Your Living.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#F7F1E7]/90 font-light leading-relaxed mb-8 max-w-lg drop-shadow">
            Discover thoughtfully selected wallpapers, elegant window furnishings, Netlon insect screens, and premium vinyl flooring that bring your dream interiors to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white font-medium text-sm md:text-base tracking-wide transition-all duration-300 shadow-lg shadow-[#B58B3C]/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Our Collection
            </button>
            <button
              onClick={onShowroomClick}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F1E7] border border-white/30 backdrop-blur-md font-medium text-sm md:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5"
            >
              Visit Our Showroom
            </button>
          </div>
        </div>
      </div>

      {/* Interactive 3D Room Customizer Controls (Floating Luxury Pill) */}
      <div className="absolute right-4 md:right-10 bottom-8 z-20">
        <div className="glass-card-dark rounded-2xl p-4 md:p-5 shadow-2xl text-white max-w-xs border border-[#B58B3C]/40">
          <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-[#B58B3C]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B58B3C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E7D9C5]">
                3D Room Studio
              </span>
            </div>
            <span className="text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded">
              Interactive
            </span>
          </div>

          {/* Wallpaper Texture Switcher */}
          <div className="mb-3">
            <label className="text-[11px] uppercase tracking-wider text-white/70 block mb-1.5">
              Wallpaper Style
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {wallpaperOptions.map((opt, i) => (
                <button
                  key={opt.name}
                  onClick={() => handleWallpaperChange(i)}
                  title={opt.name}
                  className={`h-7 rounded-md border text-[10px] font-medium transition-all ${
                    activeWallpaper === i
                      ? 'border-[#B58B3C] ring-2 ring-[#B58B3C]/50 scale-105 shadow'
                      : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: opt.hex }}
                />
              ))}
            </div>
          </div>

          {/* Vertical Blinds Control */}
          <div>
            <div className="flex justify-between items-center text-[11px] uppercase tracking-wider text-white/70 mb-1">
              <span>Vertical Blinds Slat Angle</span>
              <span className="text-[#B58B3C] font-mono">{blindsAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="5"
              value={blindsAngle}
              onChange={(e) => handleBlindsChange(Number(e.target.value))}
              className="w-full accent-[#B58B3C] h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/50 mt-1">
              <span>Closed (Privacy)</span>
              <span>Open (Sunlight)</span>
            </div>
          </div>

          <p className="text-[10px] text-[#E7D9C5]/60 mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-[#B58B3C]" />
            Move cursor to explore 3D room perspective
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 flex flex-col items-center gap-1 text-[#29170F]/70 pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest font-medium text-[#29170F]/75">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#B58B3C] flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#B58B3C] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Room3D;
