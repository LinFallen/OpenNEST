import { makeStyles, Button, Tooltip } from '@fluentui/react-components';
import {
    Navigation24Regular,
    ArrowMove24Regular,
    Square24Regular,
    Circle24Regular,
    GridDots24Regular,
    ArrowUpload24Regular
} from '@fluentui/react-icons';
import { useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addPart } from '../../store/slices/projectSlice';
import { parseDXF, entitiesToThreeObjects } from '../../utils/dxfParser';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    brand: {
        fontWeight: '600',
        letterSpacing: '0.5px',
        color: '#E0E0E0',
        marginRight: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    toolbar: {
        display: 'flex',
        gap: '4px',
        flex: 1
    },
    toolBtn: {
        minWidth: '32px',
        height: '28px',
        padding: '4px 8px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#858585',
        transition: 'all 0.1s',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: '#E0E0E0'
        }
    },
    toolBtnActive: {
        backgroundColor: 'rgba(0, 122, 204, 0.2)',
        color: '#007ACC'
    },
    divider: {
        width: '1px',
        height: '16px',
        backgroundColor: '#3E3E42',
        margin: '0 8px'
    },
    rightSection: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    },
    version: {
        fontSize: '11px',
        color: '#858585',
        marginRight: '10px'
    },
    hiddenInput: {
        display: 'none'
    }
});

export const TopBar: React.FC = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const content = await file.text();
            const parsed = parseDXF(content);
            const objects = entitiesToThreeObjects(parsed.entities);

            const newPart = {
                id: uuidv4(),
                name: file.name,
                entities: parsed.entities,
                objects,
                bounds: parsed.bounds,
                position: { x: 0, y: 0 },
                rotation: 0,
                layer: parsed.layers[0] || '0',
                material: 'Steel 2mm',
                quantity: 1,
                selected: false
            };

            dispatch(addPart(newPart));
            console.log('Imported DXF:', file.name, parsed);
        } catch (error) {
            console.error('Failed to import DXF:', error);
            alert('Failed to import DXF file. Please check the file format.');
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                <Navigation24Regular />
                OpenNEST
            </div>

            <div className={styles.toolbar}>
                <Tooltip content="Import DXF" relationship="label">
                    <Button
                        className={styles.toolBtn}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ArrowUpload24Regular />
                    </Button>
                </Tooltip>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".dxf"
                    className={styles.hiddenInput}
                    onChange={handleFileImport}
                />

                <div className={styles.divider} />

                <Tooltip content="Select" relationship="label">
                    <Button className={`${styles.toolBtn} ${styles.toolBtnActive}`}>
                        <Navigation24Regular />
                    </Button>
                </Tooltip>

                <Tooltip content="Pan" relationship="label">
                    <Button className={styles.toolBtn}>
                        <ArrowMove24Regular />
                    </Button>
                </Tooltip>

                <div className={styles.divider} />

                <Tooltip content="Rectangle" relationship="label">
                    <Button className={styles.toolBtn}>
                        <Square24Regular />
                    </Button>
                </Tooltip>

                <Tooltip content="Circle" relationship="label">
                    <Button className={styles.toolBtn}>
                        <Circle24Regular />
                    </Button>
                </Tooltip>

                <Tooltip content="Nesting" relationship="label">
                    <Button className={styles.toolBtn}>
                        <GridDots24Regular />
                    </Button>
                </Tooltip>
            </div>

            <div className={styles.rightSection}>
                <span className={styles.version}>v0.1.0-alpha</span>
            </div>
        </div>
    );
};
