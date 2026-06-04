#!/usr/bin/env python3
"""
@file image_optimizer.py
@description Automated asset pipeline utility for Docusaurus developers. 
             Walks a source directory, normalizes image orientation, resizes heavy files, 
             converts images to highly-compressed WebP format, and deduplicates identical assets 
             by generating content-aware MD5 hash filenames or maintaining the original name. 
             Safely unlinks raw source files upon successful export confirmation.

@dependencies pillow (PIL)
@usage Execute from project root via: `npm run tools:images`
"""

import os
import sys
import hashlib
from io import BytesIO
from PIL import Image, ImageOps

def optimize_convert_and_hash_images(input_dir, output_dir, max_size=(1920, 1080), quality=80, keep_original_names=False):
    """
    Optimizes, converts images to WebP, saves them safely, and removes verified source raw assets.
    
    Args:
        input_dir (str): Relative or absolute path to raw source images.
        output_dir (str): Target directory where optimized WebP assets will be written.
        max_size (tuple): Maximum width and height constraints for bounding calculations.
        quality (int): Compression factor ratio (1-100) used by the WebP encoder engine.
        keep_original_names (bool): If True, preserves original filenames with .webp extension.
                                    If False, uses the unique MD5 hash name.
    """
    if not os.path.exists(input_dir):
        print(f"[Error] Source directory does not exist: {input_dir}")
        return

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output directory: {output_dir}")

    # Process only JPEG and PNG source files
    valid_extensions = ('.jpg', '.jpeg', '.png')

    for root, _, files in os.walk(input_dir):
        for file in files:
            if file.lower().endswith(valid_extensions):
                input_path = os.path.join(root, file)

                # Replicate the original folder structure in the output location
                relative_path = os.path.relpath(root, input_dir)
                target_folder = os.path.join(output_dir, relative_path)
                if not os.path.exists(target_folder):
                    os.makedirs(target_folder)

                try:
                    with Image.open(input_path) as img:
                        # 1. Preserve and bake-in the original orientation
                        img = ImageOps.exif_transpose(img)

                        # 2. Maintain transparency channels correctly
                        if img.mode in ('P', 'CMYK'):
                            img = img.convert('RGBA')

                        # 3. Smart Resize (maintains original aspect ratio)
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)

                        # 4. Save to an in-memory buffer first to calculate the final WebP MD5 hash
                        buffer = BytesIO()
                        img.save(buffer, format="WEBP", quality=quality)
                        optimized_data = buffer.getvalue()

                        # 5. Determine output file name strategy
                        if keep_original_names:
                            base_name, _ = os.path.splitext(file)
                            output_file_name = f"{base_name}.webp"
                        else:
                            # Generate MD5 hash from the optimized image data
                            hasher = hashlib.md5(optimized_data)
                            content_hash = hasher.hexdigest()
                            output_file_name = f"img_{content_hash}.webp"

                        output_path = os.path.join(target_folder, output_file_name)

                        # 6. Deduplication protection guard line
                        if os.path.exists(output_path):
                            print(f"[Duplicate Content Warning] {file} matches an existing optimized image {output_file_name}. Deleting raw source.")
                            os.remove(input_path)
                            continue

                        # 7. Write the file out from the memory buffer
                        with open(output_path, 'wb') as f:
                            f.write(optimized_data)

                        # 8. Post-write transaction verification safety check before permanent removal
                        if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
                            os.remove(input_path)
                            print(f"[Processed & Purged] {file} -> {output_file_name} (Raw file deleted)")
                        else:
                            print(f"[Safety Halt] Could not verify integrity of {output_file_name}. Raw file preserved.")

                except Exception as e:
                    print(f"Failed to process {file}. Error: {e}")

if __name__ == "__main__":
    # Cross-platform path resolution using os.path.join to handle standard root routing definitions
    SOURCE_FOLDER = os.path.join("scripts", "raw_img")
    OPTIMIZED_FOLDER = os.path.join("scripts", "processed_img")

    # Set to True if you want to keep the original file name with the new .webp extension
    KEEP_ORIGINAL_NAMES = True

    try:
        print("Starting destructive image optimization workflow...")
        optimize_convert_and_hash_images(
            input_dir=SOURCE_FOLDER, 
            output_dir=OPTIMIZED_FOLDER, 
            max_size=(1920, 1080), 
            quality=80,
            keep_original_names=KEEP_ORIGINAL_NAMES
        )
        print("Optimization pass complete.")
    except KeyboardInterrupt:
        print("\nProcess interrupted by developer shortcut. Exiting cleanly.")
        sys.exit(1)
