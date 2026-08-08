HOW TO ADD YOUR REAL CERTIFICATES TO THIS SITE
================================================

This "documents" folder is where the actual scanned certificates go so
visitors can view and download them directly from the Credentials page.

The site is already wired up to look for these exact four filenames.
Scan or export each certificate as a PDF, name it exactly as shown below
(all lowercase, hyphens not spaces), and upload it into this same
"documents" folder on your web host:

  1. certificate-of-reregistration.pdf   (Certificate of Re-registration)
  2. practising-certificate.pdf          (Practising Certificate No. 148)
  3. zimra-tax-clearance.pdf             (ZIMRA Tax Clearance / ITF263)
  4. entity-summary.pdf                  (Entity Summary & Directors)

WHAT HAPPENS AUTOMATICALLY
---------------------------
- The Credentials page checks for each file the moment it loads.
- Any file that's present gets a live PDF preview and a "Download PDF"
  button, both in the quick-access "Document Library" list and inside
  each certificate's detail popup.
- Any file that's missing just shows "Not yet uploaded" instead of a
  broken link or an error — nothing looks broken while you're still
  gathering documents.

ADDING MORE DOCUMENTS LATER
-----------------------------
To add a 5th document (e.g. a new annual tax clearance each year), you
only need to:
  1. Upload the new PDF into this folder.
  2. Ask your developer to add one entry to the docContent list in
     main.js (or hand them this file — it takes under five minutes).

You do not need any coding knowledge to update the PDFs themselves —
only to add a brand-new certificate type that isn't one of the four
above.

FILE SIZE
---------
Keep each PDF under ~5MB where possible so the page stays fast to load.
Scan at 150-200 DPI rather than maximum quality — a certificate doesn't
need print resolution to be legible on screen.
