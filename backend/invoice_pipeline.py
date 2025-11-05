import os
import re
from datetime import datetime
from io import BytesIO
from typing import Any, Dict, List, Optional

import pytesseract
import requests
from PIL import Image
from pydantic import BaseModel

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser

from .invoice_models import InvoiceData, ValidationResult


class OCRProcessor:
	"""Handles OCR extraction from images"""

	def __init__(self, tesseract_config: str = r"--oem 3 --psm 6"):
		self.tesseract_config = tesseract_config

	def extract_text_from_image(self, image_path_or_url: str) -> str:
		"""Extract text from image using Tesseract OCR"""
		try:
			if image_path_or_url.startswith("http"):
				response = requests.get(image_path_or_url)
				response.raise_for_status()
				img = Image.open(BytesIO(response.content))
			else:
				img = Image.open(image_path_or_url)

			text = pytesseract.image_to_string(img, config=self.tesseract_config)
			return text.strip()
		except Exception as e:
			return f"Error extracting text: {str(e)}"


class InvoiceParsingAgent:
	"""Agent for parsing extracted text into structured invoice data using Gemini"""

	def __init__(self, model: str = "gemini-2.0-flash-exp", temperature: float = 0.0):
		api_key = os.environ.get("GOOGLE_API_KEY")
		if not api_key:
			raise RuntimeError("GOOGLE_API_KEY not set")
		self.llm = ChatGoogleGenerativeAI(model=model, temperature=temperature)
		self.parser = PydanticOutputParser(pydantic_object=InvoiceData)
		self.parsing_prompt = PromptTemplate(
			template=(
				"You are an expert at extracting structured information from invoice and receipt text.\n\n"
				"Extract the following information from the text below and format it according to the schema.\n\n"
				"Text to parse:\n{text}\n\n"
				"Instructions:\n"
				"- Extract vendor name, invoice number, date, line items, tax, and total\n"
				"- Parse dates into YYYY-MM-DD format\n"
				"- Extract numeric values carefully (remove currency symbols)\n"
				"- For line items, identify description, quantity, unit price, and amount\n"
				"- If information is not present, use null\n"
				"- Calculate subtotal if not explicitly stated\n"
				"- Assign a confidence score based on text clarity (0.0 to 1.0)\n\n"
				"{format_instructions}\n\n"
				"Extracted Data:"
			),
			input_variables=["text"],
			partial_variables={"format_instructions": self.parser.get_format_instructions()},
		)
		self.chain = self.parsing_prompt | self.llm | self.parser

	def parse(self, text: str) -> InvoiceData:
		try:
			result = self.chain.invoke({"text": text})
			return result
		except Exception as e:
			# Fallback minimal structure
			return InvoiceData(
				vendor_name="Unknown",
				line_items=[],
				total_amount=0.0,
				confidence_score=0.0,
			)


class ValidationAgent:
	"""Validates extracted invoice data against business rules"""

	def __init__(self):
		self.validation_rules = {
			"min_confidence": 0.7,
			"max_amount": 100000,
			"required_fields": ["vendor_name", "total_amount"],
			"date_format": r"\d{4}-\d{2}-\d{2}",
		}

	def validate(self, invoice_data: InvoiceData) -> ValidationResult:
		errors: List[str] = []
		warnings: List[str] = []

		# Required fields
		for field in self.validation_rules["required_fields"]:
			if not getattr(invoice_data, field, None):
				errors.append(f"Missing required field: {field}")

		# Confidence
		if invoice_data.confidence_score and invoice_data.confidence_score < self.validation_rules["min_confidence"]:
			warnings.append(f"Low confidence score: {invoice_data.confidence_score:.2f}")

		# Max amount sanity check
		if invoice_data.total_amount and invoice_data.total_amount > self.validation_rules["max_amount"]:
			warnings.append(f"Unusually high amount: {invoice_data.total_amount}")

		# Subtotal + tax == total
		if invoice_data.subtotal is not None and invoice_data.tax_amount is not None and invoice_data.total_amount is not None:
			calculated_total = (invoice_data.subtotal or 0.0) + (invoice_data.tax_amount or 0.0)
			if abs(calculated_total - invoice_data.total_amount) > 0.01:
				errors.append(
					f"Total amount mismatch: {invoice_data.total_amount} != {calculated_total}"
				)

		# Date format
		if invoice_data.date and not re.match(self.validation_rules["date_format"], invoice_data.date):
			errors.append(f"Invalid date format: {invoice_data.date}")

		requires_review = (
			len(errors) > 0
			or len(warnings) > 2
			or (invoice_data.confidence_score is not None and invoice_data.confidence_score < 0.6)
		)

		return ValidationResult(
			is_valid=len(errors) == 0,
			errors=errors,
			warnings=warnings,
			requires_human_review=requires_review,
		)


class InvoiceExtractionPipeline:
	"""Complete pipeline for invoice extraction"""

	def __init__(self):
		self.ocr = OCRProcessor()
		self.parser = InvoiceParsingAgent()
		self.validator = ValidationAgent()

	def process_invoice(self, image_path_or_url: str, save_to_sheets: bool = False) -> Dict[str, Any]:
		raw_text = self.ocr.extract_text_from_image(image_path_or_url)
		invoice_data = self.parser.parse(raw_text)
		validation_result = self.validator.validate(invoice_data)
		result = {
			"raw_text": raw_text,
			"invoice_data": invoice_data.model_dump(),
			"validation": validation_result.model_dump(),
			"metadata": {
				"processed_at": datetime.now().isoformat(),
				"source": image_path_or_url,
			},
		}
		# Google Sheets save is disabled by default in backend service for portability
		return result
