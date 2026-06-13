import React, { useRef, useEffect, useState, memo } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face3D {
  indices: number[];
  color: string;
  outlineColor: string;
  isGlass?: boolean;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

// Define static 3D Vertices outside the component to prevent allocations on every render
const VERTICES: Point3D[] = [
  // --- Camera Body (Box) ---
  // Back face (Z = 20) index 0-7
  { x: -90, y: -50, z: 25 },  // 0: top-left-back
  { x: 90, y: -50, z: 25 },   // 1: top-right-back
  { x: 90, y: 50, z: 25 },    // 2: bottom-right-back
  { x: -90, y: 50, z: 25 },   // 3: bottom-left-back
  // Front face (Z = -20)
  { x: -90, y: -50, z: -25 }, // 4: top-left-front
  { x: 90, y: -50, z: -25 },  // 5: top-right-front
  { x: 90, y: 50, z: -25 },   // 6: bottom-right-front
  { x: -90, y: 50, z: -25 },  // 7: bottom-left-front

  // --- Top Viewfinder/Prism housing (index 8-11) ---
  { x: -35, y: -50, z: 20 },  // 8: back-left
  { x: 35, y: -50, z: 20 },   // 9: back-right
  { x: -25, y: -68, z: -10 }, // 10: front-left-high
  { x: 25, y: -68, z: -10 },  // 11: front-right-high

  // --- Shutter Button (Cylinder approximation, index 12-15) ---
  { x: -65, y: -55, z: 5 },   // 12
  { x: -50, y: -55, z: 5 },   // 13
  { x: -50, y: -55, z: -10 },  // 14
  { x: -65, y: -55, z: -10 },  // 15

  // --- Mode Dial (Cylinder approximation, index 16-19) ---
  { x: 50, y: -55, z: 15 },   // 16
  { x: 68, y: -55, z: 15 },   // 17
  { x: 68, y: -55, z: -5 },   // 18
  { x: 50, y: -55, z: -5 },   // 19

  // --- Lens Base (Z = -25, index 20-27) ---
  // We represent the cylinder as 8 points around a circle
  { x: 0, y: -38, z: -25 }, // 20
  { x: 27, y: -27, z: -25 }, // 21
  { x: 38, y: 0, z: -25 }, // 22
  { x: 27, y: 27, z: -25 }, // 23
  { x: 0, y: 38, z: -25 }, // 24
  { x: -27, y: 27, z: -25 }, // 25
  { x: -38, y: 0, z: -25 }, // 26
  { x: -27, y: -27, z: -25 }, // 27

  // --- Lens Extrude 1 (Z = -55, index 28-35) ---
  { x: 0, y: -38, z: -55 },  // 28
  { x: 27, y: -27, z: -55 }, // 29
  { x: 38, y: 0, z: -55 },   // 30
  { x: 27, y: 27, z: -55 },  // 31
  { x: 0, y: 38, z: -55 },   // 32
  { x: -27, y: 27, z: -55 }, // 33
  { x: -38, y: 0, z: -55 },  // 34
  { x: -27, y: -27, z: -55 }, // 35

  // --- Lens Tip Element (Z = -70, narrower glass cap, index 36-43) ---
  { x: 0, y: -33, z: -72 },  // 36
  { x: 23, y: -23, z: -72 }, // 37
  { x: 33, y: 0, z: -72 },   // 38
  { x: 23, y: 23, z: -72 },  // 39
  { x: 0, y: 33, z: -72 },   // 40
  { x: -23, y: 23, z: -72 }, // 41
  { x: -33, y: 0, z: -72 },  // 42
  { x: -23, y: -23, z: -72 }, // 43
];

// Faces defined outside the component to prevent allocations on every render
const FACES: Face3D[] = [
  // Camera Body (Main box)
  { indices: [0, 1, 2, 3], color: 'rgba(15, 15, 15, 0.75)', outlineColor: 'rgba(255, 255, 255, 0.1)', isGlass: true }, // Back
  { indices: [4, 5, 6, 7], color: 'rgba(30, 30, 30, 0.65)', outlineColor: 'rgba(255, 255, 255, 0.25)', isGlass: true }, // Front
  { indices: [0, 1, 5, 4], color: 'rgba(12, 12, 12, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.15)', isGlass: true }, // Top
  { indices: [3, 2, 6, 7], color: 'rgba(10, 10, 10, 0.9)', outlineColor: 'rgba(255, 255, 255, 0.1)', isGlass: true },  // Bottom
  { indices: [0, 3, 7, 4], color: 'rgba(20, 20, 20, 0.7)', outlineColor: 'rgba(255, 255, 255, 0.15)', isGlass: true },  // Left
  { indices: [1, 2, 6, 5], color: 'rgba(18, 18, 18, 0.7)', outlineColor: 'rgba(255, 255, 255, 0.15)', isGlass: true },  // Right

  // Top Prism Housing
  { indices: [8, 9, 11, 10], color: 'rgba(40, 40, 40, 0.75)', outlineColor: 'rgba(255, 255, 255, 0.3)' }, // Prism slope
  { indices: [8, 10, 4, 0], color: 'rgba(25, 25, 25, 0.7)', outlineColor: 'rgba(255, 255, 255, 0.15)' },  // prism side L
  { indices: [9, 11, 5, 1], color: 'rgba(25, 25, 25, 0.7)', outlineColor: 'rgba(255, 255, 255, 0.15)' },  // prism side R

  // Shutter Button
  { indices: [12, 13, 14, 15], color: 'rgba(255, 255, 255, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.6)' },

  // Mode Dial
  { indices: [16, 17, 18, 19], color: 'rgba(30, 30, 30, 0.95)', outlineColor: 'rgba(255, 255, 255, 0.25)' },

  // Lens Barrel (Extrusion segmented cylinder)
  { indices: [20, 21, 29, 28], color: 'rgba(25, 25, 25, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [21, 22, 30, 29], color: 'rgba(20, 20, 20, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [22, 23, 31, 30], color: 'rgba(15, 15, 15, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [23, 24, 32, 31], color: 'rgba(18, 18, 18, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [24, 25, 33, 32], color: 'rgba(23, 23, 23, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [25, 26, 34, 33], color: 'rgba(28, 28, 28, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [26, 27, 35, 34], color: 'rgba(30, 30, 30, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },
  { indices: [27, 20, 28, 35], color: 'rgba(28, 28, 28, 0.8)', outlineColor: 'rgba(255, 255, 255, 0.15)' },

  // Lens Tip Section (Transition)
  { indices: [28, 29, 37, 36], color: 'rgba(45, 45, 45, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [29, 30, 38, 37], color: 'rgba(38, 38, 38, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [30, 31, 39, 38], color: 'rgba(32, 32, 32, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [31, 32, 40, 39], color: 'rgba(35, 35, 35, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [32, 33, 41, 40], color: 'rgba(40, 40, 40, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [33, 34, 42, 41], color: 'rgba(45, 45, 45, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [34, 35, 43, 42], color: 'rgba(48, 48, 48, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },
  { indices: [35, 28, 36, 43], color: 'rgba(48, 48, 48, 0.85)', outlineColor: 'rgba(255, 255, 255, 0.2)' },

  // Lens Glass Front Aperture (The glowing core!)
  // 36, 37, 38, 39, 40, 41, 42, 43 define the glass cap poly
  { indices: [36, 37, 38, 39, 40, 41, 42, 43], color: 'rgba(255, 255, 255, 0.05)', outlineColor: 'rgba(255, 255, 255, 0.8)', isGlass: true },
];

function ThreeDCamera() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dimensions, setDimensions] = useState({ width: 450, height: 450 });
  const [mousePos, setMousePos] = useState({ x: 225, y: 225 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Smooth lerped rotations
  const currentRotX = useRef(0.2); // starting showcase pitches (tilt down slightly)
  const currentRotY = useRef(-0.3); // yaw
  const targetRotX = useRef(0.2);
  const targetRotY = useRef(-0.3);

  // Swirling space particles
  const particles = useRef<Particle3D[]>([]);

  // Intersection Observer to suspend animation loop when off-screen (saves resources)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate floating dust swirling in a slow orbits in 3D
  useEffect(() => {
    const results: Particle3D[] = [];
    for (let i = 0; i < 50; i++) {
      // Swirling in cylinder/sphere around engine
      const angle = Math.random() * Math.PI * 2;
      const radius = 110 + Math.random() * 120;
      results.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 180,
        z: Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3 - 0.1, // slight vertical drift
        vz: (Math.random() - 0.5) * 0.4,
        size: 1 + Math.random() * 3.5,
        opacity: 0.15 + Math.random() * 0.6,
      });
    }
    particles.current = results;
  }, []);

  // Sync canvas size according to container
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: width || 450,
          height: height || 450,
        });
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Track mouse coordinates to manipulate rotation targets
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Map coordinates to target rotations (radians) with range boundaries
    // Center point is center of frame
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (x - cx) / cx; // -1 to 1
    const dy = (y - cy) / cy; // -1 to 1

    targetRotY.current = dx * 0.85; // rotate horizontal (yaw)
    targetRotX.current = dy * 0.45; // rotate vertical (pitch) (less vertical to prevent flipping)
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return back slowly to idle showcase tilt
    targetRotX.current = 0.2;
    targetRotY.current = -0.3;
  };

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // 1. Butter-smooth lerp interpolation
      currentRotX.current += (targetRotX.current - currentRotX.current) * 0.08;
      currentRotY.current += (targetRotY.current - currentRotY.current) * 0.08;

      const rotX = currentRotX.current;
      const rotY = currentRotY.current;

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      // Make camera gently float if idle
      const time = Date.now() * 0.001;
      const floatOffsetY = Math.sin(time * 1.5) * 8;
      const idleSpin = Math.sin(time * 0.4) * 0.05 + Math.cos(time * 0.3) * 0.05;

      const finalRotX = rotX;
      const finalRotY = rotY + (isHovered ? 0 : idleSpin);

      // Precalculate trig values
      const cosX = Math.cos(finalRotX);
      const sinX = Math.sin(finalRotX);
      const cosY = Math.cos(finalRotY);
      const sinY = Math.sin(finalRotY);

      // Perspective project config
      const fov = 400; // perspective focal length
      const camZDist = 320; // distance of observer

      // Helper functions for 3D translation & projection
      const projectPoint = (pt: Point3D) => {
        // 3D Rotations matrix calculation
        // 1. Rotate Y (Y-aligned yaw)
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.x * sinY + pt.z * cosY;

        // 2. Rotate X (X-aligned pitch)
        let y2 = pt.y * cosX - z1 * sinX;
        let z2 = pt.y * sinX + z1 * cosX;

        // Add float vertical offset
        const finalY = y2 + floatOffsetY;

        // Perspective Projection calculation
        const scale = fov / (camZDist + z2);
        return {
          px: cx + x1 * scale,
          py: cy + finalY * scale,
          depth: z2, // keep track of depth for face sorting
          scale: scale,
        };
      };

      // Clear with elegant futuristic glass reflection gradient
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw subtle backing glowing particle halo
      const backHalo = ctx.createRadialGradient(cx, cy + floatOffsetY, 20, cx, cy + floatOffsetY, 240);
      backHalo.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
      backHalo.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
      backHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = backHalo;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw subtle holographic target ring behind camera
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy + floatOffsetY, 160 + Math.sin(time) * 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.beginPath();
      ctx.arc(cx, cy + floatOffsetY, 200, 0, Math.PI * 2);
      ctx.stroke();

      // Horizontal virtual baseline lines
      ctx.beginPath();
      ctx.moveTo(cx - 240, cy + 120 + floatOffsetY * 0.5);
      ctx.lineTo(cx + 240, cy + 120 + floatOffsetY * 0.5);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      ctx.stroke();

      // Project all vertices
      const projected = VERTICES.map(v => projectPoint(v));

      // 1. Update particles in-place and draw Back Dust Particles (z2 > 0)
      const pCount = particles.current.length;
      for (let i = 0; i < pCount; i++) {
        const p = particles.current[i];
        
        // Rotate orbit coordinates over time (slowly swirling around core)
        const rad = 0.012; // speed
        const nx = p.x * Math.cos(rad) - p.z * Math.sin(rad);
        const nz = p.x * Math.sin(rad) + p.z * Math.cos(rad);
        
        p.x = nx + p.vx;
        p.y += p.vy;
        p.z = nz + p.vz;
        
        // Wrap around bounds to keep particles close
        if (p.y < -150) p.y = 150;
        if (p.y > 150) p.y = -150;

        const proj = projectPoint(p);
        
        // Render if on-screen and behind center (depth > 0)
        if (proj.px >= 0 && proj.px <= dimensions.width && proj.py >= 0 && proj.py <= dimensions.height) {
          if (proj.depth > 0) {
            const size = p.size * proj.scale * 0.15;
            const opacity = p.opacity * 0.15;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Build and sort depth for Camera Faces
      const facesWithDepth = FACES.map((face, index) => {
        // Calculate average depth of the face vertices
        let depthSum = 0;
        face.indices.forEach((idx) => {
          depthSum += projected[idx].depth;
        });
        const avgDepth = depthSum / face.indices.length;
        return { face, avgDepth, id: index };
      });

      // Sort faces: highest depth values first (drawn in back)
      facesWithDepth.sort((a, b) => b.avgDepth - a.avgDepth);

      // Draw all sorted faces
      const faceCount = facesWithDepth.length;
      for (let index = 0; index < faceCount; index++) {
        const { face, id } = facesWithDepth[index];
        const len = face.indices.length;
        if (len < 3) continue;

        ctx.beginPath();
        const first = projected[face.indices[0]];
        ctx.moveTo(first.px, first.py);

        for (let i = 1; i < len; i++) {
          const p = projected[face.indices[i]];
          ctx.lineTo(p.px, p.py);
        }
        ctx.closePath();

        // Liquid glass / metallic coloring + dynamic light rays
        if (face.isGlass) {
          // Apply dynamic glass reflection gradient based on mouse move
          const gradient = ctx.createLinearGradient(cx - 50 + rotY * 100, cy - 50 + rotX * 50, cx + 150, cy + 150);
          gradient.addColorStop(0, 'rgba(40, 40, 40, 0.45)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
          gradient.addColorStop(0.7, 'rgba(10, 10, 10, 0.85)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
          ctx.fillStyle = gradient;
        } else {
          // solid matte shading
          ctx.fillStyle = face.color;
        }
        ctx.fill();

        // Stroke with subtle illuminated border glows
        let edgeGlow = face.outlineColor;
        if (rotX < 0 && rotY < 0) {
          edgeGlow = 'rgba(255, 255, 255, 0.4)';
        }
        ctx.strokeStyle = edgeGlow;
        ctx.lineWidth = face.isGlass ? 1.5 : 1;
        ctx.stroke();

        // Special Detail: Interactive Lens front glow effect on the main aperture lens!
        // Face ID 14 is the front glass cover
        if (id === 14) {
          // Determine central point of lens front
          let lcx = 0, lcy = 0;
          face.indices.forEach((idx) => {
            lcx += projected[idx].px;
            lcy += projected[idx].py;
          });
          lcx /= face.indices.length;
          lcy /= face.indices.length;

          // Render a real-time reactive glossy lens reflections and neon flare rings
          // Glass glaze ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(lcx, lcy, 22 * projected[36].scale * 0.2, 0, Math.PI * 2);
          ctx.stroke();

          // Liquid blue/white core bloom
          const lensGlow = ctx.createRadialGradient(lcx - 4, lcy - 4, 1, lcx, lcy, 20 * projected[36].scale * 0.23);
          lensGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          lensGlow.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
          lensGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
          lensGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = lensGlow;
          ctx.beginPath();
          ctx.arc(lcx, lcy, 25 * projected[36].scale * 0.23, 0, Math.PI * 2);
          ctx.fill();

          // Diagonal high-gloss glass lens sheen reflection
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(lcx, lcy, 15 * projected[36].scale * 0.2, Math.PI * 1.25, Math.PI * 1.75);
          ctx.stroke();
        }
      }

      // 3. Draw Front Pass Particles (z2 <= 0) - Swirling in front of camera
      for (let i = 0; i < pCount; i++) {
        const p = particles.current[i];
        const proj = projectPoint(p);
        
        // Render if on-screen and closer than center (depth <= 0)
        if (proj.px >= 0 && proj.px <= dimensions.width && proj.py >= 0 && proj.py <= dimensions.height) {
          if (proj.depth <= 0) {
            const size = p.size * proj.scale * 0.25;
            const opacity = p.opacity * 0.75;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 4. Subtle holographic tech overlays mapping camera state (cinematic style)
      ctx.font = '300 9px "JetBrains Mono"';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillText('REC // STBY', cx - 210, cy - 180 + floatOffsetY * 0.2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.fillText('4K UHD 60FPS', cx - 210, cy - 165 + floatOffsetY * 0.2);

      // Battery graphic
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeRect(cx + 170, cy - 173 + floatOffsetY * 0.2, 22, 10);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(cx + 172, cy - 171 + floatOffsetY * 0.2, 14, 6);
      ctx.fillText('94%', cx + 145, cy - 165 + floatOffsetY * 0.2);

      // Interactive crosshair coordinates
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      // center crosshair
      ctx.moveTo(cx - 10, cy + floatOffsetY); ctx.lineTo(cx - 3, cy + floatOffsetY);
      ctx.moveTo(cx + 3, cy + floatOffsetY); ctx.lineTo(cx + 10, cy + floatOffsetY);
      ctx.moveTo(cx, cy - 10 + floatOffsetY); ctx.lineTo(cx, cy - 3 + floatOffsetY);
      ctx.moveTo(cx, cy + 3 + floatOffsetY); ctx.lineTo(cx, cy + 10 + floatOffsetY);
      ctx.stroke();

      // Horizontal calibration readout
      const angXText = `PITCH: ${(rotX * 57.2958).toFixed(1)}°`;
      const angYText = `YAW: ${(rotY * 57.2958).toFixed(1)}°`;
      ctx.fillText(angXText, cx - 35, cy + 195 + floatOffsetY * 0.4);
      ctx.fillText(angYText, cx + 45, cy + 195 + floatOffsetY * 0.4);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [dimensions, isHovered, isVisible]);

  return (
    <div
      id="camera-3d-container"
      ref={containerRef}
      className="relative flex items-center justify-center w-full aspect-square max-w-[450px] mx-auto cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back glow halo behind the actual canvas */}
      <div 
        id="camera-back-halo"
        className="absolute w-[220px] h-[220px] rounded-full blur-[80px] bg-white/10 transition-transform duration-500 pointer-events-none"
        style={{
          transform: `translate(${(mousePos.x - dimensions.width / 2) * 0.1}px, ${(mousePos.y - dimensions.height / 2) * 0.1}px)`,
        }}
      />
      
      {/* The main simulation canvas */}
      <canvas
        id="camera-render-canvas"
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="relative block"
      />

      {/* Floating coordinates indicator (Liquid Glass element label) */}
      <div 
        id="camera-status-pill"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-[10px] tracking-wider rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-white/50 pointer-events-none transition-opacity duration-300"
      >
        INTERACTIVE 3D COMPONENT (DRAG / HOVER)
      </div>
    </div>
  );
}

export default memo(ThreeDCamera);
