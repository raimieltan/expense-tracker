'use client';

import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useRef } from 'react';
import { Mesh } from 'three';

const CalculatorModel: React.FC = () => {
    const myModel = useLoader(GLTFLoader, '/assets/calculator.glb');
    const modelRef = useRef<Mesh>(null);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01; // Rotate the model around the Y-axis
        }
    });

    return <primitive object={myModel.scene} ref={modelRef}  scale={[2, 2, 2]} />;
};

export const Calculator3D: React.FC = () => {
    return (
        <Canvas style={{ height: '500px', width: '100%' }}>
         <pointLight position={[-10, -10, -10]} color="#e8eb34" intensity={5000} />
            <pointLight position={[10, 10, 10]} color="#e8eb34" intensity={5000} />
            <directionalLight position={[10, 10, 10]} color="#e8eb34" intensity={5000} />
            <CalculatorModel /> {/* Render the model inside the Canvas */}
        </Canvas>
    );
};
