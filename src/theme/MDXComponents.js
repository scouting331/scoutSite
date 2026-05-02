// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component.
//import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons"; // Import all brands icons.
//import { faAt, faLocationDot } from "@fortawesome/free-solid-svg-icons"; // Import all solid icons.
import Columns from "@site/src/components/Columns";
import Column from "@site/src/components/Column";

//library.add(faFacebook, faYoutube, faInstagram, faAt, faLocationDot); // Add all icons to the library so you can use them without importing them individually.

export default {
  // Re-use the default mapping
  ...MDXComponents,
  FAIcon: FontAwesomeIcon, // Make the FontAwesomeIcon component available in MDX as <FAIcon />.
  Columns,
  Column,
};
