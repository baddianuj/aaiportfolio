# Python Backend API Setup Guide

To make the invoice extraction fully functional, you need to set up a Python backend service. Here's how:

## Option 1: Flask API (Recommended for Development)

### Step 1: Create Flask Backend

Create a file `backend/app.py`:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add your notebook code here or import it
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Import your invoice extraction pipeline
# from invoice_pipeline import InvoiceExtractionPipeline

# Initialize pipeline
# pipeline = InvoiceExtractionPipeline()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/process-invoice', methods=['POST'])
def process_invoice():
    try:
        if 'image' in request.files:
            file = request.files['image']
            image_path = f'/tmp/{file.filename}'
            file.save(image_path)
            
            # Process with your pipeline
            # result = pipeline.process_invoice(image_path, save_to_sheets=False)
            
            # For now, return demo data
            result = {
                "invoice_data": {
                    "vendor_name": "Demo Vendor",
                    "invoice_number": "INV-001",
                    "total_amount": 1000.0,
                    "currency": "USD"
                },
                "validation": {"is_valid": True}
            }
            
            return jsonify(result)
            
        elif 'imageUrl' in request.form:
            image_url = request.form['imageUrl']
            # Process URL
            # result = pipeline.process_invoice(image_url, save_to_sheets=False)
            
            return jsonify({"message": "URL processing not yet implemented"})
            
        return jsonify({"error": "No image provided"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

### Step 2: Install Dependencies

```bash
pip install flask flask-cors
```

### Step 3: Run Flask Server

```bash
python backend/app.py
```

## Option 2: FastAPI (Better for Production)

### Step 1: Create FastAPI Backend

Create `backend/main.py`:

```python
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/process-invoice")
async def process_invoice(
    image: Optional[UploadFile] = File(None),
    imageUrl: Optional[str] = Form(None)
):
    try:
        if image:
            # Save and process image
            contents = await image.read()
            # Process with your pipeline
            # result = pipeline.process_invoice(...)
            return {"message": "Image processing"}
        
        elif imageUrl:
            # Process URL
            # result = pipeline.process_invoice(imageUrl)
            return {"message": "URL processing"}
            
        return {"error": "No image provided"}, 400
        
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
```

### Step 2: Install Dependencies

```bash
pip install fastapi uvicorn python-multipart
```

### Step 3: Run FastAPI Server

```bash
uvicorn backend.main:app --reload --port 5000
```

## Option 3: Integrate Python Code Directly in Next.js API Route

If you want to keep everything in Next.js, you can use `child_process` to run Python scripts:

Update `app/api/process-invoice/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Save uploaded file temporarily
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tempPath = path.join('/tmp', image.name)
    await fs.writeFile(tempPath, buffer)

    // Run Python script
    const pythonScript = path.join(process.cwd(), 'scripts', 'process_invoice.py')
    const { stdout, stderr } = await execAsync(
      `python3 ${pythonScript} ${tempPath}`
    )

    if (stderr) {
      throw new Error(stderr)
    }

    const result = JSON.parse(stdout)

    // Clean up temp file
    await fs.unlink(tempPath)

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process invoice' },
      { status: 500 }
    )
  }
}
```

## Update Next.js API Route to Call Backend

Once your Python backend is running, update `app/api/process-invoice/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Forward request to Python backend
    const response = await fetch(`${PYTHON_BACKEND_URL}/process-invoice`, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Backend error' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to connect to backend' },
      { status: 500 }
    )
  }
}
```

## Environment Variables

Add to `.env.local`:

```
PYTHON_BACKEND_URL=http://localhost:5000
```

## Deployment Options

### 1. Deploy Python Backend Separately
- Deploy Flask/FastAPI to Heroku, Railway, or Render
- Update `PYTHON_BACKEND_URL` in Vercel environment variables

### 2. Use Serverless Functions
- Convert Python code to AWS Lambda functions
- Use Vercel Serverless Functions with Python runtime

### 3. Docker Container
- Containerize Python backend
- Deploy to services that support Docker

## Testing

Test the backend directly:

```bash
curl -X POST http://localhost:5000/process-invoice \
  -F "image=@invoice.jpg"
```

Then test through Next.js:

```bash
curl -X POST http://localhost:3000/api/process-invoice \
  -F "image=@invoice.jpg"
```
