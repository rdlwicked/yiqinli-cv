# Research CV

Edit `yiqin-li-cv.tex`. It is public by default and contains no phone number.
The site serves this public PDF at `/docs/cv.pdf`.

To build locally with TeX Live and Poppler installed, run from the repository root:

```bash
mkdir -p tmp/pdfs output/pdf
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tmp/pdfs cv/yiqin-li-cv.tex
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tmp/pdfs cv/yiqin-li-cv.tex
pdfinfo tmp/pdfs/yiqin-li-cv.pdf
pdftoppm -scale-to 1500 -png tmp/pdfs/yiqin-li-cv.pdf tmp/pdfs/cv-page
```

Check that the PDF is at most two pages and inspect the rendered pages before copying:

```bash
cp tmp/pdfs/yiqin-li-cv.pdf public/docs/cv.pdf
cp tmp/pdfs/yiqin-li-cv.pdf output/pdf/yiqin-li-cv-public.pdf
npm run build
```

Update the CV links in `index.html` with the first 12 characters of the new
PDF's SHA-256 hash (`/docs/cv.pdf?v=HASH`) so browsers request the latest copy.

For a private formal copy, define `\cvphone` before loading the same source.
For example, create a local wrapper under the ignored `tmp/pdfs/` directory:

```tex
\def\cvphone{YOUR PHONE NUMBER}
\input{cv/yiqin-li-cv.tex}
```

Compile with a separate job name and save the result as
`output/pdf/yiqin-li-cv-formal.pdf`. Never copy the formal PDF or its wrapper
into `public/`; `output/`, `tmp/`, and `private/` are excluded from Git.
