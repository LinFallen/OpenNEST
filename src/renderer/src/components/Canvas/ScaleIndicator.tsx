import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
        backgroundColor: 'rgba(37, 37, 38, 0.9)',
        border: '1px solid #3E3E42',
        borderRadius: '4px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: '#858585',
        pointerEvents: 'none',
        userSelect: 'none'
    },
    axis: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    xAxis: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    yAxis: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    arrow: {
        width: '60px',
        height: '2px',
        position: 'relative'
    },
    arrowHead: {
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '0',
        height: '0',
        borderLeft: '6px solid currentColor',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent'
    },
    label: {
        fontWeight: '600',
        minWidth: '15px'
    }
});

export const ScaleIndicator: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            {/* X Axis */}
            <div className={styles.axis}>
                <span className={styles.label} style={{ color: '#E05E5E' }}>X</span>
                <div style={{ color: '#E05E5E' }}>
                    <div className={styles.arrow} style={{ backgroundColor: '#E05E5E' }}>
                        <div className={styles.arrowHead} />
                    </div>
                </div>
                <span>100mm</span>
            </div>

            {/* Y Axis */}
            <div className={styles.axis}>
                <span className={styles.label} style={{ color: '#56B6C2' }}>Y</span>
                <div style={{ color: '#56B6C2' }}>
                    <div className={styles.arrow} style={{ backgroundColor: '#56B6C2' }}>
                        <div className={styles.arrowHead} />
                    </div>
                </div>
                <span>100mm</span>
            </div>
        </div>
    );
};
