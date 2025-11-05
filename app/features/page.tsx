import { 
  FileText, 
  Sparkles, 
  Shield, 
  Database, 
  Zap, 
  CheckCircle,
  BarChart3,
  Upload,
  Eye
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Easy Upload",
      description: "Upload invoice images via file path or URL. Supports multiple image formats including PNG, JPG, and PDF pages.",
      color: "blue"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "OCR Text Extraction",
      description: "Advanced Tesseract OCR engine extracts text from invoice images with configurable PSM modes for optimal accuracy.",
      color: "purple"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Parsing",
      description: "Google Gemini AI intelligently parses extracted text into structured JSON data with proper field mapping and context understanding.",
      color: "pink"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Smart Validation",
      description: "Comprehensive validation system checks for required fields, data consistency, amount calculations, and assigns confidence scores.",
      color: "green"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Google Sheets Storage",
      description: "Automatically save extracted invoice data to Google Sheets with separate worksheets for invoices, line items, and summary dashboard.",
      color: "orange"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Built-in summary dashboard with real-time metrics including total processed invoices, amounts, and validation statistics.",
      color: "indigo"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Error Detection",
      description: "Automatic flagging of invoices requiring human review based on validation errors, warnings, and low confidence scores.",
      color: "red"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Batch Processing",
      description: "Process multiple invoices in a single batch operation, saving time and enabling bulk document processing workflows.",
      color: "yellow"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Confidence Scoring",
      description: "Each extraction includes a confidence score (0-1) indicating the reliability of the extracted data for quality control.",
      color: "teal"
    }
  ]

  const colorClasses = {
    blue: "bg-blue-600 text-white",
    purple: "bg-purple-600 text-white",
    pink: "bg-pink-600 text-white",
    green: "bg-green-600 text-white",
    orange: "bg-orange-600 text-white",
    indigo: "bg-indigo-600 text-white",
    red: "bg-red-600 text-white",
    yellow: "bg-yellow-600 text-white",
    teal: "bg-teal-600 text-white"
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Features</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive capabilities for intelligent invoice processing and data extraction
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all hover:border-blue-300"
              >
                <div className={`${colorClasses[feature.color as keyof typeof colorClasses]} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Key Capabilities
          </h2>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Comprehensive Data Extraction
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Extract all relevant information from invoices including:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Vendor name and contact information
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Invoice/receipt number
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Invoice date (formatted)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Line items with descriptions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Quantities and unit prices
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Subtotal, tax, and total amounts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Payment method
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Currency information
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Intelligent Processing Pipeline
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600">
                    <p>
                      Our multi-stage processing pipeline ensures accurate and reliable results:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li><strong>OCR Extraction:</strong> Convert invoice images to text using Tesseract OCR</li>
                      <li><strong>AI Parsing:</strong> Use Gemini AI to understand context and extract structured data</li>
                      <li><strong>Validation:</strong> Verify data accuracy and consistency with business rules</li>
                      <li><strong>Storage:</strong> Save validated data to Google Sheets with proper formatting</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Robust Validation System
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Multiple validation checks ensure data quality:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Required Fields Check</h4>
                      <p className="text-gray-600 text-sm">
                        Validates presence of critical fields like vendor name and total amount
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Amount Verification</h4>
                      <p className="text-gray-600 text-sm">
                        Verifies that subtotal + tax equals total amount
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Confidence Scoring</h4>
                      <p className="text-gray-600 text-sm">
                        Assigns confidence scores to indicate extraction reliability
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Human Review Flags</h4>
                      <p className="text-gray-600 text-sm">
                        Automatically flags invoices that need manual review
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
