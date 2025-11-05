import Image from 'next/image'
import { 
  Code, 
  Brain, 
  Database, 
  Cloud, 
  Layers,
  FileCode,
  Zap
} from 'lucide-react'

export default function Technology() {
  const techCategories = [
    {
      title: "AI & Machine Learning",
      icon: <Brain className="h-8 w-8" />,
      technologies: [
        {
          name: "Google Gemini AI",
          description: "Advanced large language model for intelligent text parsing and structured data extraction",
          color: "from-blue-500 to-purple-500"
        },
        {
          name: "LangChain",
          description: "Framework for building applications with LLMs, enabling prompt templating and output parsing",
          color: "from-green-500 to-teal-500"
        },
        {
          name: "Pydantic",
          description: "Data validation library for ensuring extracted data conforms to expected schemas",
          color: "from-yellow-500 to-orange-500"
        }
      ]
    },
    {
      title: "OCR & Image Processing",
      icon: <FileCode className="h-8 w-8" />,
      technologies: [
        {
          name: "Tesseract OCR",
          description: "Industry-standard OCR engine for extracting text from invoice images with high accuracy",
          color: "from-red-500 to-pink-500"
        },
        {
          name: "Pillow (PIL)",
          description: "Python Imaging Library for image processing and manipulation",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "pdf2image",
          description: "Library for converting PDF documents to images for OCR processing",
          color: "from-gray-600 to-gray-800"
        }
      ]
    },
    {
      title: "Data Storage & Integration",
      icon: <Database className="h-8 w-8" />,
      technologies: [
        {
          name: "Google Sheets API",
          description: "RESTful API for programmatically accessing and updating Google Sheets",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "gspread",
          description: "Python library for interacting with Google Sheets with OAuth2 authentication",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "pandas",
          description: "Data manipulation and analysis library for processing extracted invoice data",
          color: "from-purple-500 to-pink-500"
        }
      ]
    },
    {
      title: "Development & Deployment",
      icon: <Code className="h-8 w-8" />,
      technologies: [
        {
          name: "Python 3",
          description: "Primary programming language for the invoice processing pipeline",
          color: "from-yellow-400 to-blue-500"
        },
        {
          name: "Google Colab",
          description: "Cloud-based Jupyter notebook environment for development and execution",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "Next.js 14",
          description: "React framework for building this portfolio website with server-side rendering",
          color: "from-gray-900 to-gray-700"
        },
        {
          name: "TypeScript",
          description: "Type-safe JavaScript for building robust and maintainable web applications",
          color: "from-blue-600 to-blue-800"
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid UI development and responsive design",
          color: "from-teal-400 to-cyan-600"
        }
      ]
    }
  ]

  const architecture = [
    {
      step: 1,
      title: "Input Processing",
      description: "Invoice image uploaded via file path or URL",
      icon: "📄"
    },
    {
      step: 2,
      title: "OCR Extraction",
      description: "Tesseract OCR extracts raw text from the image",
      icon: "👁️"
    },
    {
      step: 3,
      title: "AI Parsing",
      description: "Gemini AI parses text into structured JSON data",
      icon: "🤖"
    },
    {
      step: 4,
      title: "Validation",
      description: "Data validated against business rules and quality checks",
      icon: "✔️"
    },
    {
      step: 5,
      title: "Storage",
      description: "Validated data saved to Google Sheets with formatting",
      icon: "💾"
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Technology Stack</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Cutting-edge technologies powering our intelligent invoice extraction system
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            System Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {architecture.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center border-2 border-blue-200">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {index < architecture.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-400 text-2xl z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Technologies We Use
          </h2>
          <div className="space-y-12">
            {techCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-300"
                    >
                      <div className={`bg-gradient-to-r ${tech.color} w-full h-2 rounded-full mb-4`}></div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Libraries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Key Libraries & Frameworks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "langchain",
              "langchain-google-genai",
              "pytesseract",
              "gspread",
              "pandas",
              "openpyxl",
              "google-auth",
              "requests",
              "Pillow",
              "pydantic",
              "Next.js",
              "React"
            ].map((lib, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all"
              >
                <div className="font-semibold text-gray-900 text-sm">{lib}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Stack */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Why This Technology Stack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <Zap className="h-10 w-10 mb-4 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-3">Performance</h3>
              <p className="text-blue-100">
                Optimized libraries and cloud infrastructure ensure fast processing times
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <Layers className="h-10 w-10 mb-4 text-green-300" />
              <h3 className="text-2xl font-bold mb-3">Scalability</h3>
              <p className="text-blue-100">
                Modular architecture allows easy scaling and integration with other systems
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <Cloud className="h-10 w-10 mb-4 text-purple-300" />
              <h3 className="text-2xl font-bold mb-3">Cloud-Native</h3>
              <p className="text-blue-100">
                Built for cloud deployment with Google services integration
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
