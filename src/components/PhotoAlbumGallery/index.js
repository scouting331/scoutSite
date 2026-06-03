import React, { useState, useEffect } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

// Important: Import both required CSS stylesheets
import 'react-photo-album/styles.css'; 
import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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
    return <p style={{ color: '#666' }}>Scanning folder assets...</p>;
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

