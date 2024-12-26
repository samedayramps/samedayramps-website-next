import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const apiUrl = 'https://app.samedayramps.com/api/leads'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()
    return NextResponse.json(responseData, { status: response.status })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
} 