# Invoice AI Backend (FastAPI)

A lightweight FastAPI service exposing the invoice extraction pipeline using Tesseract OCR and Gemini (via LangChain).

## Prerequisites
- Python 3.10+
- Tesseract installed on your system (Windows: install Tesseract OCR and set PATH; Linux: `apt-get install tesseract-ocr`)
- Google API Key for Gemini: set `GOOGLE_API_KEY`

## Install
```bash
cd backend
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1
# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
```

## Run
```bash
# Set your environment variable
# PowerShell (Windows)
setx GOOGLE_API_KEY "YOUR_KEY_HERE"
$env:GOOGLE_API_KEY = "YOUR_KEY_HERE"

# macOS/Linux
# export GOOGLE_API_KEY=YOUR_KEY_HERE

uvicorn backend.main:app --reload --port 5000
```

## Test
```bash
# Health
curl http://localhost:5000/health

# Image upload
curl -X POST http://localhost:5000/process-invoice \
  -F "image=@/absolute/path/to/invoice.jpg"

# Image URL
curl -X POST http://localhost:5000/process-invoice \
  -F "imageUrl=https://example.com/invoice.png"
```

## Notes
- Google Sheets storage is disabled by default on the backend for portability.
- If you need Google Sheets, use service-account auth and extend the pipeline accordingly.
