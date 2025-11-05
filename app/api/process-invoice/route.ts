import { NextRequest, NextResponse } from 'next/server'

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const imageUrl = formData.get('imageUrl') as string | null

    if (!image && !imageUrl) {
      return NextResponse.json(
        { error: 'No image or image URL provided' },
        { status: 400 }
      )
    }

    // Try to connect to Python backend first
    try {
      const backendResponse = await fetch(`${PYTHON_BACKEND_URL}/process-invoice`, {
        method: 'POST',
        body: formData,
        // Note: In production, you may need to handle CORS differently
      })

      if (backendResponse.ok) {
        const data = await backendResponse.json()
        return NextResponse.json(data)
      }
    } catch (backendError) {
      // Backend not available, fall back to demo mode
      console.log('Python backend not available, using demo mode')
    }

    // Fallback: Return demo data if backend is not available
    // This allows the frontend to work even without the Python backend
    return NextResponse.json({
      invoice_data: {
        vendor_name: imageUrl ? "XYZ Software Solutions" : "Demo Vendor",
        invoice_number: "INV-2025-002",
        date: new Date().toISOString().split('T')[0],
        line_items: [
          {
            description: "Software License (Annual)",
            quantity: 2.0,
            unit_price: 150.0,
            amount: 300.0
          },
          {
            description: "Installation Support (Hours)",
            quantity: 1.0,
            unit_price: 850.0,
            amount: 850.0
          }
        ],
        subtotal: 1600.0,
        tax_amount: 1350.0,
        total_amount: 2950.0,
        currency: "USD",
        vendor_address: "456 Cyber Street, Hyderabad, India",
        confidence_score: 0.9
      },
      validation: {
        is_valid: true,
        errors: [],
        warnings: [],
        requires_human_review: false
      },
      metadata: {
        processed_at: new Date().toISOString(),
        source: imageUrl || (image ? image.name : 'unknown')
      },
      demo: true,
      note: "Python backend not configured. See backend-api-setup.md for setup instructions."
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process invoice' },
      { status: 500 }
    )
  }
}

// For demo purposes - simulate invoice processing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const demo = searchParams.get('demo')

  if (demo === 'true') {
    // Return demo data
    return NextResponse.json({
      invoice_data: {
        vendor_name: "XYZ Software Solutions",
        invoice_number: "INV-2025-002",
        date: "2025-11-05",
        line_items: [
          {
            description: "Software License (Annual)",
            quantity: 2.0,
            unit_price: 150.0,
            amount: 300.0
          },
          {
            description: "Installation Support (Hours)",
            quantity: 1.0,
            unit_price: 850.0,
            amount: 850.0
          }
        ],
        subtotal: 1600.0,
        tax_amount: 1350.0,
        total_amount: 2950.0,
        currency: "USD",
        vendor_address: "456 Cyber Street, Hyderabad, India",
        confidence_score: 0.9
      },
      validation: {
        is_valid: true,
        errors: [],
        warnings: [],
        requires_human_review: false
      },
      metadata: {
        processed_at: new Date().toISOString(),
        source: "demo"
      },
      demo: true
    })
  }

  return NextResponse.json(
    { error: 'Use POST method to process invoices' },
    { status: 405 }
  )
}
