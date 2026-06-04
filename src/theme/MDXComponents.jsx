/**
 * @file MDXComponents.js
 * @description Extends the default Docusaurus MDX element mapper via swizzling.
 * Globally registers FontAwesome icon sets and custom structural grid utilities (Columns, Column)
 * to allow direct invocation inside Markdown (.md and .mdx) documents without manual importing.
 * 
 * @module MDXComponents
 * @requires @theme-original/MDXComponents
 * @requires @fortawesome/react-fontawesome
 * @requires @fortawesome/fontawesome-svg-core
 * @requires @fortawesome/free-brands-svg-icons
 * @requires @fortawesome/free-solid-svg-icons
 * @requires @site/src/components/Columns
 * @requires @site/src/components/Column
 */

// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component.
import { library } from "@fortawesome/fontawesome-svg-core"; // Import the library component.
import { fab } from "@fortawesome/free-brands-svg-icons"; // Import all brands icons.
import { fas } from "@fortawesome/free-solid-svg-icons"; // Import all solid icons.
import Columns from "@site/src/components/Columns";
import Column from "@site/src/components/Column";

library.add(fab, fas); // Add all icons to the library so you can use them without importing them individually.

/**
 * Globally mapped registry configuration binding shortcodes to active layout elements.
 * 
 * @type {Object<string, React.ComponentType>}
 * @property {React.ComponentType} FAIcon - The global interface wrapper for FontAwesome iconography elements (`<FAIcon icon="fa-solid fa-house" />`).
 * @property {React.ComponentType} Columns - A flexbox layout system row shortcode (`<Columns>`).
 * @property {React.ComponentType} Column - An individual structural grid layout segment shortcode (`<Column>`).
 */
export default {
  // Re-use the default mapping
  ...MDXComponents,
  FAIcon: FontAwesomeIcon, // Make the FontAwesomeIcon component available in MDX as <FAIcon />.
  Columns,
  Column,
};
