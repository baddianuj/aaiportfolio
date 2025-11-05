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
