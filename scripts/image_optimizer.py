import os
from PIL import Image, ImageOps

def optimize_and_convert_to_webp(input_dir, output_dir, max_size=(1920, 1080), quality=80):
    """
    Bakes in the correct orientation, resizes, and converts JPEG/PNG images to WebP.
    
    :param input_dir: Folder containing your original images
    :param output_dir: Folder where optimized WebP images will be saved
    :param max_size: Maximum (width, height) boundary for resizing
    :param quality: WebP compression quality (80 is recommended for web performance)
    """
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
                
                # Switch file extension to .webp
                base_name, _ = os.path.splitext(file)
                output_file_name = f"{base_name}.webp"
                output_path = os.path.join(target_folder, output_file_name)

                try:
                    with Image.open(input_path) as img:
                        # 1. CRITICAL: Preserve and bake-in the original orientation
                        # Reads the smartphone metadata and rotates the pixel grid permanently.
                        img = ImageOps.exif_transpose(img)

                        # 2. Maintain transparency channels correctly
                        if img.mode in ('P', 'CMYK'):
                            img = img.convert('RGBA')

                        # 3. Smart Resize (maintains original aspect ratio)
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)

                        # 4. Save natively as WebP
                        img.save(output_path, format="WEBP", quality=quality)
                        
                    print(f"Successfully processed: {output_file_name}")
                except Exception as e:
                    print(f"Failed to process {file}. Error: {e}")

if __name__ == "__main__":
    SOURCE_FOLDER = r"input"
    OPTIMIZED_FOLDER = r"output"
    
    # Run the configuration
    optimize_and_convert_to_webp(
        input_dir=SOURCE_FOLDER, 
        output_dir=OPTIMIZED_FOLDER, 
        max_size=(1920, 1080), 
        quality=80
    )
