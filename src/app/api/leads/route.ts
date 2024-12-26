import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log("[API] Starting lead submission...")
    const data = await request.json()
    console.log("[API] Received form data:", data)
    
    const apiUrl = 'https://app.samedayramps.com/api/leads'
    console.log("[API] Sending to:", apiUrl)

    const requestConfig: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
    }
    console.log("[API] Request configuration:", requestConfig)

    const response = await fetch(apiUrl, requestConfig)
    console.log("[API] Response status:", response.status)
    console.log("[API] Response headers:", Object.fromEntries(response.headers.entries()))

    const responseData = await response.json()
    console.log("[API] Response data:", responseData)

    return NextResponse.json(responseData, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  } catch (error) {
    console.error("[API] Lead submission error:", error)
    console.error("[API] Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
} 