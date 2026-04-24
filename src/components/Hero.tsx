import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiArrowDown, FiGithub, FiLinkedin, FiFacebook } from 'react-icons/fi';

function Icosahedron3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Icosahedron geometry
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVerts: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ];
    // Normalize to unit sphere
    const len = Math.sqrt(1 + phi * phi);
    const verts = rawVerts.map(([x, y, z]) => [x / len, y / len, z / len] as [number, number, number]);

    const edges: [number, number][] = [
      [0,1],[0,5],[0,7],[0,10],[0,11],
      [1,5],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,6],[2,10],[2,11],
      [3,4],[3,6],[3,8],[3,9],
      [4,5],[4,9],[4,11],
      [5,9],[5,11],
      [6,7],[6,8],[6,10],
      [7,8],[7,10],
      [8,9],
      [10,11],
    ];

    const faces: [number, number, number][] = [
      [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
      [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
      [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
      [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
    ];

    // Orbiting ring particles
    const ringCount = 50;
    const ringParticles: { angle: number; radius: number; speed: number; size: number; tiltX: number; tiltZ: number; colorIdx: number }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < ringCount; i++) {
        ringParticles.push({
          angle: (i / ringCount) * Math.PI * 2 + r * 1.2,
          radius: 1.6 + r * 0.3,
          speed: 0.3 + r * 0.1,
          size: 1.2 - r * 0.2,
          tiltX: 60 + r * 30,
          tiltZ: r * 25,
          colorIdx: r,
        });
      }
    }

    // Floating ambient particles
    const ambientParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      vz: (Math.random() - 0.5) * 0.002,
      size: Math.random() * 1.5 + 0.5,
      colorIdx: Math.floor(Math.random() * 3),
    }));

    // Rotation helpers
    const rotateX = (p: [number, number, number], a: number): [number, number, number] => {
      const c = Math.cos(a), s = Math.sin(a);
      return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
    };
    const rotateY = (p: [number, number, number], a: number): [number, number, number] => {
      const c = Math.cos(a), s = Math.sin(a);
      return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
    };
    const rotateZ = (p: [number, number, number], a: number): [number, number, number] => {
      const c = Math.cos(a), s = Math.sin(a);
      return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
    };

    const project = (p: [number, number, number], scale: number, cx: number, cy: number) => {
      const fov = 4;
      const z = p[2] + fov;
      const f = fov / Math.max(z, 0.1);
      return [cx + p[0] * scale * f, cy - p[1] * scale * f, p[2]];
    };

    const colors = {
      purple: { r: 124, g: 58, b: 237 },
      cyan: { r: 6, g: 182, b: 212 },
      pink: { r: 236, g: 72, b: 153 },
    };
    const colorArr = [colors.purple, colors.cyan, colors.pink];

    const rgba = (c: { r: number; g: number; b: number }, a: number) =>
      `rgba(${c.r},${c.g},${c.b},${a})`;

    let time = 0;

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.28;

      // --- Ambient particles ---
      ambientParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (Math.abs(p.x) > 1.5) p.vx *= -1;
        if (Math.abs(p.y) > 1.5) p.vy *= -1;
        if (Math.abs(p.z) > 1.5) p.vz *= -1;
        const rp = rotateY(rotateX([p.x, p.y, p.z], time * 0.1), time * 0.15);
        const [sx, sy] = project(rp, scale * 0.9, cx, cy);
        const c = colorArr[p.colorIdx];
        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, 0.15);
        ctx.fill();
      });

      // --- Central glow ---
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.6);
      glowGrad.addColorStop(0, 'rgba(124,58,237,0.12)');
      glowGrad.addColorStop(0.3, 'rgba(6,182,212,0.06)');
      glowGrad.addColorStop(0.6, 'rgba(236,72,153,0.03)');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // --- Transform icosahedron vertices ---
      const transformed = verts.map((v) => {
        let p: [number, number, number] = [...v];
        p = rotateX(p, time * 0.4);
        p = rotateY(p, time * 0.6);
        p = rotateZ(p, time * 0.15);
        return p;
      });

      const projected = transformed.map((p) => project(p, scale, cx, cy));

      // --- Draw semi-transparent faces (depth-sorted) ---
      const faceData = faces.map((face) => {
        const avgZ = (transformed[face[0]][2] + transformed[face[1]][2] + transformed[face[2]][2]) / 3;
        return { face, avgZ };
      });
      faceData.sort((a, b) => a.avgZ - b.avgZ);

      faceData.forEach(({ face, avgZ }) => {
        const depthFactor = (avgZ + 1) / 2; // 0..1
        const alpha = 0.02 + depthFactor * 0.06;
        const cIdx = Math.abs(face[0]) % 3;
        ctx.beginPath();
        ctx.moveTo(projected[face[0]][0], projected[face[0]][1]);
        ctx.lineTo(projected[face[1]][0], projected[face[1]][1]);
        ctx.lineTo(projected[face[2]][0], projected[face[2]][1]);
        ctx.closePath();
        ctx.fillStyle = rgba(colorArr[cIdx], alpha);
        ctx.fill();
      });

      // --- Draw edges with gradient glow ---
      edges.forEach(([a, b], idx) => {
        const [x1, y1, z1] = projected[a];
        const [x2, y2, z2] = projected[b];
        const avgZ = (z1 + z2) / 2;
        const depthAlpha = 0.15 + ((avgZ + 1) / 2) * 0.55;

        const cIdx = idx % 3;
        const c = colorArr[cIdx];

        // Glow layer
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = rgba(c, depthAlpha * 0.4);
        ctx.lineWidth = 4;
        ctx.stroke();

        // Core line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = rgba(c, depthAlpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // --- Draw vertex dots ---
      projected.forEach(([x, y, z], i) => {
        const depthAlpha = 0.4 + ((z + 1) / 2) * 0.6;
        const dotSize = 2 + ((z + 1) / 2) * 2;
        const c = colorArr[i % 3];

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, dotSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, depthAlpha * 0.2);
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, depthAlpha);
        ctx.fill();
      });

      // --- Inner glowing core sphere ---
      const coreSize = 12 + Math.sin(time * 2) * 3;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 2);
      coreGrad.addColorStop(0, 'rgba(124,58,237,0.8)');
      coreGrad.addColorStop(0.3, 'rgba(6,182,212,0.5)');
      coreGrad.addColorStop(0.6, 'rgba(236,72,153,0.2)');
      coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Core solid center
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 0.5, 0, Math.PI * 2);
      const coreCenterGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 0.5);
      coreCenterGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
      coreCenterGrad.addColorStop(0.5, 'rgba(124,58,237,0.7)');
      coreCenterGrad.addColorStop(1, 'rgba(6,182,212,0.5)');
      ctx.fillStyle = coreCenterGrad;
      ctx.fill();

      // --- Orbiting ring particles ---
      ringParticles.forEach((rp) => {
        const a = rp.angle + time * rp.speed;
        let p: [number, number, number] = [
          Math.cos(a) * rp.radius,
          Math.sin(a) * rp.radius,
          0,
        ];
        p = rotateX(p, (rp.tiltX * Math.PI) / 180);
        p = rotateZ(p, (rp.tiltZ * Math.PI) / 180 + time * 0.2);

        const [sx, sy, sz] = project(p, scale, cx, cy);
        const depthAlpha = 0.2 + ((sz + 2) / 4) * 0.6;
        const c = colorArr[rp.colorIdx];

        ctx.beginPath();
        ctx.arc(sx, sy, rp.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, depthAlpha * 0.6);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

function Geometric3D() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px]">
      <Icosahedron3D />
    </div>
  );
}

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center overflow-hidden ${
        isDark ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-purple-600/10' : 'bg-purple-300/20'
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-cyan-600/10' : 'bg-cyan-300/20'
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-pink-600/5' : 'bg-pink-300/15'
          }`}
        />
      </div>

      {/* Animated grid background */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.02]'}`}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${isDark ? '#7c3aed' : '#9333ea'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#7c3aed' : '#9333ea'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-sm md:text-base font-medium tracking-widest uppercase mb-4 ${
                isDark ? 'text-cyan-400' : 'text-cyan-600'
              }`}
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Usama Ben Mahmud</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Mathematics Major • Web Developer • Management Trainee at YSSE • Co-Founder of Assaraab
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="px-8 py-3 text-white font-semibold rounded-xl gradient-bg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </a>
              <a
                href="#about"
                className={`px-8 py-3 font-semibold rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'border-purple-500/30 text-purple-300 hover:border-purple-400 hover:bg-purple-500/10'
                    : 'border-purple-300 text-purple-600 hover:border-purple-500 hover:bg-purple-50'
                }`}
              >
                About Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              {[
                { icon: FiGithub, href: 'https://github.com/UsamaBenMahmud', label: 'GitHub' },
                { icon: FiLinkedin, href: 'https://www.linkedin.com/in/usama-ben-mahmud/', label: 'LinkedIn' },
                { icon: FiFacebook, href: 'https://www.facebook.com/usamabenmahmud5', label: 'Facebook' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl transition-colors ${
                    isDark
                      ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      : 'bg-purple-50 text-gray-500 hover:text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Geometric Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <Geometric3D />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex flex-col items-center gap-2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <FiArrowDown size={16} />
          </motion.a>
        </motion.div>
      </div>

      {/* Icosahedron animations handled via Canvas requestAnimationFrame */}

    </section>
  );
}
