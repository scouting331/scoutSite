/**
 * @file index.jsx
 * @description A dynamic media gallery that parses directory structures using Webpack contexts.
 * Automatically calculates aspect ratios on image asset loads to build a justified masonry grid.
 * Integrates an overlay lightbox supporting thumbnail carousels, item counters, and fullscreen options.
 * 
 * @module PhotoAlbumGallery
 * @requires React
 * @requires react-photo-album
 * @requires yet-another-react-lightbox
 * @requires yet-another-react-lightbox/plugins/counter
 * @requires yet-another-react-lightbox/plugins/thumbnails
 * @requires yet-another-react-lightbox/plugins/fullscreen
 */

import React, { useState, useEffect } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

// Import mandatory structural vendor stylesheets to render album columns and media players accurately
import 'react-photo-album/styles.css'; 
import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Renders a responsive, interactive image asset grid wall with fullscreen slideshow overlays.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {__WebpackModuleApi.RequireContext} props.context - A require.context function pointer targeting a folder of local image assets.
 * @returns {React.JSX.Element} A masonry layout block mapping out valid discovered image sizes.
 * 
 * @example
 * // Implementation example inside a documentation file:
 * <PhotoAlbumGallery context={require.context('@site/static/img/gallery-folder', false, /\.(png|jpe?g|svg)$/)} />
 */
export default function PhotoAlbumGallery({ context }) {
  // --- React State Hook Definitions ---
  const [index, setIndex] = useState(-1); // Active slider slide tracking pointer (-1 indicates the lightbox is currently closed)
  const [photos, setPhotos] = useState([]); // Storage matrix holding array objects of image data (src, width, height, alt)

  useEffect(() => {
    // 1. Map out raw files from the passed Webpack require.context asset bundle map
    const files = context.keys().map((key) => ({
      src: context(key).default,            // Extracts compiled production-ready hashed public asset URL strings
      alt: key.replace('./', ''),           // Normalizes filenames by clearing baseline relative path markers
    }));

    // 2. Wrap each image loader process inside an async Promise block to calculate dimensions safely
    const loadDimensions = files.map((file) => {
      return new Promise((resolve) => {
        const img = new Image();            // Spawns an unmounted HTMLImageElement memory thread execution context
        img.src = file.src;                 // Initiates background file loading processes over network threads
        
        // Success execution hook fired immediately after file bytes finish loading on the server
        img.onload = () => {
          resolve({
            src: file.src,
            width: img.naturalWidth || 4,   // Extracts pure physical pixel width properties (falls back to a 4:3 default index if zero)
            height: img.naturalHeight || 3, // Extracts pure physical pixel height properties
            alt: file.alt,
          });
        };
        
        // Fail-safe tracking exception gate handling missing or broken image assets
        img.onerror = () => {
          resolve({ src: file.src, width: 4, height: 3, alt: file.alt }); // Resolves default 4:3 boxes to avoid breaking masonry layout algorithms
        };
      });
    });

    // 3. Complete all concurrent dimension calculations before updating the state hook matrix data layout
    Promise.all(loadDimensions).then((resolvedPhotos) => {
      setPhotos(resolvedPhotos);             // Overrides local state array data, driving visual layout updates
    });
  }, [context]);                             // Triggers execution pass adjustments if context directory paths change

  // --- Conditional UI Render Guard ---
  if (photos.length === 0) {
    return <p style={{ color: 'var(--ifm-color-gray-500)' }}>Scanning folder assets...</p>;
  }

  return (
    <>
      {/* Dynamic layout engine arranging photo blocks flush without uneven rows gap drops */}
      <PhotoAlbum
        layout="masonry"                    // Packs images into columns side-by-side using variable heights
        photos={photos}                     // Injects the fully computed metadata asset registry grid
        columns={(containerWidth) => {
          // Dynamic layout calculation tracking screen grid widths to adjust responsive columns scaling maps
          if (containerWidth < 400) return 4; // Tiny screen layouts / mobile panels
          if (containerWidth < 800) return 5; // Mid-scale screens / tablets
          return 6;                         // Desktop display interfaces
        }}
        onClick={({ index }) => setIndex(index)} // Updates the active state index to pop open the corresponding lightbox slide
      />

      {/* Fullscreen modal media slider component block overlapping global page contexts */}
      <Lightbox
        slides={photos}                     // Maps target slides asset registry list directly to slide items
        open={index >= 0}                    // Open parameter visibility gate checking if index tracker is awake
        index={index}                       // Set core presentation frame view index focus node
        close={() => setIndex(-1)}          // Deactivates visibility flags completely on close event execution triggers
        plugins={[Thumbnails, Counter, Fullscreen]} // Mounts secondary core navigation plugin utilities modules layers
        thumbnails={{
          position: "bottom",               // Places the carousel row under the main picture frame container workspace
          showToggle: false,                // Disables and removes the user hide/show icon button layout elements entirely
        }}
      />
    </>
  );
}
