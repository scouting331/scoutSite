# .github/scripts/fb_router.py
"""Facebook Routing Automation for Docusaurus Blogs.

This script parses recently added Docusaurus Markdown files, extracts their 
metadata (title, slug, tags), and maps them against official scouting unit tag 
taxonomies (`troop-303`, `troop-331`, `crew-303`, `pack-303`). It supports 
multi-page routing by generating a compact JSON matrix array of all matched 
target platforms, which is then streamed directly into the GitHub Actions runner.

Global Configurations:
    cmd (list): Set of base terminal commands used to poll the native Git tree history.
    github_output_path (str): Pointer destination used to write runner outputs.
"""

import os
import re
import subprocess
import sys
import json

def get_last_commit_added_blog_file():
    """Finds the first newly added markdown file in the blog directory.

    Queries the local git repository history log for files added in the most 
    recent commit and filters them to guarantee they reside in the Docusaurus 
    'blog/' subdirectory path and possess an authorized markdown extension.

    Returns:
        str | None: The relative string file path of the discovered blog post, 
            or None if no matching files are found or an error occurs.
    """
    try:
        # Configures Git flag array: isolates newly added files ('A') in the last commit (HEAD~1 to HEAD)
        cmd = ["git", "diff", "--name-only", "--diff-filter=A", "HEAD~1", "HEAD"]
        
        # Executes the Git process shell safely, capturing stdout text streams inside our runtime environment
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        files = result.stdout.splitlines()                  # Splits raw multi-line terminal block into clean array lists
        
        # Evaluates found assets, ensuring they live in the blog folder and terminate with valid markdown extensions
        blog_files = [f for f in files if f.startswith("blog/") and f.endswith((".md", ".mdx"))]
        return blog_files[0] if blog_files else None        # Returns the earliest discovered item path string or None
    except subprocess.CalledProcessError:
        print("Error reading git diff.")                    # Log alert notifying developers to shell system errors
        return None

def parse_front_matter(file_path):
    """Extracts title, slug, and tags from Docusaurus front matter.

    Reads the raw text of a markdown document using regular expressions to isolate 
    metadata properties. If a custom slug is omitted, it extracts the date components 
    (YYYY, MM, DD) and the trailing text title out of the file name to build a 
    standardized permalink array layout.

    Args:
        file_path (str): The relative path targeting the markdown file.

    Returns:
        tuple[str, str, str]: A tuple containing the extracted post title string, 
            the normalized relative path slug, and a cleaned block of tags text.
    """
    # Safe open stream using standard global UTF-8 encoding rules to prevent character corruption
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex mapping logic hunting down front-matter metadata maps bounded between '---' markers
    front_matter_match = re.search(r"^---\s*\n(.*?)\n---", content, re.DOTALL | re.MULTILINE)
    if not front_matter_match:
        return None, None, ""                               # Graceful exit fallback routing sequence if front-matter is missing

    fm_text = front_matter_match.group(1)                   # Isolates internal metadata configuration block

    # Extracts post title strings, matching text right of the identifier key prefix
    title_match = re.search(r"^title:\s*(.*)\$", fm_text, re.MULTILINE)
    title = title_match.group(1).strip(" '\"") if title_match else "New Blog Post"

    # Extracts permalink slug parameter, matching text right of the identifier key prefix
    slug_match = re.search(r"^slug:\s*(.*)\$", fm_text, re.MULTILINE)
    if slug_match:
        slug = slug_match.group(1).strip(" '\"")
        # Enforces a unified standard starting forward slash layout parameter if missing from custom slug
        if not slug.startswith("/"):
            slug = f"/{slug}"
    else:
        # Fallback to structural filename directory extraction if the slug key is omitted entirely
        filename = os.path.basename(file_path)              # Extracts the base filename context out of the path directory tree
        base_name = os.path.splitext(filename)[0]           # Separates base file text characters from trailing extensions
        
        # Regex to break "YYYY-MM-DD-filename" patterns into individual clean URL subdirectory fragments
        date_match = re.match(r"^(\d{4})-(\d{2})-(\d{2})-(.*)\$", base_name)
        if date_match:
            year, month, day, clean_title = date_match.groups()
            slug = f"/{year}/{month}/{day}/{clean_title}"   # Stitches date tokens into permalink formats: /YYYY/MM/DD/title
        else:
            slug = f"/{base_name}"                          # Simple catch-all filename routing configuration format if dates are missing

    # Extracts raw tags line string parameter, converting entries to lower case for reliable string checking
    tags_match = re.search(r"^tags:\s*(.*)\$", fm_text, re.MULTILINE)
    tags_text = tags_match.group(1).lower() if tags_match else ""
    
    # Secondary array scanner block if tags are formatted across multi-line lists instead of single brackets
    if not tags_text and "tags:" in fm_text:
        tags_text = fm_text.split("tags:")[1].lower()       # Isolates downstream array characters for processing

    return title, slug, tags_text

def determine_target_pages(tags_text):
    """Maps markdown tags to all matching scouting unit Facebook page categories.

    Scans the cleaned tag text string data blocks for occurrences of official 
    scouting unit key tokens (`troop-331`, `pack-303`, `crew-303`, `troop-303`). 
    Allows concurrent publishing configurations by mapping multiple items.

    Args:
        tags_text (str): A string containing the post's front-matter tags.

    Returns:
        list[str]: An array of uppercase matrix tokens (e.g., ["TROOP_303", "PACK_303"])
            specifying every intended social page destination channel.
    ```"""
    # Strips away formatting artifacts like quotes and brackets from raw array blocks
    tags_clean = tags_text.replace("[", "").replace("]", "").replace('"', '').replace("'", "")
    targets = []                                            # Allocation container list tracking targets

    # Independent conditional evaluation sequences enabling parallel multi-tag assignment mapping rules
    if "troop-331" in tags_clean:
        targets.append("TROOP_331")
    if "pack-303" in tags_clean:
        targets.append("PACK_303")
    if "crew-303" in tags_clean:
        targets.append("CREW_303")
    if "troop-303" in tags_clean:
        targets.append("TROOP_303")
        
    # Catch-all destination classification assignment bucket if no explicit unit tag is found
    if not targets:
        targets.append("DEFAULT")
        
    return targets

def main():
    """Orchestrates script lifecycle execution.

    Coordinates the discovery, file text extraction, matrix categorization, and 
    exporting of blog post properties directly to the `GITHUB_OUTPUT` file stream 
    destination path for usage by downstream GitHub workspace workflow runners.
    """
    new_file = get_last_commit_added_blog_file()            # Polls git repository tree data for newest content logs
    if not new_file:
        print("No new blog files found.")
        # Tells the main workflow that an article was not found, initializing safe shutdown variables
        with open(os.environ["GITHUB_OUTPUT"], "a") as go:
            go.write("has_new_post=false\n")
            go.write("targets=[]\n")
        sys.exit(0)                                         # Regular clean operational termination sequence code

    # Executes data transformation pipelines against the discovered markdown asset
    title, slug, tags_text = parse_front_matter(new_file)
    targets = determine_target_pages(tags_text)

    # Expose metadata variables to subsequent GitHub Actions runner steps via the GITHUB_OUTPUT environment path
    github_output_path = os.environ["GITHUB_OUTPUT"]        # Locates dynamic engine runner variable tracking path link
    with open(github_output_path, "a") as go:
        go.write(f"has_new_post=true\n")                     # Tells the workflow step gate that data exists to process
        go.write(f"title={title}\n")                         # Streams the post heading to populate status text bodies
        go.write(f"slug={slug}\n")                           # Streams the relative link string array for absolute url rendering
        # Dumps the Python array into a minified, stringified JSON array block string for GitHub Actions Matrix consumption
        go.write(f"targets={json.dumps(targets)}\n")

if __name__ == "__main__":
    main()                                                  # Executes the application runtime lifecycle routine
