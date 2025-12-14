import { makeStyles } from '@fluentui/react-components';
import { Document24Regular } from '@fluentui/react-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectPart } from '../../store/slices/projectSlice';

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
    fileList: {
        flex: 1,
        padding: '8px',
        overflowY: 'auto'
    },
    fileItem: {
        padding: '8px',
        marginBottom: '4px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background 0.1s',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,0.05)'
        }
    },
    fileItemSelected: {
        backgroundColor: '#37373D',
        border: '1px solid #007ACC'
    },
    fileIcon: {
        width: '24px',
        height: '24px',
        backgroundColor: '#333',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#007ACC'
    },
    fileName: {
        fontSize: '12px',
        color: '#E0E0E0'
    },
    fileInfo: {
        fontSize: '10px',
        color: '#858585'
    },
    layersSection: {
        borderTop: '1px solid #3E3E42'
    },
    layerItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '6px'
    },
    colorBox: {
        width: '10px',
        height: '10px',
        borderRadius: '2px'
    },
    emptyState: {
        padding: '16px',
        textAlign: 'center',
        color: '#858585',
        fontSize: '12px'
    }
});

export const ProjectExplorer: React.FC = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const parts = useAppSelector((state) => state.project.parts);

    const handleFileSelect = (id: string) => {
        dispatch(selectPart(id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.panelHeader}>Project Explorer</div>
            <div className={styles.fileList}>
                {parts.length === 0 ? (
                    <div className={styles.emptyState}>
                        No files imported yet.
                        <br />
                        Click the import button to get started.
                    </div>
                ) : (
                    parts.map((part) => (
                        <div
                            key={part.id}
                            className={`${styles.fileItem} ${part.selected ? styles.fileItemSelected : ''}`}
                            onClick={() => handleFileSelect(part.id)}
                        >
                            <div className={styles.fileIcon}>
                                <Document24Regular style={{ width: '14px', height: '14px' }} />
                            </div>
                            <div>
                                <div className={styles.fileName}>{part.name}</div>
                                <div className={styles.fileInfo}>
                                    QTY: {part.quantity} • {part.material}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.layersSection}>
                <div className={styles.panelHeader}>Layers</div>
                <div style={{ padding: '8px' }}>
                    <div className={styles.layerItem}>
                        <div className={styles.colorBox} style={{ background: '#E0E0E0' }} />
                        <span style={{ color: '#CCC' }}>0 (Geometry)</span>
                    </div>
                    <div className={styles.layerItem}>
                        <div className={styles.colorBox} style={{ background: '#D7BA7D' }} />
                        <span style={{ color: '#CCC' }}>CUT_PATH</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
