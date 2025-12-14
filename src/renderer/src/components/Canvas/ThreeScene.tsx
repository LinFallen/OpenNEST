import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Html, Line } from '@react-three/drei';
import { makeStyles } from '@fluentui/react-components';
import { useAppSelector } from '../../store/hooks';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#1a1a1a'
    }
});

// Custom grid component matching our design spec
function InfiniteGrid() {
    return (
        <Grid
            args={[100, 100]}
            cellSize={0.2}
            cellThickness={0.5}
            cellColor="#2D2D2D"
            sectionSize={1}
            sectionThickness={1}
            sectionColor="#383838"
            fadeDistance={50}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
        />
    );
}

// Coordinate axes at origin
function CoordinateAxes() {
    return (
        <group>
            {/* X-axis (Red) */}
            <Line points={[[0, 0, 0], [5, 0, 0]]} color="#e05e5e" lineWidth={2} />
            {/* Y-axis (Cyan) */}
            <Line points={[[0, 0, 0], [0, 5, 0]]} color="#56b6c2" lineWidth={2} />

            {/* Origin marker */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#007ACC" />
            </mesh>
        </group>
    );
}

// Material sheet boundary (the cutting area)
interface SheetBoundaryProps {
    width?: number;
    height?: number;
}

function SheetBoundary({ width = 24, height = 12 }: SheetBoundaryProps) {
    const points = [
        [-width / 2, -height / 2, 0],
        [width / 2, -height / 2, 0],
        [width / 2, height / 2, 0],
        [-width / 2, height / 2, 0],
        [-width / 2, -height / 2, 0]
    ] as [number, number, number][];

    return (
        <group>
            {/* Sheet rectangle outline */}
            <Line points={points} color="#444" lineWidth={1.5} />

            {/* Semi-transparent sheet plane */}
            <mesh position={[0, 0, -0.01]} rotation={[0, 0, 0]}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial color="#ffffff" opacity={0.02} transparent />
            </mesh>

            {/* Dimension label */}
            <Html position={[-width / 2, height / 2 + 0.5, 0]} center>
                <div
                    style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: '#858585',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none'
                    }}
                >
                    Sheet: {width * 100} x {height * 100} mm
                </div>
            </Html>
        </group>
    );
}

// Render imported parts
function ImportedParts() {
    const parts = useAppSelector((state) => state.project.parts);
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        // Clear existing children
        while (groupRef.current.children.length > 0) {
            groupRef.current.remove(groupRef.current.children[0]);
        }

        // Add all parts
        parts.forEach((part) => {
            const partGroup = new THREE.Group();
            partGroup.position.set(part.position.x, part.position.y, 0);
            partGroup.rotation.z = part.rotation;

            part.objects.forEach((obj) => {
                partGroup.add(obj.clone());
            });

            groupRef.current?.add(partGroup);
        });
    }, [parts]);

    return <group ref={groupRef} />;
}

// Main 3D scene component
export const ThreeScene: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Canvas
                camera={{
                    position: [20, 20, 20],
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} />

                {/* Grid and axes */}
                <InfiniteGrid />
                <CoordinateAxes />
                <SheetBoundary width={24} height={12} />

                {/* Render imported parts */}
                <ImportedParts />

                {/* Camera controls */}
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={5}
                    maxDistance={100}
                    maxPolarAngle={Math.PI / 2.2} // Prevent camera from going too low
                    target={[0, 0, 0]}
                />
            </Canvas>
        </div>
    );
};
