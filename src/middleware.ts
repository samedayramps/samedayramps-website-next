import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verify requests to the leads API endpoint
  if (request.nextUrl.pathname === '/api/leads') {
    const apiKey = request.headers.get('X-API-Key')
    
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
} 