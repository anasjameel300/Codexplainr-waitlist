import { NextRequest, NextResponse } from 'next/server'

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

// Get location from IP address using ipapi.co (free tier: 1000 requests/day)
async function getLocationFromIP(ip: string): Promise<string> {
  // Skip if IP is unknown or localhost
  if (ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'Unknown'
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Codexplainr-Waitlist/1.0'
      }
    })

    if (!response.ok) {
      throw new Error('IP geolocation failed')
    }

    const data = await response.json()
    
    // Format: City, Country or just Country if city is not available
    if (data.error) {
      return 'Unknown'
    }

    const city = data.city || ''
    const country = data.country_name || data.country || 'Unknown'
    
    if (city) {
      return `${city}, ${country}`
    }
    return country
  } catch (error) {
    console.error('Error fetching location:', error)
    return 'Unknown'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get client IP and location
    const clientIP = getClientIP(request)
    const location = await getLocationFromIP(clientIP)

    // Generate timestamp
    const timestamp = new Date().toISOString()

    // Get Google Apps Script web app URL from environment variable
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

    if (!scriptUrl) {
      console.error('GOOGLE_APPS_SCRIPT_URL is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Send data to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp,
        location,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Apps Script error:', errorText)
      return NextResponse.json(
        { error: 'Failed to save to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing waitlist submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

