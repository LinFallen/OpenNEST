import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    canvas: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        // CSS Grid Pattern for Engineering look
        backgroundImage: `
      linear-gradient(#2D2D2D 1px, transparent 1px),
      linear-gradient(90deg, #2D2D2D 1px, transparent 1px),
      linear-gradient(#383838 1px, transparent 1px),
      linear-gradient(90deg, #383838 1px, transparent 1px)
    `,
        backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
        backgroundPosition: 'center center'
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#858585',
        fontSize: '14px'
    },
    hint: {
        marginTop: '8px',
        fontSize: '12px',
        color: '#6E7681'
    }
});

export const CanvasViewport: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.canvas}>
            <div className={styles.placeholder}>
                <div>🎨 Canvas Viewport</div>
                <div className={styles.hint}>Phase 3: Three.js rendering will be implemented here</div>
            </div>
        </div>
    );
};
