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
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const files = context.keys().map((key) => ({
      src: context(key).default,
      alt: key.replace('./', ''),
    }));

    const loadDimensions = files.map((file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = file.src;
        img.onload = () => {
          resolve({
            src: file.src,
            width: img.naturalWidth || 4,
            height: img.naturalHeight || 3,
            alt: file.alt,
          });
        };
        img.onerror = () => {
          resolve({ src: file.src, width: 4, height: 3, alt: file.alt });
        };
      });
    });

    Promise.all(loadDimensions).then((resolvedPhotos) => {
      setPhotos(resolvedPhotos);
    });
  }, [context]);

  if (photos.length === 0) {
    return <p style={{ color: 'var(--ifm-color-gray-500)' }}>Scanning folder assets...</p>;
  }

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 400) return 4;
          if (containerWidth < 800) return 5;
          return 6;
        }}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Counter, Fullscreen]}
        thumbnails={{
          position: "bottom", // Places the carousel row under the main picture
          showToggle: false,  // Disables and removes the user hide/show button
        }}
      />
    </>
  );
}

