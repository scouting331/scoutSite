"""
GitHub Action Automation Script for Author Onboarding.

This script parses author profile details from a GitHub Issue payload, 
validates the input fields, ensures author/slug uniqueness against an existing 
YAML database, downloads and converts the author's avatar to WebP format, 
and appends the new record to the project's central author configuration file.

Global Configurations:
    AUTHORS_FILE (str): Path to the target YAML file where author entries are appended.
    TEMPLATE_FILE (str): Path to the GitHub Issue template formatting definition.
    AUTHORS_IMG_DIR (str): Destination directory for processed author avatars.

Environment Dependencies:
    ISSUE_DATA: A JSON string passed via GitHub Actions runner containing:
                - name (str): The author's full name.
                - title (str): The author's professional role or title.
                - image_url (str): Markdown-wrapped URL pointing to the user's avatar.
"""

import json
import yaml
import re
import os
import sys
import urllib.request
from PIL import Image, ImageOps

# Constants defining project directory structure
AUTHORS_FILE = 'blog/authors.yml'
TEMPLATE_FILE = '.github/ISSUE_TEMPLATE/01-new-blog-post.yml'
AUTHORS_IMG_DIR = 'static/img/blog/authors'

def main():
    """
    Processes and onboard a new blog author from GitHub Actions issue data.

    This function extracts author metadata from an environment-supplied JSON 
    string, performs validation, generates a URL-safe unique slug, downloads 
    the remote avatar, converts it to WebP format, and appends the finalized 
    profile data to the project's authors YAML registry.

    Raises:
        SystemExit (1): If required inputs are missing, or if the author's 
                        name already exists in the registry database.
    """
    
    # Retrieve issue data passed as a JSON string from the CI/CD environment
    issue_json = os.environ.get("ISSUE_DATA", "{}")
    data = json.loads(issue_json)
    
    # Extract and clean author input fields
    author_name = data.get("name", "").strip()
    author_title = data.get("title", "").strip()
    raw_image_url = data.get("image_url", "").strip()

    # Isolate the image URL if it's wrapped in markdown format e.g. (https://url.com)
    image_url = ""
    url_match = re.search(r'\((https://[^\)]+)\)', raw_image_url)
    if url_match:
        image_url = url_match.group(1)

    # Halt execution if required fields are missing
    if not author_name or not author_title:
        print("Missing required fields. Exiting.")
        sys.exit(1)

    # Read existing content to check for duplicates without rewriting via YAML loader
    raw_content = ""
    if os.path.exists(AUTHORS_FILE):
        with open(AUTHORS_FILE, 'r', encoding='utf-8') as f:
            raw_content = f.read()
        
        # Simple case-insensitive duplicate name check in existing YAML
        if f"name: {author_name}" in raw_content or f'name: "{author_name}"' in raw_content:
            print(f"::error::The author name '{author_name}' already exists.")
            sys.exit(1)

    # Generate a standard URL-friendly slug from the author's name
    slug = author_name.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug).strip('-')

    final_slug = slug
    counter = 1

    # Scan file text to ensure slug uniqueness, appending a counter if it collides
    while f"{final_slug}:" in raw_content:
        final_slug = f"{slug}-{counter}"
        counter += 1

    # Process and download the avatar image if an URL was provided
    final_image_path = ""
    if image_url:
        os.makedirs(AUTHORS_IMG_DIR, exist_ok=True)
        
        # Remove any query parameters from URL to get file extension
        clean_url = image_url.split("?")
        _, ext = os.path.splitext(clean_url[0])
        if not ext:
            ext = ".jpg"
        
        # Download image to a temporary file path
        tmp_avatar_path = f"/tmp/raw_avatar{ext}"
        try:
            urllib.request.urlretrieve(image_url, tmp_avatar_path)
            
            # Format and convert the image to WebP using Pillow
            target_file_name = f"{final_slug}.webp"
            target_full_path = os.path.join(AUTHORS_IMG_DIR, target_file_name)
            
            # Open the temporary image, convert, and save as webp
            with Image.open(tmp_avatar_path) as img:
                img = ImageOps.exif_transpose(img) # Preserve original orientation
                img.convert("RGB").save(target_full_path, "webp", quality=80)
                
            final_image_path = target_full_path
        
        except Exception as e:
            print(f"Warning: Could not process image from {image_url}. Error: {e}")
            # Fallback if image processing fails
            final_image_path = "" 

    # Prepare author object for YAML
    new_author_entry = {
        final_slug: {
            "name": author_name,
            "title": author_title,
            "image": final_image_path if final_image_path else None
        }
    }

    # Append the new author YAML block to the end of the authors file
    with open(AUTHORS_FILE, 'a', encoding='utf-8') as f:
        yaml.dump(new_author_entry, f, default_flow_style=False, allow_unicode=True)

    print(f"Successfully added author '{author_name}' with slug '{final_slug}'.")


if __name__ == "__main__":
    main()

