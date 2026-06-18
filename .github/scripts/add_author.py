# .github/scripts/add_author.py
"""GitHub Action Automation Script for Author Onboarding.

This script parses author profile details from a GitHub Issue payload, 
validates the input fields, ensures author/slug uniqueness against an existing 
YAML database, downloads and converts the author's avatar to WebP format, 
and appends the new record to the project's central author configuration file.
It also updates the dropdown selections in the issue templates.

Global Configurations:
    AUTHORS_FILE (str): Path to the target author YAML registry database.
    TEMPLATE_FILE (str): Path to the GitHub Issue form definition template.
    AUTHORS_IMG_DIR (str): Destination directory for optimized author avatars.
"""

import json
import yaml
import re
import os
import sys
import urllib.request
from PIL import Image, ImageOps

# Constant definitions for project directories and structural files
AUTHORS_FILE = 'blog/authors.yml'
TEMPLATE_FILE = '.github/ISSUE_TEMPLATE/new-blog-post.yml'
AUTHORS_IMG_DIR = 'static/img/blog/authors'

def main():
    """Process and onboard a new blog author from GitHub Actions issue data.

    This function extracts author metadata from an environment-supplied JSON 
    string, performs structural validation, generates a URL-safe unique slug, 
    downloads the remote avatar, converts it to WebP format, and appends the 
    finalized profile data to the project's authors registry document. It also 
    regenerates and sorts the author selection options inside the issue forms.

    Raises:
        SystemExit (1): If required fields are missing, or if the author's 
                        name already exists in the registry database.
    """
    # Retrieve issue metadata passed as a JSON string from the GitHub Actions runner
    issue_json = os.environ.get("ISSUE_DATA", "{}")
    data = json.loads(issue_json)
    
    # Extract and normalize user string input data
    author_name = data.get("name", "").strip()
    author_title = data.get("title", "").strip()
    raw_image_url = data.get("image_url", "").strip()

    # Isolate image URL using regex if it is wrapped inside Markdown syntax e.g., (https://url.com)
    image_url = ""
    url_match = re.search(r'\((https://[^\)]+)\)', raw_image_url)
    if url_match:
        image_url = url_match.group(1)

    # Terminate workflow execution if critical metadata is missing
    if not author_name or not author_title:
        print("Missing required fields. Exiting.")
        sys.exit(1)

    # Read the existing document text to safely scan for duplicate profiles
    raw_content = ""
    if os.path.exists(AUTHORS_FILE):
        with open(AUTHORS_FILE, 'r', encoding='utf-8') as f:
            raw_content = f.read()
        
        # Guard clause preventing duplicate submissions of existing author names
        if f"name: {author_name}" in raw_content or f'name: "{author_name}"' in raw_content:
            print(f"::error::The author name '{author_name}' already exists.")
            sys.exit(1)

    # Initialize URL-safe slug creation by normalizing to lowercase alphanumeric characters
    slug = author_name.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug).strip('-')
    
    final_slug = slug
    counter = 1
    
    # Loop and append incremental numerical suffixes if slug collisions exist
    while f"{final_slug}:" in raw_content:
        final_slug = f"{slug}-{counter}"
        counter += 1

    # Process and optimize image resources if a valid link was detected
    final_image_path = ""
    if image_url:
        os.makedirs(AUTHORS_IMG_DIR, exist_ok=True)
        
        # Discard tracking or token query strings from URL to isolate extension
        clean_url = image_url.split("?")
        _, ext = os.path.splitext(clean_url[0])
        if not ext:
            ext = ".jpg" # Fall back to JPG extension if undetected
        
        # Stash download payload in server /tmp space
        tmp_avatar_path = f"/tmp/raw_avatar{ext}"
        try:
            urllib.request.urlretrieve(image_url, tmp_avatar_path)
            
            # Setup image configuration names and location paths
            target_file_name = f"{final_slug}.webp"
            target_full_path = os.path.join(AUTHORS_IMG_DIR, target_file_name)
            
            # Execute image processing pipeline via Pillow (PIL)
            with Image.open(tmp_avatar_path) as img:
                img = ImageOps.exif_transpose(img) # Re-orient image according to metadata tags
                if img.mode in ("P", "CMYK"):      # Convert non-standard modes to preserve transparencies
                    img = img.convert("RGBA")
                img.thumbnail((500, 500), Image.Resampling.LANCZOS) # High-fidelity scale reduction
                img.save(target_full_path, format="WEBP", quality=85) # Save and optimize file space
            
            # Save the final relative public path to be referenced on the blog front-end
            final_image_path = f"/img/blog/authors/{target_file_name}"
            print(f"Successfully processed and saved avatar to {target_full_path}")
            
            # Clean up server system storage by removing the raw downloaded asset
            if os.path.exists(tmp_avatar_path):
                os.remove(tmp_avatar_path)
        except Exception as e:
            print(f"Warning: Failed to download or process avatar image. Error: {e}")

    # Build the textual YAML data mapping block to safely maintain standard docstrings
    entry_lines = [
        f"{final_slug}:",
        f"  name: {author_name}",
        f"  title: {author_title}",
        "  page: true"
    ]
    if final_image_path:
        entry_lines.append(f"  image_url: {final_image_path}")
        
    raw_append_block = "\n" + "\n".join(entry_lines) + "\n"

    # Append structural string configurations to the bottom of the files document map
    with open(AUTHORS_FILE, 'a', encoding='utf-8') as f:
        f.write(raw_append_block)
    print(f"Successfully appended new profile block to {AUTHORS_FILE}")

    # --- PART 2: REGEX SEARCH EXTRAC NAME ATTRIBUTES TO BUILD DROPDOWNS ---
    with open(AUTHORS_FILE, 'r', encoding='utf-8') as f:
        updated_raw_content = f.read()
        
    # Isolate individual text strings matching metadata properties
    all_names = re.findall(r'^\s*name:\s*["\']?(.*?)["\']?\s*$', updated_raw_content, re.MULTILINE)
    all_names = [n.strip() for n in all_names if n.strip()]
    all_names.sort() # Arrange elements in alphanumeric order

    # Format items to valid list elements matching template indent spaces
    yaml_lines = [f"        - {name}" for name in all_names]
    replacement_string = "\n".join(yaml_lines)

    # Perform regular expression lookup and insert the list inside the anchor tags
    if os.path.exists(TEMPLATE_FILE):
        with open(TEMPLATE_FILE, 'r') as f:
            template_content = f.read()
        
        # Regex anchor block logic tracking target replacement parameters
        pattern = r'(# AUTHOR_START\n)(.*?)(\n\s*# AUTHOR_END)'
        updated_content = re.sub(
            pattern,
            f"\\1{replacement_string}\\3",
            template_content,
            flags=re.DOTALL
        )
        
        # Commit updated structured listings back to local document storage files
        with open(TEMPLATE_FILE, 'w') as f:
            f.write(updated_content)
        print(f"Successfully updated dropdown in {TEMPLATE_FILE}")
    else:
        print(f"Warning: Template file {TEMPLATE_FILE} not found. Skipping dropdown injection.")

if __name__ == "__main__":
    main()
