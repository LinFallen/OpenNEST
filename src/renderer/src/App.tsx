import { FluentProvider } from '@fluentui/react-components';
import { darkEngineeringTheme } from './theme/darkEngineering';
import { LayoutShell } from './components/Layout/LayoutShell';
import { TopBar } from './components/TopBar/TopBar';
import { StatusBar } from './components/StatusBar/StatusBar';
import { ProjectExplorer } from './components/ProjectExplorer/ProjectExplorer';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel';
import { CanvasViewport } from './components/Canvas/CanvasViewport';

function App(): React.JSX.Element {
  const handleFileSelect = (id: string) => {
    console.log('Selected file:', id);
    // TODO: Implement file selection logic
  };

  const handleGenerateGCode = () => {
    console.log('Generate G-Code');
    // TODO: Implement G-Code generation
  };

  const handleSimulate = () => {
    console.log('Simulate trace');
    // TODO: Implement simulation
  };

  return (
    <FluentProvider theme={darkEngineeringTheme}>
      <LayoutShell
        header={<TopBar />}
        sidebarLeft={<ProjectExplorer onFileSelect={handleFileSelect} />}
        viewport={<CanvasViewport />}
        sidebarRight={
          <PropertiesPanel onGenerateGCode={handleGenerateGCode} onSimulate={handleSimulate} />
        }
        footer={<StatusBar />}
      />
    </FluentProvider>
  );
}

export default App;

