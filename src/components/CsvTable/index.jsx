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
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Execution Guard: Don't execute on the server side during Docusaurus build cycles
    if (typeof window === 'undefined') return;

    async function fetchAndParseCsv() {
      try {
        // 1. Fetch the raw asset from the static folder
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`HTTP network error! Status: ${response.status}`);
        }
        const csvText = await response.text();

        // 2. Parse the text using the native ESM module configuration
        parse(
          csvText,
          {
            columns: true,           // Automatically transforms rows into key/value objects
            skip_empty_lines: true,  // Bypasses tailing blank spacing rows
            trim: true               // Cuts accidental whitespaces off strings
          },
          (err, records) => {
            if (err) {
              setError(err.message);
              setLoading(false);
              return;
            }

            if (records && records.length > 0) {
              // Extract the column header keys from the first record object
              setHeaders(Object.keys(records[0]));
              setData(records);
            }
            setLoading(false);
          }
        );
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchAndParseCsv();
  }, [csvUrl]);

  if (loading) return <p>⏳ Loading data table...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error parsing data layout: {error}</p>;
  if (data.length === 0) return <p>⚠️ No data discovered inside the requested file mapping.</p>;

  return (
    <div className="theme-doc-markdown">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`}>
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
