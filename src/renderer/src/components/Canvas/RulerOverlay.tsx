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
        const pixelsPerUnit = zoom;
        const viewportWidth = window.innerWidth - 40;

        const worldLeft = panX - viewportWidth / 2 / pixelsPerUnit;
        const worldRight = panX + viewportWidth / 2 / pixelsPerUnit;

        const startTick = Math.floor(worldLeft / 5) * 5;
        const endTick = Math.ceil(worldRight / 5) * 5;

        for (let i = startTick; i <= endTick; i++) {
            const worldX = i * 5;
            const screenX = (worldX - panX) * pixelsPerUnit + viewportWidth / 2 + 40;

            if (screenX >= 40 && screenX <= viewportWidth + 40) {
                ticks.push(
                    <div key={`h-major-${i}`}>
                        <div
                            className={`${styles.tick} ${styles.majorTick}`}
                            style={{ left: `${screenX}px`, bottom: 0 }}
                        />
                        <div
                            className={styles.label}
                            style={{ left: `${screenX + 2}px`, bottom: '14px' }}
                        >
                            {worldX * 100}
                        </div>
                    </div>
                );

                // Minor ticks
                for (let j = 1; j < 5; j++) {
                    const minorWorldX = worldX + j;
                    const minorScreenX = (minorWorldX - panX) * pixelsPerUnit + viewportWidth / 2 + 40;
                    if (minorScreenX >= 40 && minorScreenX <= viewportWidth + 40) {
                        ticks.push(
                            <div
                                key={`h-minor-${i}-${j}`}
                                className={`${styles.tick} ${styles.minorTick}`}
                                style={{ left: `${minorScreenX}px`, bottom: 0 }}
                            />
                        );
                    }
                }
            }
        }
        return ticks;
    };

    // Generate tick marks for vertical ruler
    const generateVerticalTicks = (): React.ReactElement[] => {
        const ticks: React.ReactElement[] = [];
        const pixelsPerUnit = zoom;
        const viewportHeight = window.innerHeight - 30;

        const worldBottom = panY - viewportHeight / 2 / pixelsPerUnit;
        const worldTop = panY + viewportHeight / 2 / pixelsPerUnit;

        const startTick = Math.floor(worldBottom / 5) * 5;
        const endTick = Math.ceil(worldTop / 5) * 5;

        for (let i = startTick; i <= endTick; i++) {
            const worldY = i * 5;
            const screenY = -(worldY - panY) * pixelsPerUnit + viewportHeight / 2 + 30;

            if (screenY >= 30 && screenY <= viewportHeight + 30) {
                ticks.push(
                    <div key={`v-major-${i}`}>
                        <div
                            className={`${styles.tick} ${styles.majorTick}`}
                            style={{
                                top: `${screenY}px`,
                                right: 0,
                                width: '12px',
                                height: '1px'
                            }}
                        />
                        <div
                            className={styles.label}
                            style={{
                                top: `${screenY - 8}px`,
                                right: '14px',
                                transform: 'rotate(-90deg)',
                                transformOrigin: 'right center'
                            }}
                        >
                            {worldY * 100}
                        </div>
                    </div>
                );

                // Minor ticks
                for (let j = 1; j < 5; j++) {
                    const minorWorldY = worldY + j;
                    const minorScreenY = -(minorWorldY - panY) * pixelsPerUnit + viewportHeight / 2 + 30;
                    if (minorScreenY >= 30 && minorScreenY <= viewportHeight + 30) {
                        ticks.push(
                            <div
                                key={`v-minor-${i}-${j}`}
                                className={`${styles.tick} ${styles.minorTick}`}
                                style={{
                                    top: `${minorScreenY}px`,
                                    right: 0,
                                    width: '6px',
                                    height: '1px'
                                }}
                            />
                        );
                    }
                }
            }
        }
        return ticks;
    };

    return (
        <div className={styles.container}>
            <div className={styles.horizontalRuler}>
                <div className={styles.rulerContent}>
                    {generateHorizontalTicks()}
                </div>
            </div>

            <div className={styles.verticalRuler}>
                <div className={styles.rulerContent}>
                    {generateVerticalTicks()}
                </div>
            </div>

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
