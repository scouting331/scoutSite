# Contributing to Our Website

Thank you for your interest in contributing to the Scouting America Units of
American Legion Post 331 website! We welcome contributions from all members of
our Scouting community. This document provides guidelines and instructions for
contributing.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Submitting Content](#submitting-content)
  - [Writing Blog Posts](#writing-blog-posts)
  - [Creating Documentation](#creating-documentation)
  - [Adding Your Author Profile](#adding-your-author-profile)
- [Contributing Code](#contributing-code)
- [Development Setup](#development-setup)
- [Code Style & Standards](#code-style--standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Questions or Need Help?](#questions-or-need-help)

---

## Ways to Contribute

We accept contributions in several forms:

### 1. **Content Contributions** (Recommended for most members)

- 📝 Write blog posts about adventures, events, and accomplishments
- 📚 Create documentation for guides, resources, or procedures
- 👤 Add your author profile to the site

### 2. **Code Contributions** (For developers)

- 🐛 Report and fix bugs
- ✨ Improve automation scripts
- 🔧 Enhance the CI/CD workflows
- 🎨 Improve site styling and components

### 3. **Feedback & Ideas**

- 💬 Report issues or suggest improvements
- 📋 Review pull requests
- 💡 Share ideas for new features

---

## Submitting Content

### Writing Blog Posts

The easiest way to share your adventures and updates!

**How to submit:**

1. Go to the [Issues tab](../../issues)
2. Click **New issue** → **New Blog Post**
3. Fill out the form with:
   - **Blog Title:** Title of your post (include campout/event name if
     applicable)
   - **Post Date:** When the event occurred (optional, defaults to today)
   - **Authors:** Select who wrote this post (you can select multiple authors)
   - **Unit:** Select which unit(s) this post is about
   - **Cover Photo:** Upload a featured image (optional, single photo only)
   - **Photo Album:** Upload multiple photos for a gallery (optional)
   - **Blog Text:** Write your post content in Markdown format
4. Click **Create**
5. 🎉 Our automation will create a staging PR for review

**Blog Post Tips:**

- Use Markdown formatting for better readability
- Include headings to organize sections
- Recommended structure:

  ```markdown
  ## What We Did

  - Activity 1
  - Activity 2
  - Activity 3

  :::info⛺ Outdoor Adventure Tip Share a helpful tip about gear, recipes, or
  skills! :::
  ```

- Photos: Upload high-quality images (PNG, JPG, WebP, GIF accepted)
- File size limit: 25MB per photo

**Photo Guidelines:**

- Cover photo: Main image shown on homepage card
- Photo Album: Additional photos displayed in a gallery
- Photos are automatically optimized and converted to WebP format

### Creating Documentation

Help document guides, resources, and procedures for our community.

**How to submit:**

1. Go to the [Issues tab](../../issues)
2. Click **New issue** → **New Document**
3. Fill out the form with:
   - **Document Title:** Name of the guide/resource
   - **Description:** Brief summary of what the document covers
   - **Unit/Category:** Select the unit or general category
   - **Document Content:** Write your documentation in Markdown
4. Click **Create**
5. 🎉 Our automation will create a staging PR for review

**Documentation Tips:**

- Use clear headings and sections
- Include examples where helpful
- Format code blocks with triple backticks:

  ````
  ```markdown
  code here
  ```
  ````

- Add inline images if needed
- Keep content organized and easy to scan

### Adding Your Author Profile

Let the community know who's behind the posts!

**How to submit:**

1. Go to the [Issues tab](../../issues)
2. Click **New issue** → **New Blog Author**
3. Fill out the form with:
   - **Name:** Your name
   - **Title:** Your role or title (e.g., "Scoutmaster", "Youth Member")
   - **Image URL:** Upload or link to a profile photo
4. Click **Create**
5. ✅ Your profile will be added and available for future posts

**Photo Requirements:**

- Recommended size: 500x500px or larger
- Formats: PNG, JPG, WebP, GIF
- Automatically cropped to square and optimized

---

## Contributing Code

### Before You Start

- Check existing [Issues](../../issues) and [Pull Requests](../../pulls) to
  avoid duplicate work
- For significant changes, open an issue first to discuss your approach
- Ensure your changes align with the project's goals

### Development Setup

**Prerequisites:**

- Python 3.11+
- Node.js (for frontend development)
- Git

**Setup steps:**

```bash
# Clone the repository
git clone https://github.com/scouting331/scoutSite.git
cd scoutSite

# Create a virtual environment (recommended)
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Install Node dependencies
npm install

# Start the development server
npm start
```

### Code Style & Standards

**Python Scripts** (in `.github/scripts/`)

- Use Python 3.11+
- Follow PEP 8 style guidelines
- Add docstrings to functions
- Include type hints where possible
- Example:

  ```python
  def validate_image_download(url: str, dest_path: str, max_size_mb: int = 25) -> bool:
      """Download and validate an image file.

      Args:
          url: Remote file URL to download
          dest_path: Local destination path
          max_size_mb: Maximum file size in MB

      Returns:
          True if download succeeded, False otherwise
      """
  ```

**Workflows** (in `.github/workflows/`)

- Keep YAML properly indented (2 spaces)
- Use descriptive step names
- Add comments for complex logic
- Follow existing naming conventions

**General Guidelines:**

- Write clear, descriptive commit messages
- One feature/fix per commit when possible
- Keep changes focused and minimal
- Don't include debugging code or print statements
- Add logging instead of print statements for production code

### Testing

**Before submitting:**

1. **Test locally:**

   ```bash
   # For Python scripts
   python .github/scripts/your_script.py

   # For workflows, verify syntax
   ```

2. **Test the entire flow:**
   - Create a test issue using the form template
   - Verify the automation runs correctly
   - Check that the PR is created with expected content

3. **Edge cases to test:**
   - Special characters in names/titles (e.g., O'Brien, Smith-Jones)
   - Very long titles
   - Multiple photos/files
   - Missing optional fields

### Pull Request Process

1. **Create a branch:**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number
   ```

2. **Make your changes:**
   - Follow the code style guidelines
   - Add or update tests if applicable
   - Update documentation if needed

3. **Commit your changes:**

   ```bash
   git add .
   git commit -m "Clear, descriptive commit message"
   ```

4. **Push and create a PR:**

   ```bash
   git push origin feature/your-feature-name
   ```

   - Go to GitHub and click "Create Pull Request"
   - Fill out the PR template
   - Reference any related issues

5. **PR Guidelines:**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Link to related issues (use `Closes #123`)
   - Be responsive to review feedback

6. **After approval:**
   - Keep the branch up to date with main
   - Squash commits if requested
   - Once approved, your changes will be merged

---

## Questions or Need Help?

- 💬 **Ask a question:** Open a [GitHub Discussion](../../discussions) or file
  an issue
- 🐛 **Found a bug?** Report it with details and steps to reproduce
- 📧 **Contact us:** Reach out to the project maintainers

---

## License

By contributing to this project, you agree that your contributions will be
licensed under the same license as the project. See the LICENSE file for
details.

---

Thank you for helping make our website better! 🏕️⛺
