import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#1E1E1E',
        overflow: 'hidden',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '13px',
        color: '#CCCCCC'
    },
    header: {
        height: '40px',
        backgroundColor: '#333333',
        borderBottom: '1px solid #3E3E42',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between',
        flexShrink: 0
    },
    mainContainer: {
        flex: 1,
        display: 'flex',
        overflow: 'hidden'
    },
    sidebarLeft: {
        width: '260px',
        backgroundColor: '#252526',
        borderRight: '1px solid #3E3E42',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
    },
    viewport: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden'
    },
    sidebarRight: {
        width: '300px',
        backgroundColor: '#252526',
        borderLeft: '1px solid #3E3E42',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
    },
    footer: {
        height: '24px',
        backgroundColor: '#007ACC',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        fontSize: '11px',
        color: 'white',
        justifyContent: 'space-between',
        flexShrink: 0
    }
});

interface LayoutShellProps {
    header?: React.ReactNode;
    sidebarLeft?: React.ReactNode;
    viewport?: React.ReactNode;
    sidebarRight?: React.ReactNode;
    footer?: React.ReactNode;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({
    header,
    sidebarLeft,
    viewport,
    sidebarRight,
    footer
}) => {
    const styles = useStyles();

    return (
        <div className={styles.layout}>
            {header && <div className={styles.header}>{header}</div>}
            <div className={styles.mainContainer}>
                {sidebarLeft && <div className={styles.sidebarLeft}>{sidebarLeft}</div>}
                <div className={styles.viewport}>{viewport}</div>
                {sidebarRight && <div className={styles.sidebarRight}>{sidebarRight}</div>}
            </div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
};
