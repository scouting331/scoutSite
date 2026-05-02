// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component.
import Columns from "@site/src/components/Columns";
import Column from "@site/src/components/Column";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  FAIcon: FontAwesomeIcon, // Make the FontAwesomeIcon component available in MDX as <FAIcon />.
  Columns,
  Column,
};
