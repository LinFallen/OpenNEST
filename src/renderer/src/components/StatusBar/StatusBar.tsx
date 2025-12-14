import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%'
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
    }
});

interface StatusBarProps {
    cursorX?: number;
    cursorY?: number;
    status?: string;
    unit?: 'mm' | 'inch';
}

export const StatusBar: React.FC<StatusBarProps> = ({
    cursorX = 0,
    cursorY = 0,
    status = 'Ready',
    unit = 'mm'
}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <span className={styles.mono}>
                    X: {cursorX.toFixed(2)} Y: {cursorY.toFixed(2)}
                </span>
                <span className={styles.separator}>|</span>
                <span>{status}</span>
            </div>

            <div className={styles.section}>
                <span>Unit: {unit}</span>
                <span className={styles.separator}>|</span>
                <span>UTF-8</span>
            </div>
        </div>
    );
};
