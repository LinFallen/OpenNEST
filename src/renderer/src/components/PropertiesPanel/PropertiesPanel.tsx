import { makeStyles, Input, Button } from '@fluentui/react-components';
import { Checkmark24Regular, ArrowDownload24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    panelHeader: {
        height: '36px',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#858585',
        borderBottom: '1px solid #3E3E42'
    },
    propGroup: {
        padding: '16px',
        borderBottom: '1px solid #3E3E42'
    },
    propRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    propLabel: {
        color: '#858585',
        fontSize: '12px'
    },
    propInput: {
        width: '80px'
    },
    selectedName: {
        color: '#007ACC',
        fontWeight: '600'
    },
    actionButtons: {
        marginTop: 'auto',
        padding: '16px'
    }
});

interface PropertiesPanelProps {
    selectedItem?: string;
    position?: { x: number; y: number };
    rotation?: number;
    toolDiameter?: number;
    leadIn?: number;
    kerf?: number;
    onGenerateGCode?: () => void;
    onSimulate?: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
    selectedItem = 'bracket_mount',
    position = { x: 452.0, y: 128.5 },
    rotation = 0,
    toolDiameter = 2.0,
    leadIn = 5.0,
    kerf = 1.0,
    onGenerateGCode,
    onSimulate
}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.panelHeader}>Properties</div>
            <div className={styles.propGroup}>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Selection</span>
                    <span className={styles.selectedName}>{selectedItem}</span>
                </div>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Position X</span>
                    <Input
                        className={styles.propInput}
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            textAlign: 'right'
                        }}
                        defaultValue={position.x.toFixed(2)}
                    />
                </div>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Position Y</span>
                    <Input
                        className={styles.propInput}
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            textAlign: 'right'
                        }}
                        defaultValue={position.y.toFixed(2)}
                    />
                </div>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Rotation</span>
                    <Input
                        className={styles.propInput}
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            textAlign: 'right'
                        }}
                        defaultValue={`${rotation}°`}
                    />
                </div>
            </div>

            <div className={styles.panelHeader}>Machining Parameters</div>
            <div className={styles.propGroup}>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Tool Dia.</span>
                    <Input
                        className={styles.propInput}
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            textAlign: 'right'
                        }}
                        defaultValue={`${toolDiameter} mm`}
                    />
                </div>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Lead In</span>
                    <Input
                        className={styles.propInput}
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            textAlign: 'right'
                        }}
                        defaultValue={`${leadIn} mm`}
                    />
                </div>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Kerf</span>
                    <Input
                        className={styles.propInput}
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            textAlign: 'right'
                        }}
                        defaultValue={`${kerf} mm`}
                    />
                </div>
            </div>

            <div className={styles.actionButtons}>
                <Button
                    appearance="secondary"
                    onClick={onSimulate}
                    style={{ width: '100%', marginBottom: '8px' }}
                >
                    <ArrowDownload24Regular style={{ width: '16px', height: '16px' }} />
                    Simulate Trace
                </Button>
                <Button
                    appearance="primary"
                    onClick={onGenerateGCode}
                    style={{ width: '100%' }}
                >
                    <Checkmark24Regular style={{ width: '16px', height: '16px' }} />
                    Generate G-Code
                </Button>
            </div>
        </div>
    );
};
