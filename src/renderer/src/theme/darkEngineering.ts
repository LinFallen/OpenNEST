import { BrandVariants, Theme, createDarkTheme } from '@fluentui/react-components';

/**
 * Dark Engineering Theme for OpenNEST
 * Based on DESIGN_SPEC.md color palette
 */

const openNestBrand: BrandVariants = {
  10: '#020305',
  20: '#0F1419',
  30: '#1E1E1E', // Main background
  40: '#252526', // Panel background
  50: '#2D2D2D',
  60: '#3E3E42', // Border color
  70: '#4A4A4F',
  80: '#007ACC', // Primary accent (Tech Blue)
  90: '#1F8AD2', // Hover state
  100: '#3B9EDB',
  110: '#57B1E4',
  120: '#73C5ED',
  130: '#8FD9F6',
  140: '#ABEDFF',
  150: '#C7FFFF',
  160: '#E3FFFF'
};

export const darkEngineeringTheme: Theme = createDarkTheme(openNestBrand);

// Override specific tokens to match our design spec
darkEngineeringTheme.colorNeutralBackground1 = '#1E1E1E'; // Main background
darkEngineeringTheme.colorNeutralBackground2 = '#252526'; // Panel background
darkEngineeringTheme.colorNeutralBackground3 = '#333333'; // Header/toolbar
darkEngineeringTheme.colorNeutralStroke1 = '#3E3E42'; // Borders
darkEngineeringTheme.colorNeutralForeground1 = '#CCCCCC'; // Primary text
darkEngineeringTheme.colorNeutralForeground2 = '#858585'; // Secondary text
darkEngineeringTheme.colorNeutralForeground3 = '#E0E0E0'; // Headers

// Brand colors (keep the defaults from our brand variants)
darkEngineeringTheme.colorBrandBackground = '#007ACC';
darkEngineeringTheme.colorBrandBackgroundHover = '#1F8AD2';
darkEngineeringTheme.colorBrandForeground1 = '#007ACC';
darkEngineeringTheme.colorBrandForeground2 = '#1F8AD2';

// Status colors
darkEngineeringTheme.colorPaletteRedBackground3 = '#F14C4C'; // Error/Collision
darkEngineeringTheme.colorPaletteYellowBackground3 = '#D7BA7D'; // Warning/Path

export default darkEngineeringTheme;
