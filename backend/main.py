import os
from io import BytesIO
from typing import Optional

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .invoice_pipeline import InvoiceExtractionPipeline

app = FastAPI(title="Invoice AI Backend", version="1.0.0")

# CORS (allow local Next.js and Vercel preview)
origins = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"https://*.vercel.app",
	"https://vercel.app",
]
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Initialize pipeline lazily so GOOGLE_API_KEY can be set first
_pipeline: Optional[InvoiceExtractionPipeline] = None

def get_pipeline() -> InvoiceExtractionPipeline:
	global _pipeline
	if _pipeline is None:
		_pipeline = InvoiceExtractionPipeline()
	return _pipeline

@app.get("/health")
def health():
	return {"status": "ok"}

@app.post("/process-invoice")
async def process_invoice(image: Optional[UploadFile] = File(None), imageUrl: Optional[str] = Form(None)):
	try:
		if not image and not imageUrl:
			return JSONResponse({"error": "No image or imageUrl provided"}, status_code=400)

		if image is not None:
			# Save to a temp path (or process from bytes)
			content = await image.read()
			tmp_path = f"/tmp/{image.filename}"
			with open(tmp_path, "wb") as f:
				f.write(content)
			source = tmp_path
		else:
			source = imageUrl  # type: ignore

		pipeline = get_pipeline()
		result = pipeline.process_invoice(source, save_to_sheets=False)
		return JSONResponse(result)
	except Exception as e:
		return JSONResponse({"error": str(e)}, status_code=500)
