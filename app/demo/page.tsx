'use client'

import Image from 'next/image'
import { useState } from 'react'
import { 
  Upload, 
  Scan, 
  Brain, 
  CheckCircle, 
  Save,
  ArrowRight,
  PlayCircle,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react'

export default function Demo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImageUrl('')
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    if (e.target.value) {
      setSelectedFile(null)
      setPreview(e.target.value)
    }
  }

  const processInvoice = async () => {
    if (!selectedFile && !imageUrl) {
      setError('Please select a file or enter an image URL')
      return
    }

    setProcessing(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      if (selectedFile) {
        formData.append('image', selectedFile)
      }
      if (imageUrl) {
        formData.append('imageUrl', imageUrl)
      }

      const response = await fetch('/api/process-invoice', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process invoice')
      }

      // If demo mode, show demo result
      if (data.demo) {
        // Fetch demo result
        const demoResponse = await fetch('/api/process-invoice?demo=true')
        const demoData = await demoResponse.json()
        setResult(demoData)
      } else {
        setResult(data)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process invoice')
    } finally {
      setProcessing(false)
    }
  }

  const steps = [
    {
      number: 1,
      icon: <Upload className="h-8 w-8" />,
      title: "Upload Invoice",
      description: "Upload an invoice image file (PNG, JPG) or provide a URL to the invoice image. The system supports various invoice formats and layouts.",
      color: "blue",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80"
    },
    {
      number: 2,
      icon: <Scan className="h-8 w-8" />,
      title: "OCR Text Extraction",
      description: "Tesseract OCR engine processes the image and extracts all visible text. The system uses optimized OCR settings for invoice layouts.",
      color: "purple",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
    },
    {
      number: 3,
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Parsing",
      description: "Google Gemini AI analyzes the extracted text, understands context, and structures the data into JSON format with proper field mapping.",
      color: "pink",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
    },
    {
      number: 4,
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Data Validation",
      description: "The system validates extracted data for accuracy, checks calculations, verifies required fields, and assigns confidence scores.",
      color: "green",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
    },
    {
      number: 5,
      icon: <Save className="h-8 w-8" />,
      title: "Save to Google Sheets",
      description: "Validated invoice data is automatically saved to Google Sheets with formatted worksheets for invoices, line items, and analytics.",
      color: "orange",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            See how our AI-powered system transforms invoice images into structured data
          </p>
        </div>
      </section>

      {/* Interactive Upload Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Try It Out
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Upload an invoice image or enter a URL to see the extraction in action
            </p>

            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Invoice Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</p>
                )}
              </div>

              {/* Or Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/invoice.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="relative w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
                    <Image
                      src={preview}
                      alt="Invoice preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={processInvoice}
                disabled={processing || (!selectedFile && !imageUrl)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Processing Invoice...
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Process Invoice
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Result Display */}
              {result && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Extraction Results</h3>
                  
                  {/* Invoice Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Invoice Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Vendor</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {result.invoice_data.vendor_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Invoice Number</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {result.invoice_data.invoice_number || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {result.invoice_data.date || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {result.invoice_data.currency} {result.invoice_data.total_amount}
                        </p>
                      </div>
                    </div>
                    {result.invoice_data.confidence_score && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Confidence Score</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${result.invoice_data.confidence_score * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {(result.invoice_data.confidence_score * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Line Items */}
                  {result.invoice_data.line_items && result.invoice_data.line_items.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Line Items</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-4">Description</th>
                              <th className="text-right py-2 px-4">Quantity</th>
                              <th className="text-right py-2 px-4">Unit Price</th>
                              <th className="text-right py-2 px-4">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.invoice_data.line_items.map((item: any, idx: number) => (
                              <tr key={idx} className="border-b">
                                <td className="py-2 px-4">{item.description}</td>
                                <td className="text-right py-2 px-4">
                                  {item.quantity || '-'}
                                </td>
                                <td className="text-right py-2 px-4">
                                  {item.unit_price ? `$${item.unit_price}` : '-'}
                                </td>
                                <td className="text-right py-2 px-4 font-semibold">
                                  ${item.amount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Validation Status */}
                  {result.validation && (
                    <div className={`rounded-lg p-4 ${
                      result.validation.is_valid
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <div className="flex items-center">
                        {result.validation.is_valid ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        )}
                        <h4 className="font-semibold text-gray-900">
                          {result.validation.is_valid ? 'Valid' : 'Needs Review'}
                        </h4>
                      </div>
                      {result.validation.requires_human_review && (
                        <p className="text-sm text-gray-600 mt-2">
                          This invoice requires human review
                        </p>
                      )}
                    </div>
                  )}

                  {/* JSON View */}
                  <details className="bg-gray-900 rounded-lg">
                    <summary className="text-white p-4 cursor-pointer font-semibold">
                      View Raw JSON Data
                    </summary>
                    <pre className="text-green-400 text-sm p-4 overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>

                  {result.demo && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> This is demo data. To process real invoices, set up the Python backend service.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            Processing Pipeline
          </h2>
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className={`${
                      step.color === 'blue' ? 'bg-blue-600' :
                      step.color === 'purple' ? 'bg-purple-600' :
                      step.color === 'pink' ? 'bg-pink-600' :
                      step.color === 'green' ? 'bg-green-600' :
                      'bg-orange-600'
                    } text-white w-16 h-16 rounded-full flex items-center justify-center mr-4 text-2xl font-bold`}>
                      {step.number}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  {step.number < steps.length && (
                    <div className="flex items-center text-blue-600 font-semibold">
                      Continue to Step {step.number + 1}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className={`absolute bottom-4 left-4 ${
                      step.color === 'blue' ? 'bg-blue-600' :
                      step.color === 'purple' ? 'bg-purple-600' :
                      step.color === 'pink' ? 'bg-pink-600' :
                      step.color === 'green' ? 'bg-green-600' :
                      'bg-orange-600'
                    } text-white px-6 py-3 rounded-lg`}>
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Simple Usage</h2>
          <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl mx-auto">
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{`# Initialize the pipeline
pipeline = InvoiceExtractionPipeline()

# Process a single invoice
result = pipeline.process_invoice("invoice.jpg")

# Or process multiple invoices
invoices = ["invoice1.jpg", "invoice2.jpg"]
results = pipeline.process_multiple_invoices(invoices)

# Access extracted data
print(result["invoice_data"]["vendor_name"])
print(result["invoice_data"]["total_amount"])
print(result["sheet_url"])  # Google Sheets link`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}
