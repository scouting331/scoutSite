/**
 * @file index.jsx
 * @description A flexible layout row container that automatically centers and aligns nested child grid columns.
 * It integrates with Docusaurus and Infima grid frameworks to support dynamic, multi-column layouts.
 * 
 * @module Columns
 * @requires React
 * @requires clsx
 */

import React from "react";
import clsx from "clsx";                                    // Utility engine used for conditionally joining dynamic string classes together

/**
 * Renders a centered grid container and row wrapper for dynamic columns.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - One or more Column components to render inside the row.
 * @param {string} [props.className] - Optional additional CSS class names for the row element.
 * @param {React.CSSProperties} [props.style] - Optional inline CSS styles for the row element.
 * @returns {React.JSX.Element} A structured container/row div tree.
 */
export default function Columns({ children, className, style }) {
  return (
    // Outer responsive grid framework wrapper centering the entire layout section block horizontally on the page canvas
    <div className="container center">
      {/* Creates the horizontal layout row, combining standard grid properties with dynamic custom styles and classes */}
      <div className={clsx("row", className)} style={style}>
        {children}                                          {/* Injects and mounts nested child column components inside the row structure */}
      </div>
    </div>
  );
}
