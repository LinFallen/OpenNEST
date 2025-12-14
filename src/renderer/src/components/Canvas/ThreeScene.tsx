import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
        backgroundColor: '#1a1a1a',
        // CSS Grid Pattern matching prototype exactly
        backgroundImage: `
      linear-gradient(#2D2D2D 1px, transparent 1px),
      linear-gradient(90deg, #2D2D2D 1px, transparent 1px),
      linear-gradient(#383838 1px, transparent 1px),
      linear-gradient(90deg, #383838 1px, transparent 1px)
    `,
        backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
        backgroundPosition: 'center center'
    },
    canvasOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    }
});

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
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={5}
                        array={new Float32Array(points.flat())}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#444444" />
            </line>

            {/* Semi-transparent sheet plane */}
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial color="#ffffff" opacity={0.02} transparent />
            </mesh>
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

// Import useThree hook
import { useThree } from '@react-three/fiber';

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

                {/* Sheet boundary and parts */}
                <SheetBoundary width={24} height={12} />
                <ImportedParts />

                {/* Camera controls - 2D view */}
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    enableRotate={false}
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
