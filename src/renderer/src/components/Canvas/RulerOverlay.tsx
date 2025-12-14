import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10
    },
    horizontalRuler: {
        position: 'absolute',
        top: 0,
        left: '40px',
        right: 0,
        height: '30px',
        backgroundColor: '#252526',
        borderBottom: '1px solid #3E3E42',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden'
    },
    verticalRuler: {
        position: 'absolute',
        top: '30px',
        left: 0,
        bottom: 0,
        width: '40px',
        backgroundColor: '#252526',
        borderRight: '1px solid #3E3E42',
        overflow: 'hidden'
    },
    rulerContent: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    tick: {
        position: 'absolute',
        backgroundColor: '#3E3E42'
    },
    majorTick: {
        height: '12px',
        width: '1px'
    },
    minorTick: {
        height: '6px',
        width: '1px'
    },
    label: {
        position: 'absolute',
        fontSize: '10px',
        color: '#858585',
        fontFamily: 'JetBrains Mono, monospace',
        whiteSpace: 'nowrap'
    }
});

interface RulerOverlayProps {
    zoom?: number;
    panX?: number;
    panY?: number;
}

export const RulerOverlay: React.FC<RulerOverlayProps> = ({
    zoom = 20,
    panX = 0,
    panY = 0
}) => {
    const styles = useStyles();

    // Generate tick marks for horizontal ruler
    const generateHorizontalTicks = (): React.ReactElement[] => {
        const ticks: React.ReactElement[] = [];
        const pixelsPerUnit = zoom; // pixels per decimeter
        const viewportWidth = window.innerWidth;

        // Major ticks every 5 decimeters (500mm)
        for (let i = -50; i <= 50; i++) {
            const x = (i * 5 * pixelsPerUnit) + viewportWidth / 2 + panX;
            if (x >= 0 && x <= viewportWidth) {
                ticks.push(
                    <div key={`h-major-${i}`}>
                        <div
                            className={`${styles.tick} ${styles.majorTick}`}
                            style={{ left: `${x}px`, bottom: 0 }}
                        />
                        <div
                            className={styles.label}
                            style={{ left: `${x + 2}px`, bottom: '14px' }}
                        >
                            {i * 500}
                        </div>
                    </div>
                );
            }

            // Minor ticks every decimeter (100mm)
            for (let j = 1; j < 5; j++) {
                const minorX = ((i * 5 + j) * pixelsPerUnit) + viewportWidth / 2 + panX;
                if (minorX >= 0 && minorX <= viewportWidth) {
                    ticks.push(
                        <div
                            key={`h-minor-${i}-${j}`}
                            className={`${styles.tick} ${styles.minorTick}`}
                            style={{ left: `${minorX}px`, bottom: 0 }}
                        />
                    );
                }
            }
        }
        return ticks;
    };

    // Generate tick marks for vertical ruler
    const generateVerticalTicks = (): React.ReactElement[] => {
        const ticks: React.ReactElement[] = [];
        const pixelsPerUnit = zoom;
        const viewportHeight = window.innerHeight;

        // Major ticks every 5 decimeters (500mm)
        for (let i = -50; i <= 50; i++) {
            const y = (i * 5 * pixelsPerUnit) + viewportHeight / 2 - panY;
            if (y >= 30 && y <= viewportHeight) {
                ticks.push(
                    <div key={`v-major-${i}`}>
                        <div
                            className={`${styles.tick} ${styles.majorTick}`}
                            style={{
                                top: `${y}px`,
                                right: 0,
                                width: '12px',
                                height: '1px'
                            }}
                        />
                        <div
                            className={styles.label}
                            style={{
                                top: `${y - 8}px`,
                                right: '14px',
                                transform: 'rotate(-90deg)',
                                transformOrigin: 'right center'
                            }}
                        >
                            {-i * 500}
                        </div>
                    </div>
                );
            }

            // Minor ticks
            for (let j = 1; j < 5; j++) {
                const minorY = ((i * 5 + j) * pixelsPerUnit) + viewportHeight / 2 - panY;
                if (minorY >= 30 && minorY <= viewportHeight) {
                    ticks.push(
                        <div
                            key={`v-minor-${i}-${j}`}
                            className={`${styles.tick} ${styles.minorTick}`}
                            style={{
                                top: `${minorY}px`,
                                right: 0,
                                width: '6px',
                                height: '1px'
                            }}
                        />
                    );
                }
            }
        }
        return ticks;
    };

    return (
        <div className={styles.container}>
            {/* Horizontal Ruler (Top) */}
            <div className={styles.horizontalRuler}>
                <div className={styles.rulerContent}>
                    {generateHorizontalTicks()}
                </div>
            </div>

            {/* Vertical Ruler (Left) */}
            <div className={styles.verticalRuler}>
                <div className={styles.rulerContent}>
                    {generateVerticalTicks()}
                </div>
            </div>

            {/* Corner piece */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '30px',
                    backgroundColor: '#252526',
                    borderRight: '1px solid #3E3E42',
                    borderBottom: '1px solid #3E3E42'
                }}
            />
        </div>
    );
};
