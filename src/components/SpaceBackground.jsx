import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Stars, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// --- ADVANCED SHADERS ---

const AccretionDiskShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#ff9900") },
        uInnerRadius: { value: 0.9 },
        uOuterRadius: { value: 4.0 }
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simplex Noise for plasma streaks
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 a0 = x - floor(x + 0.5);
      vec3 g = a0 * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
      return 130.0 * dot(m, g);
    }

    void main() {
      float dist = length(vPosition.xy);
      float angle = atan(vPosition.y, vPosition.x);
      
      // High-frequency noise for streaks
      float noise1 = snoise(vec2(dist * 4.0 - uTime * 0.8, angle * 10.0 + uTime * 0.4));
      float noise2 = snoise(vec2(dist * 1.5 + uTime * 0.2, angle * 20.0 - uTime * 0.6));
      float streaks = smoothstep(0.2, 0.8, noise1 * 0.5 + noise2 * 0.5 + 0.5);
      
      // Brighter inner edge, glowing outer
      float intensity = pow(1.5 / dist, 3.0);
      float falloff = smoothstep(0.85, 1.1, dist) * (1.0 - smoothstep(3.5, 4.0, dist));
      
      // Color gradient from white-hot to orange-red
      vec3 coreColor = vec3(1.0, 0.95, 0.8);
      vec3 outerColor = vec3(1.0, 0.4, 0.1);
      vec3 finalColor = mix(outerColor, coreColor, streaks * (1.2 / dist));
      
      gl_FragColor = vec4(finalColor * intensity, falloff * (streaks * 0.8 + 0.2) * (intensity + 0.5));
    }
  `
};

// --- COMPONENTS ---

function BlackHole() {
    const groupRef = useRef();
    const mainDiskRef = useRef();
    const topLensingRef = useRef();
    const botLensingRef = useRef();
    const shaderRefs = useRef([]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Positioned more to the side/back for cinematic depth
        if (groupRef.current) {
            groupRef.current.position.x = 2.5 + Math.sin(t * 0.15) * 0.5;
            groupRef.current.position.y = 0.5 + Math.cos(t * 0.1) * 0.3;
            groupRef.current.position.z = -8 + Math.sin(t * 0.05) * 1.0;

            // Characteristic tilt
            groupRef.current.rotation.x = Math.PI / 6 + Math.sin(t * 0.08) * 0.05;
            groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
        }

        shaderRefs.current.forEach(shader => {
            if (shader) shader.uniforms.uTime.value = t;
        });

        if (mainDiskRef.current) mainDiskRef.current.rotation.z = -t * 0.15;
        if (topLensingRef.current) topLensingRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.1) * 0.05;
        if (botLensingRef.current) botLensingRef.current.rotation.x = -Math.PI / 2 - Math.sin(t * 0.1) * 0.05;
    });

    return (
        <group ref={groupRef}>
            {/* 1. THE EVENT HORIZON */}
            <Sphere args={[0.9, 64, 64]}>
                <meshBasicMaterial color="#000000" />
            </Sphere>

            {/* 2. THE MAIN ACCRETION DISK (Horizontal) */}
            <mesh ref={mainDiskRef} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.95, 4.0, 128]} />
                <shaderMaterial
                    ref={el => shaderRefs.current[0] = el}
                    args={[AccretionDiskShader]}
                    transparent
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* 3. UPPER GRAVITATIONAL LENSING (The iconic bow over) */}
            <mesh ref={topLensingRef} position={[0, 0, -0.5]}>
                <ringGeometry args={[0.95, 4.0, 128]} />
                <shaderMaterial
                    ref={el => shaderRefs.current[1] = el}
                    args={[AccretionDiskShader]}
                    transparent
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* 4. LOWER GRAVITATIONAL LENSING (The bow under) */}
            <mesh ref={botLensingRef} position={[0, 0, -0.5]}>
                <ringGeometry args={[0.95, 4.0, 128]} />
                <shaderMaterial
                    ref={el => shaderRefs.current[2] = el}
                    args={[AccretionDiskShader]}
                    transparent
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* 5. VOLUMETRIC CORONA & INNER GLOW */}
            <Sphere args={[0.95, 64, 64]}>
                <meshBasicMaterial color="#ff7700" transparent opacity={0.4} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
            </Sphere>

            <pointLight intensity={5} color="#ff9900" distance={20} />
        </group>
    );
}

function StarField(props) {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(10000), { radius: 15 }), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 40;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

function FloatingTechOrb({ color, position, speed, distort }) {
    const orbRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (orbRef.current) {
            orbRef.current.position.y += Math.sin(time * speed) * 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={orbRef} args={[1, 64, 64]} position={position} scale={0.4}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0}
                    transparent={true}
                    opacity={0.3}
                    metalness={1}
                />
            </Sphere>
        </Float>
    );
}

const SpaceBackground = () => {
    return (
        <div className="fixed inset-0 z-0 bg-[#010103]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.15} />

                <StarField />
                <BlackHole />

                {/* Distant AI nodes */}
                <FloatingTechOrb color="#00d8ff" position={[-6, 2, -10]} speed={1} distort={0.4} />
                <FloatingTechOrb color="#8b5cf6" position={[-3, -4, -12]} speed={1.2} distort={0.3} />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Preload all />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />
        </div>
    );
};

export default SpaceBackground;
