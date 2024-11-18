// src/app/components/three-background.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Background texture
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(
      '/bg.jpg',
      () => handleResize(),
      undefined,
      (error) => console.error('Error loading texture:', error)
    );
    backgroundTexture.minFilter = THREE.LinearFilter;
    backgroundTexture.magFilter = THREE.LinearFilter;
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: backgroundTexture },
        uScale: { value: new THREE.Vector2(1, 1) },
        uOffset: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uScale;
        uniform vec2 uOffset;
        varying vec2 vUv;
        
        void main() {
          vec2 centeredUv = vUv - 0.5;
          centeredUv = centeredUv * uScale;
          
          float slowTime = uTime * 0.01;
          vec2 offset = vec2(
            sin(slowTime) * 0.02,
            cos(slowTime * 0.8) * 0.02
          );
          
          vec2 finalUv = centeredUv + 0.5 + offset;
          gl_FragColor = texture2D(uTexture, finalUv);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const animate = () => {
      if (!material.uniforms) return;
      
      material.uniforms.uTime.value += 1;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    function handleResize() {
      if (!containerRef.current || !backgroundTexture.image) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      renderer.setSize(width, height);
      
      const imageAspect = backgroundTexture.image.width / backgroundTexture.image.height;
      const screenAspect = width / height;
      
      let scaleX = 1;
      let scaleY = 1;
      
      if (screenAspect > imageAspect) {
        scaleX = screenAspect / imageAspect;
      } else {
        scaleY = imageAspect / screenAspect;
      }
      
      const zoomFactor = 0.5;
      material.uniforms.uScale.value.set(scaleX * zoomFactor, scaleY * zoomFactor);
    }

    containerRef.current.appendChild(renderer.domElement);
    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10" />
      <div 
        className="fixed inset-0 pointer-events-none noise-overlay"
        style={{
          maskImage: 'linear-gradient(90deg, rgb(0, 0, 0) 100%, rgba(0, 0, 0, 0) 120%, rgba(255, 255, 255, 0) 120%)',
          WebkitMaskImage: 'linear-gradient(90deg, rgb(0, 0, 0) 100%, rgba(0, 0, 0, 0) 120%, rgba(255, 255, 255, 0) 120%)'
        }}
      />
    </>
  );
}

