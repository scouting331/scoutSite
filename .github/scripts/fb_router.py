"""Facebook Routing Automation for Docusaurus Blogs.

This script parses recently added Docusaurus Markdown files, extracts their 
metadata (title, slug, tags), and determines the target Facebook Page 
destination based on defined tagging rules. The values are then exported 
to the GitHub Actions environment.
"""

import os
import re
import subprocess
import sys

def get_last_commit_added_blog_file():
    """Finds the first newly added markdown file in the blog directory.

    Queries git diff for files added in the most recent commit and filters 
    them to ensure they reside in the Docusaurus 'blog/' folder and have 
    a markdown extension.

    Returns:
        list[str] | None: A list containing file paths of new blog posts, 
            or None if no matching files are found or an error occurs.
    """
    try:
        # Run git diff command to locate new files
        cmd = ["git", "diff", "--name-only", "--diff-filter=A", "HEAD~1", "HEAD"]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        files = result.stdout.splitlines()
        
        # Filter for markdown files in the blog folder
        blog_files = [f for f in files if f.startswith("blog/") and f.endswith((".md", ".mdx"))]
        return blog_files[0] if blog_files else None
    except subprocess.CalledProcessError:
        print("Error reading git diff.")
        return None

def parse_front_matter(file_path):
    """Extracts title, slug, and tags from Docusaurus front matter.

    Reads the top YAML block of the markdown file using regular expressions. 
    If a slug is missing, it automatically derives one from the filename 
    while stripping out standard Docusaurus date prefixes.

    Args:
        file_path (str): The relative path to the markdown file.

    Returns:
        tuple[str, str, str]: A tuple containing the post title, the URL slug, 
            and a lowercase block of tag strings for categorization.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Match the front matter block enclosed between ---
    front_matter_match = re.search(r"^---\s*\n(.*?)\n---", content, re.DOTALL | re.MULTILINE)
    if not front_matter_match:
        return None, None, ""

    fm_text = front_matter_match.group(1)

    # Extract title
    title_match = re.search(r"^title:\s*(.*)$", fm_text, re.MULTILINE)
    title = title_match.group(1).strip(" '\"") if title_match else "New Blog Post"

    # Extract slug
    slug_match = re.search(r"^slug:\s*(.*)$", fm_text, re.MULTILINE)
    if slug_match:
        slug = slug_match.group(1).strip(" '\"")
    else:
        # Fallback to filename tracking if slug is omitted
        filename = os.path.basename(file_path)
        base_name = os.path.splitext(filename)[0]
        slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", base_name) # Strip date prefix

    # Extract tags section as a lowercase block for easier routing matching
    tags_match = re.search(r"^tags:\s*(.*)$", fm_text, re.MULTILINE)
    tags_text = tags_match.group(1).lower() if tags_match else ""
    
    # Handle multi-line YAML lists for tags if single line wasn't caught cleanly
    if not tags_text and "tags:" in fm_text:
        tags_text = fm_text.split("tags:")[1].lower()

    return title, slug, tags_text

def determine_target_page(tags_text):
    """Maps tags to specific Facebook page categories.

    Evaluates the parsed tags string against keyword lists to find matches 
    for specialized Facebook Pages (e.g., TECH or LIFESTYLE). Falls back to 
    a DEFAULT profile if no conditions match.

    Args:
        tags_text (str): A string containing the post's front-matter tags.

    Returns:
        str: A string token ("TECH", "LIFESTYLE", or "DEFAULT") indicating 
            the designated target channel.
    """
    tech_keywords = ["tech", "programming", "coding", "developer"]
    lifestyle_keywords = ["lifestyle", "travel", "personal"]

    if any(kw in tags_text for kw in tech_keywords):
        return "TECH"
    elif any(kw in tags_text for kw in lifestyle_keywords):
        return "LIFESTYLE"
    return "DEFAULT"

def main():
    """Orchestrates script lifecycle execution.

    Coordinates the discovery, extraction, categorization, and exporting 
    of blog metadata to the `GITHUB_OUTPUT` file stream for consumption by 
    downstream GitHub workflow pipeline steps.
    """
    new_file = get_last_commit_added_blog_file()
    if not new_file:
        print("No new blog files found.")
        with open(os.environ["GITHUB_OUTPUT"], "a") as go:
            go.write("has_new_post=false\n")
        sys.exit(0)

    title, slug, tags_text = parse_front_matter(new_file)
    target_page = determine_target_page(tags_text)

    # Expose variables to subsequent GitHub Actions steps via GITHUB_OUTPUT
    github_output_path = os.environ["GITHUB_OUTPUT"]
    with open(github_output_path, "a") as go:
        go.write(f"has_new_post=true\n")
        go.write(f"title={title}\n")
        go.write(f"slug={slug}\n")
        go.write(f"target_page={target_page}\n")

if __name__ == "__main__":
    main()
