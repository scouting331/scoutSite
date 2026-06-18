/**
 * Renders an interactive data table populated asynchronously from a CSV target url path.
 * @component
 * @param {Object} props - React properties passed to the component.
 * @param {string} props.csvUrl - The root-relative path or absolute URL of the source CSV file (e.g., '/data/inventory.csv').
 * @returns {JSX.Element} A loading block indicator, a red error notice message, or the completed data grid.
 */
import React, { useState, useEffect } from 'react';
// Import the specialized web/browser build to prevent Webpack stream polyfill errors
import { parse } from 'csv-parse/browser/esm';

/**
 * Renders an interactive data table populated asynchronously from a CSV target url path.
 * @component
 * @param {Object} props - React properties passed to the component.
 * @param {string} props.csvUrl - The root-relative path or absolute URL of the source CSV file (e.g., '/data/inventory.csv').
 * @returns {JSX.Element} A loading block indicator, a red error notice message, or the completed data grid.
 */
export default function CsvTable({ csvUrl }) {
  // --- React State Hook Definitions ---
  const [data, setData] = useState([]);       // Allocation grid matrix holding array collection of parsed data row records
  const [headers, setHeaders] = useState([]); // String array container mapping the extracted CSV table column headers
  const [loading, setLoading] = useState(true); // Sets initial true visibility condition lock for async background operations
  const [error, setError] = useState(null);   // Null pointer block caching processing exceptions or networking errors

  useEffect(() => {
    // Execution Guard: Don't execute on the server side during Docusaurus build cycles
    if (typeof window === 'undefined') return;

    // Asynchronous background function handling web asset retrieval pipelines
    async function fetchAndParseCsv() {
      try {
        // 1. Fetch the raw asset from the static folder
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`HTTP network error! Status: ${response.status}`);
        }
        const csvText = await response.text(); // Unpacks stream response payload into raw unformatted text layout strings

        // 2. Parse the text using the native ESM module configuration
        parse(
          csvText,
          {
            columns: true,           // Automatically transforms rows into key/value objects
            skip_empty_lines: true,  // Bypasses tailing blank spacing rows
            trim: true               // Cuts accidental whitespaces off strings
          },
          // Callback execution routine fired when parsing processing ends
          (err, records) => {
            if (err) {
              setError(err.message);   // Intercepts parsing formatting discrepancies
              setLoading(false);
              return;
            }

            if (records && records.length > 0) {
              // Extract the column header keys from the first record object
              setHeaders(Object.keys(records[0]));
              setData(records);       // Stashes records array matrix within local React component hook storage
            }
            setLoading(false);         // Drops loading flag state to authorize grid layout visibility transitions
          }
        );
      } catch (err) {
        setError(err.message);         // Intercepts network fetching anomalies
        setLoading(false);
      }
    }

    fetchAndParseCsv();                // Triggers structural data retrieval function sequence
  }, [csvUrl]);                        // Re-runs execution loop if target asset URL address maps to new coordinates

  // --- Conditional UI Render Guards ---
  if (loading) return <p>⏳ Loading data table...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error parsing data layout: {error}</p>;
  if (data.length === 0) return <p>⚠️ No data discovered inside the requested file mapping.</p>;

  return (
    // Infuses Docusaurus Infima markdown class configurations to style typography layouts beautifully
    <div className="theme-doc-markdown">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {/* Iterates through the isolated headers array to build table column header blocks */}
            {headers.map((header) => (
              <th key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Iterates over the top-level array collection rows */}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Nested iterator extracting individual key mapping values for every cell's cross point data field */}
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`}>
                  {/* Safety fallback checking field elements for empty null values to display empty spaces instead */}
                  {row[header] !== undefined && row[header] !== null ? row[header] : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
