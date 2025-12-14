import { makeStyles, Input, Button } from '@fluentui/react-components';
import { Checkmark24Regular, ArrowDownload24Regular } from '@fluentui/react-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updatePartPosition, updatePartRotation } from '../../store/slices/projectSlice';
import { useState, useEffect } from 'react';

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
    },
    emptyState: {
        padding: '16px',
        textAlign: 'center',
        color: '#858585',
        fontSize: '12px'
    }
});

interface PropertiesPanelProps {
    onGenerateGCode?: () => void;
    onSimulate?: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
    onGenerateGCode,
    onSimulate
}) => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const selectedPart = useAppSelector((state) =>
        state.project.parts.find((p) => p.selected)
    );

    const [localX, setLocalX] = useState('0.00');
    const [localY, setLocalY] = useState('0.00');
    const [localRotation, setLocalRotation] = useState('0');

    useEffect(() => {
        if (selectedPart) {
            setLocalX(selectedPart.position.x.toFixed(2));
            setLocalY(selectedPart.position.y.toFixed(2));
            setLocalRotation(((selectedPart.rotation * 180) / Math.PI).toFixed(0));
        }
    }, [selectedPart]);

    const handlePositionXChange = (value: string) => {
        setLocalX(value);
        const num = parseFloat(value);
        if (!isNaN(num) && selectedPart) {
            dispatch(
                updatePartPosition({ id: selectedPart.id, x: num, y: selectedPart.position.y })
            );
        }
    };

    const handlePositionYChange = (value: string) => {
        setLocalY(value);
        const num = parseFloat(value);
        if (!isNaN(num) && selectedPart) {
            dispatch(
                updatePartPosition({ id: selectedPart.id, x: selectedPart.position.x, y: num })
            );
        }
    };

    const handleRotationChange = (value: string) => {
        setLocalRotation(value);
        const deg = parseFloat(value);
        if (!isNaN(deg) && selectedPart) {
            dispatch(
                updatePartRotation({ id: selectedPart.id, rotation: (deg * Math.PI) / 180 })
            );
        }
    };

    if (!selectedPart) {
        return (
            <div className={styles.container}>
                <div className={styles.panelHeader}>Properties</div>
                <div className={styles.emptyState}>
                    No part selected.
                    <br />
                    Click on a part in the canvas to view its properties.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.panelHeader}>Properties</div>
            <div className={styles.propGroup}>
                <div className={styles.propRow}>
                    <span className={styles.propLabel}>Selection</span>
                    <span className={styles.selectedName}>{selectedPart.name}</span>
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
                        value={localX}
                        onChange={(e) => handlePositionXChange(e.target.value)}
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
                        value={localY}
                        onChange={(e) => handlePositionYChange(e.target.value)}
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
                        value={`${localRotation}°`}
                        onChange={(e) => handleRotationChange(e.target.value.replace('°', ''))}
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
                        defaultValue="2.0 mm"
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
                        defaultValue="5.0 mm"
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
                        defaultValue="1.0 mm"
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
                <Button appearance="primary" onClick={onGenerateGCode} style={{ width: '100%' }}>
                    <Checkmark24Regular style={{ width: '16px', height: '16px' }} />
                    Generate G-Code
                </Button>
            </div>
        </div>
    );
};
