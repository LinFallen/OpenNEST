import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0',
        padding: '8px',
        backgroundColor: 'rgba(37, 37, 38, 0.9)',
        border: '1px solid #3E3E42',
        borderRadius: '4px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: '#858585',
        pointerEvents: 'none',
        userSelect: 'none'
    },
    axes: {
        position: 'relative',
        width: '80px',
        height: '80px'
    },
    yAxis: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        width: '2px',
        height: '60px',
        backgroundColor: '#56B6C2'
    },
    xAxis: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        width: '60px',
        height: '2px',
        backgroundColor: '#E05E5E'
    },
    yArrow: {
        position: 'absolute',
        left: '10px',
        top: '-2px',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderBottom: '6px solid #56B6C2'
    },
    xArrow: {
        position: 'absolute',
        right: '-2px',
        bottom: '10px',
        transform: 'translateY(-50%)',
        width: '0',
        height: '0',
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent',
        borderLeft: '6px solid #E05E5E'
    },
    yLabel: {
        position: 'absolute',
        left: '10px',
        top: '-18px',
        transform: 'translateX(-50%)',
        color: '#56B6C2',
        fontWeight: '600',
        fontSize: '12px'
    },
    xLabel: {
        position: 'absolute',
        right: '-18px',
        bottom: '10px',
        transform: 'translateY(50%)',
        color: '#E05E5E',
        fontWeight: '600',
        fontSize: '12px'
    }
});

export const ScaleIndicator: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.axes}>
                {/* Y Axis */}
                <div className={styles.yAxis} />
                <div className={styles.yArrow} />
                <div className={styles.yLabel}>Y</div>

                {/* X Axis */}
                <div className={styles.xAxis} />
                <div className={styles.xArrow} />
                <div className={styles.xLabel}>X</div>
            </div>
        </div>
    );
};
