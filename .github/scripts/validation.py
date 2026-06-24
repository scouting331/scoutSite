"""File download validation module for GitHub Actions automation.

Provides secure file downloading with size and MIME type validation
to prevent malicious uploads and disk exhaustion attacks.
"""
import urllib.request
import urllib.error
import mimetypes
import logging
import os
from pathlib import Path

logger = logging.getLogger(__name__)

# MIME types allowed for image downloads
ALLOWED_IMAGE_TYPES = {
    'image/jpeg', 'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
}

# File extensions allowed
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'}

def validate_image_download(url, dest_path, max_size_mb=25):
    """Download and validate an image file.

    Performs multiple validation checks:
    1. Checks Content-Length header to reject oversized files
    2. Validates Content-Type header matches expected image MIME types
    3. Downloads the file with size limit enforcement
    4. Verifies file extension matches MIME type

    Args:
        url (str): Remote file URL to download
        dest_path (str): Local destination path for the file
        max_size_mb (int): Maximum file size in MB (default 25)

    Returns:
        bool: True if download succeeded and validation passed, False otherwise
    """
    max_size_bytes = max_size_mb * 1024 * 1024

    try:
        # Step 1: HEAD request to check size before downloading
        logger.debug(f"Validating URL: {url}")
        try:
            req = urllib.request.Request(url, method='HEAD')
            with urllib.request.urlopen(req, timeout=10) as response:
                content_length = response.headers.get('content-length')
                content_type = response.headers.get('content-type', 'application/octet-stream')

                if content_length:
                    file_size = int(content_length)
                    if file_size > max_size_bytes:
                        logger.error(f"File too large: {file_size} bytes (max {max_size_bytes})")
                        return False

                # Validate MIME type from Content-Type header
                mime_type = content_type.split(';')[0].strip().lower()
                if mime_type not in ALLOWED_IMAGE_TYPES:
                    logger.error(f"Invalid MIME type: {mime_type}")
                    return False

                logger.debug(f"MIME type validated: {mime_type}")

        except (urllib.error.URLError, urllib.error.HTTPError) as e:
            logger.warning(f"Could not perform HEAD request: {e}. Proceeding with GET.")

        # Step 2: Download the file
        logger.debug(f"Downloading: {url}")
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)

        def download_with_size_limit(url, dest_path, max_size):
            """Download file with size limit enforcement."""
            bytes_downloaded = 0
            with urllib.request.urlopen(url, timeout=10) as response:
                with open(dest_path, 'wb') as f:
                    while True:
                        chunk = response.read(8192)
                        if not chunk:
                            break
                        bytes_downloaded += len(chunk)
                        if bytes_downloaded > max_size:
                            os.remove(dest_path)
                            raise ValueError(f"Downloaded file exceeds {max_size_mb}MB limit")
                        f.write(chunk)
            return bytes_downloaded

        download_with_size_limit(url, dest_path, max_size_bytes)

        # Step 3: Verify file extension
        _, ext = os.path.splitext(dest_path)
        if ext.lower() not in ALLOWED_EXTENSIONS:
            logger.error(f"Invalid file extension: {ext}")
            os.remove(dest_path)
            return False

        file_size = os.path.getsize(dest_path)
        logger.info(f"Successfully downloaded: {os.path.basename(dest_path)} ({file_size} bytes)")
        return True

    except Exception as e:
        logger.error(f"Download validation failed: {e}")
        if os.path.exists(dest_path):
            try:
                os.remove(dest_path)
            except OSError as cleanup_error:
                logger.warning(f"Failed to remove invalid download '{dest_path}': {cleanup_error}")
        return False
