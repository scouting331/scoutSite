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
from validation import validate_image_download
from logging_config import setup_logging

logger = setup_logging(__name__)

# Constant definitions for project directories and structural files
AUTHORS_FILE = 'blog/authors.yml'
TEMPLATE_FILE = '.github/ISSUE_TEMPLATE/01-new-blog-post.yml'
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
    logger.info(f"Processing new author: {author_name}")

    # Isolate image URL using regex if it is wrapped inside Markdown syntax e.g., (https://url.com)
    image_url = ""
    url_match = re.search(r'\((https://[^\)]+)\)', raw_image_url)
    if url_match:
        image_url = url_match.group(1)

    # Terminate workflow execution if critical metadata is missing
    if not author_name or not author_title:
        print("Missing required fields. Exiting.")
        sys.exit(1)

    # Read and parse existing authors to check for duplicates
    existing_authors = {}
    if os.path.exists(AUTHORS_FILE):
        with open(AUTHORS_FILE, 'r', encoding='utf-8') as f:
            existing_authors = yaml.safe_load(f) or {}

    # Guard clause preventing duplicate submissions of existing author names
    for author_key, author_data in existing_authors.items():
        if author_data and author_data.get('name', '').lower() == author_name.lower():
            print(f"::error::The author name '{author_name}' already exists.")
            sys.exit(1)

    # Initialize URL-safe slug creation by normalizing to lowercase alphanumeric characters
    slug = author_name.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug).strip('-')

    final_slug = slug
    counter = 1

    # Loop and append incremental numerical suffixes if slug collisions exist
    while final_slug in existing_authors:
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
            if validate_image_download(image_url, tmp_avatar_path):
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
            else:
                print(f"Warning: Avatar image validation failed. Continuing without avatar.")
        except Exception as e:
            print(f"Warning: Failed to download or process avatar image. Error: {e}")

    # Build new author entry using safe YAML data structures
    author_entry = {
        final_slug: {
            'name': author_name,
            'title': author_title,
            'page': True
        }
    }
    if final_image_path:
        author_entry[final_slug]['image_url'] = final_image_path

    # Update existing authors dictionary with new entry
    existing_authors.update(author_entry)

    # Write updated authors back to file using YAML library (safely handles special characters)
    os.makedirs(os.path.dirname(AUTHORS_FILE), exist_ok=True)
    with open(AUTHORS_FILE, 'w', encoding='utf-8') as f:
        yaml.dump(existing_authors, f, allow_unicode=True, sort_keys=False)
    logger.info(f"Successfully added new author '{author_name}' to {AUTHORS_FILE}")

    # --- PART 2: Extract author names and rebuild dropdown options ---
    # Parse the updated YAML file to extract all author names
    with open(AUTHORS_FILE, 'r', encoding='utf-8') as f:
        all_authors = yaml.safe_load(f) or {}

    # Extract names and sort alphabetically
    all_names = [author_data.get('name', '') for author_data in all_authors.values() if author_data and author_data.get('name')]
    all_names.sort()

    # Format as YAML list items matching template indentation
    yaml_lines = [f"        - {name}" for name in all_names]
    replacement_string = "\n".join(yaml_lines)

    # Update the issue template with the regenerated dropdown
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

        # Write updated template back to file
        with open(TEMPLATE_FILE, 'w') as f:
            f.write(updated_content)
        print(f"Successfully updated dropdown in {TEMPLATE_FILE}")
    else:
        print(f"Warning: Template file {TEMPLATE_FILE} not found. Skipping dropdown injection.")

if __name__ == "__main__":
    main()
