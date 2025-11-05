import Image from 'next/image'
import { Target, Users, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">About The Project</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            An intelligent invoice extraction system combining cutting-edge OCR technology 
            with powerful AI for automated document processing
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <p className="text-lg text-gray-600 mb-4">
                This project represents a comprehensive solution for automating invoice and receipt 
                processing through the integration of multiple advanced technologies. The system 
                addresses the common challenge of manual data entry from physical and digital invoices.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                By leveraging Tesseract OCR for text extraction and Google Gemini AI for intelligent 
                parsing, the system can accurately extract structured data including vendor information, 
                line items, amounts, dates, and more from various invoice formats.
              </p>
              <p className="text-lg text-gray-600">
                The extracted data is automatically validated for accuracy and consistency, then 
                seamlessly stored in Google Sheets for easy access, analysis, and integration with 
                existing workflows.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Data Analytics"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-600">
                To revolutionize document processing by eliminating manual data entry and reducing 
                errors through intelligent automation.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-600">
                To become the leading solution for automated document processing, helping businesses 
                save time and resources while improving accuracy.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Team</h3>
              <p className="text-gray-600">
                Developed as a collaborative academic project by a dedicated team of students 
                passionate about AI and automation.
              </p>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Problem We Solve</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                Manual invoice processing is time-consuming, error-prone, and expensive. Businesses 
                spend countless hours manually entering invoice data, which leads to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>High labor costs and reduced productivity</li>
                <li>Human errors in data entry</li>
                <li>Delayed payment processing</li>
                <li>Difficulty in tracking and organizing invoices</li>
                <li>Lack of real-time visibility into expenses</li>
              </ul>
              <p className="pt-4">
                Our solution automates this entire process, reducing processing time by 90% and 
                eliminating manual errors.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Solution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Automated Extraction</h3>
                <p className="text-gray-600">
                  Simply upload an invoice image, and our system automatically extracts all relevant 
                  information including vendor details, line items, amounts, dates, and more.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Intelligent Parsing</h3>
                <p className="text-gray-600">
                  Powered by Google Gemini AI, the system understands context and extracts structured 
                  data with high accuracy, even from non-standard invoice formats.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
                <p className="text-gray-600">
                  Built-in validation ensures data accuracy with confidence scoring and automatic 
                  error detection, flagging items that require human review.
                </p>
              </div>
              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Seamless Integration</h3>
                <p className="text-gray-600">
                  Direct integration with Google Sheets provides instant access to extracted data, 
                  making it easy to analyze, share, and integrate with existing systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
