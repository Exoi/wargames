"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function HeroGrid() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!host || reduceMotion || !hasWebGL()) {
      setFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, host.clientWidth / host.clientHeight, 0.1, 1000);
    camera.position.set(0, 34, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const grid = new THREE.GridHelper(110, 44, 0x990000, 0x141419);
    grid.position.y = -8;
    group.add(grid);

    for (let i = -44; i <= 44; i += 11) {
      const material = new THREE.LineBasicMaterial({ color: 0xcc0000, transparent: true, opacity: 0.28 });
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, -7.9, -55),
        new THREE.Vector3(i, -7.9, 55),
      ]);
      group.add(new THREE.Line(geometry, material));
    }

    scene.add(group);
    scene.fog = new THREE.Fog(0x050505, 46, 95);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.0009;
      group.position.z = Math.sin(Date.now() * 0.00022) * 2;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {fallback ? (
        <div className="h-full w-full bg-[linear-gradient(rgba(153,0,0,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(153,0,0,0.18)_1px,transparent_1px)] bg-[size:52px_52px] opacity-60" />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.2)_42%,rgba(5,5,5,0.86)_100%)]" />
    </div>
  );
}
