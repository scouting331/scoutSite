"""Logging configuration for GitHub Actions automation scripts.

Provides structured logging with configurable verbosity level
based on DEBUG environment variable.
"""
import logging
import os
import sys

def setup_logging(name=None, debug=None):
    """Configure logging for the script.

    Args:
        name (str): Logger name (usually __name__)
        debug (bool): Override DEBUG env var. If None, uses DEBUG env var

    Returns:
        logging.Logger: Configured logger instance
    """
    if debug is None:
        debug = os.getenv('DEBUG', '').lower() in ('true', '1', 'yes')

    logger = logging.getLogger(name or '__main__')

    # Only configure if not already configured
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)

        if debug:
            level = logging.DEBUG
            fmt = '[%(levelname)s] %(message)s'
        else:
            level = logging.INFO
            fmt = '[%(levelname)s] %(message)s'

        formatter = logging.Formatter(fmt)
        handler.setFormatter(formatter)
        logger.setLevel(level)
        logger.addHandler(handler)

    return logger
