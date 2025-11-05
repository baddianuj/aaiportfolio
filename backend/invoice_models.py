from typing import List, Optional
from pydantic import BaseModel, Field


class LineItem(BaseModel):
	"""Individual line item in an invoice"""
	description: str = Field(description="Item or service description")
	quantity: Optional[float] = Field(default=None, description="Quantity purchased")
	unit_price: Optional[float] = Field(default=None, description="Price per unit")
	amount: float = Field(description="Total amount for this line item")


class InvoiceData(BaseModel):
	"""Structured invoice/receipt data"""
	vendor_name: str = Field(description="Name of the vendor or merchant")
	invoice_number: Optional[str] = Field(default=None, description="Invoice or receipt number")
	date: Optional[str] = Field(default=None, description="Invoice date in YYYY-MM-DD format")
	line_items: List[LineItem] = Field(default_factory=list, description="List of purchased items")
	subtotal: Optional[float] = Field(default=None, description="Subtotal before tax")
	tax_amount: Optional[float] = Field(default=None, description="Total tax amount")
	total_amount: float = Field(default=0.0, description="Final total amount")
	currency: str = Field(default="USD", description="Currency code")
	vendor_address: Optional[str] = Field(default=None, description="Vendor address")
	vendor_phone: Optional[str] = Field(default=None, description="Vendor phone number")
	payment_method: Optional[str] = Field(default=None, description="Payment method used")
	confidence_score: Optional[float] = Field(default=None, description="Extraction confidence (0-1)")


class ValidationResult(BaseModel):
	"""Validation result for extracted invoice data"""
	is_valid: bool = Field(description="Whether the invoice data is valid")
	errors: List[str] = Field(default_factory=list, description="List of validation errors")
	warnings: List[str] = Field(default_factory=list, description="List of warnings")
	requires_human_review: bool = Field(default=False, description="Whether human review is needed")
