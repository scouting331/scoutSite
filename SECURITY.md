# Security Policy

## 1. Our Commitment to Safety

The safety and privacy of our youth members is our highest priority. This policy
covers both **software vulnerabilities** (bugs, insecure dependencies) and
**privacy vulnerabilities** (accidental exposure of full names, locations,
contact info, or unapproved photos of Scouts).

## 2. Supported Versions

We actively maintain and apply security updates only to the main deployment
branch of our website.

| Version | Supported                 |
| ------- | ------------------------- |
| Main    | :white_check_mark: Active |
| All Old | :x: Unsupported           |

## 3. What Constitutes a Security Incident?

Please notify us immediately if you discover any of the following within this
repository:

- **Privacy Violations (High Severity):** Accidental disclosure of Personally
  Identifiable Information (PII) of youth members (e.g., full last names, phone
  numbers, home addresses, school locations, or medical forms).
- **Insecure Media:** Photos or avatars containing embedded GPS location
  metadata (EXIF data) or showing sensitive identifying details.
- **Credentials Leaks:** API tokens, GitHub secrets, webhooks, or passwords
  committed to the public code history.
- **Code Vulnerabilities:** Cross-Site Scripting (XSS) risks, outdated/malicious
  Docusaurus npm dependencies, or build pipeline vulnerabilities.

## 4. Reporting a Vulnerability

Do **NOT** open a public GitHub issue or pull request to report a security
vulnerability or privacy leak. Publicly disclosing a youth member's private data
or a site bug compromises unit safety.

### Step-by-Step Reporting Process

1. **Send a Private Email:** Contact our Adult Unit Leadership immediately at
   `scoutingunits331@gmail.com` and, if you are a Scout, at least one other adult.
2. **Include Key Details:** Describe what data or bug is exposed, where it is
   located (provide a file path or URL), and how you found it.
3. **Do Not Share:** Keep the details confidential until we have successfully
   removed or patched the issue.

## 5. Our Response Process

Upon receiving a security or privacy report, the adult system administrators
will:

1. **Acknowledge:** Respond to your email within 24 to 48 hours to confirm
   receipt.
2. **Triage & Scrub:** If a privacy leak has occurred, we will immediately
   delete the data. If necessary, we will scrub the repository's Git history to
   permanently erase the files from historical commits.
3. **Patch:** Update dependencies, fix configurations, or adjust Docusaurus
   components to resolve code flaws.
4. **Notify:** Confirm back to the reporter once the vulnerability has been
   completely resolved.
