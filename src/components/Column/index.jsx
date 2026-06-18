/**
 * @file index.jsx
 * @description A flexible layout utility component that wraps content in a standard grid column.
 * It integrates with Docusaurus and Infima CSS grid systems, allowing custom styles and classes.
 * 
 * @module Column
 * @requires React
 * @requires clsx
 */

import React from "react";
import clsx from "clsx";                                    // Utility engine for conditionally joining dynamic strings and CSS classes together

/**
 * Renders a standard layout grid column container.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Elements to be rendered inside the column.
 * @param {string} [props.className] - Optional additional CSS class names (e.g., "col--6").
 * @param {React.CSSProperties} [props.style] - Optional inline CSS styles.
 * @returns {React.JSX.Element} A div element styled as a grid column.
 */
export default function Column({ children, className, style }) {
  return (
    // Combines the base structural 'col' styling rule with custom runtime classes passed via props
    <div className={clsx("col", className)} style={style}>
      {children}                                            {/* Injects child components or text nodes into the rendered column framework */}
    </div>
  );
}
