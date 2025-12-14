import { makeStyles } from '@fluentui/react-components';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleUnit } from '../../store/slices/settingsSlice';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '0 12px',
        fontSize: '11px',
        color: 'white',
        backgroundColor: '#007ACC' // Prototype blue accent
    },
    section: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
    },
    mono: {
        fontFamily: '"JetBrains Mono", Consolas, monospace'
    },
    separator: {
        opacity: 0.7
    },
    unitToggle: {
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        ':hover': {
            opacity: 0.8,
            textDecoration: 'underline'
        }
    }
});

export const StatusBar: React.FC = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();

    const cursorPosition = useAppSelector((state) => state.settings.cursorPosition);
    const unit = useAppSelector((state) => state.settings.unit);
    const status = useAppSelector((state) => state.settings.applicationStatus);

    // Convert coordinates based on unit
    const convertValue = (value: number) => {
        if (unit === 'inch') {
            // 1 decimeter = 100mm, 1 inch = 25.4mm
            return (value * 100 / 25.4).toFixed(3);
        }
        return (value * 100).toFixed(2); // decimeter to mm
    };

    const handleUnitToggle = () => {
        dispatch(toggleUnit());
    };

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <span className={styles.mono}>
                    X: {convertValue(cursorPosition.x)} Y: {convertValue(cursorPosition.y)}
                </span>
                <span className={styles.separator}>|</span>
                <span>{status}</span>
            </div>

            <div className={styles.section}>
                <span
                    className={styles.unitToggle}
                    onClick={handleUnitToggle}
                    title="Click to toggle unit"
                >
                    Unit: {unit}
                </span>
                <span className={styles.separator}>|</span>
                <span>UTF-8</span>
            </div>
        </div>
    );
};
