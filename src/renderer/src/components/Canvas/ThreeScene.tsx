import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Html, Line } from '@react-three/drei';
import { makeStyles } from '@fluentui/react-components';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useEffect, useRef, useState } from 'react';
import { selectPart, updatePartPosition } from '../../store/slices/projectSlice';
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
            args={[50, 50]}
            cellSize={1}
            cellThickness={0.8}
            cellColor="#3E3E42"
            sectionSize={5}
            sectionThickness={1.5}
            sectionColor="#6E7681"
            fadeDistance={100}
            fadeStrength={0.5}
            followCamera={false}
            infiniteGrid={true}
        />
    );
}

// Coordinate axes at origin
function CoordinateAxes() {
    return (
        <group>
            {/* X-axis (Red) - extended */}
            <Line points={[[0, 0, 0], [15, 0, 0]]} color="#e05e5e" lineWidth={2} />
            <Line points={[[0, 0, 0], [-15, 0, 0]]} color="#e05e5e" lineWidth={2} />

            {/* Y-axis (Cyan) - extended */}
            <Line points={[[0, 0, 0], [0, 15, 0]]} color="#56b6c2" lineWidth={2} />
            <Line points={[[0, 0, 0], [0, -15, 0]]} color="#56b6c2" lineWidth={2} />

            {/* Origin marker */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="#007ACC" />
            </mesh>

            {/* Coordinate labels */}
            <Html position={[16, 0, 0]} center>
                <div style={{ color: '#e05e5e', fontSize: '12px', fontWeight: 'bold' }}>X</div>
            </Html>
            <Html position={[0, 16, 0]} center>
                <div style={{ color: '#56b6c2', fontSize: '12px', fontWeight: 'bold' }}>Y</div>
            </Html>

            {/* Scale markers every 5 units */}
            {[-10, -5, 5, 10].map((x) => (
                <Html key={`x${x}`} position={[x, -0.5, 0]} center>
                    <div style={{ color: '#6E7681', fontSize: '10px' }}>{x * 100}</div>
                </Html>
            ))}
            {[-10, -5, 5, 10].map((y) => (
                <Html key={`y${y}`} position={[-0.5, y, 0]} center>
                    <div style={{ color: '#6E7681', fontSize: '10px' }}>{y * 100}</div>
                </Html>
            ))}
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

// Interactive part component
interface InteractivePartProps {
    partId: string;
    objects: THREE.Object3D[];
    position: { x: number; y: number };
    rotation: number;
    selected: boolean;
}

function InteractivePart({ partId, objects, position, rotation, selected }: InteractivePartProps) {
    const groupRef = useRef<THREE.Group>(null);
    const dispatch = useAppDispatch();
    const { camera, gl } = useThree();
    const [isDragging, setIsDragging] = useState(false);
    const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
    const intersection = useRef(new THREE.Vector3());

    useEffect(() => {
        if (!groupRef.current) return;

        // Clear and add objects
        while (groupRef.current.children.length > 0) {
            groupRef.current.remove(groupRef.current.children[0]);
        }

        objects.forEach((obj) => {
            const clonedObj = obj.clone();
            // Change color if selected
            if (clonedObj instanceof THREE.Line) {
                const material = clonedObj.material as THREE.LineBasicMaterial;
                material.color.setHex(selected ? 0x007acc : 0xe0e0e0);
                material.linewidth = selected ? 2 : 1;
            }
            groupRef.current?.add(clonedObj);
        });
    }, [objects, selected]);

    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        dispatch(selectPart(partId));
        setIsDragging(true);
        (gl.domElement as any).style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: any) => {
        if (!isDragging || !groupRef.current) return;
        e.stopPropagation();

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (e.clientX / gl.domElement.clientWidth) * 2 - 1,
            -(e.clientY / gl.domElement.clientHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(dragPlane.current, intersection.current);

        const newX = intersection.current.x;
        const newY = intersection.current.y;

        dispatch(updatePartPosition({ id: partId, x: newX, y: newY }));
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        (gl.domElement as any).style.cursor = 'auto';
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove as any);
            window.addEventListener('pointerup', handlePointerUp);
            return () => {
                window.removeEventListener('pointermove', handlePointerMove as any);
                window.removeEventListener('pointerup', handlePointerUp);
            };
        }
        return undefined;
    }, [isDragging]);

    return (
        <group
            ref={groupRef}
            position={[position.x, position.y, 0]}
            rotation={[0, 0, rotation]}
            onPointerDown={handlePointerDown}
        >
            {/* Invisible hit box for easier clicking */}
            <mesh visible={false}>
                <boxGeometry args={[2, 2, 0.1]} />
                <meshBasicMaterial />
            </mesh>

            {/* Selection indicator */}
            {selected && (
                <mesh position={[0, 0, -0.02]}>
                    <boxGeometry args={[2.2, 2.2, 0.01]} />
                    <meshBasicMaterial color="#007ACC" opacity={0.1} transparent />
                </mesh>
            )}
        </group>
    );
}

// Render imported parts
function ImportedParts() {
    const parts = useAppSelector((state) => state.project.parts);

    return (
        <group>
            {parts.map((part) => (
                <InteractivePart
                    key={part.id}
                    partId={part.id}
                    objects={part.objects}
                    position={part.position}
                    rotation={part.rotation}
                    selected={part.selected}
                />
            ))}
        </group>
    );
}

// Main 3D scene component
export const ThreeScene: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Canvas
                orthographic
                camera={{
                    position: [0, 0, 50],
                    zoom: 20,
                    near: 0.1,
                    far: 1000
                }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 0, 10]} intensity={0.5} />

                {/* Grid and axes */}
                <InfiniteGrid />
                <CoordinateAxes />
                <SheetBoundary width={24} height={12} />

                {/* Render imported parts */}
                <ImportedParts />

                {/* Camera controls - 2D view */}
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    enableRotate={false} // Disable rotation for 2D view
                    enablePan={true}
                    zoomSpeed={0.5}
                    panSpeed={0.5}
                    mouseButtons={{
                        LEFT: THREE.MOUSE.PAN,
                        MIDDLE: THREE.MOUSE.DOLLY,
                        RIGHT: THREE.MOUSE.PAN
                    }}
                />
            </Canvas>
        </div>
    );
};
