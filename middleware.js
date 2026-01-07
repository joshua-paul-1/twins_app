import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return new NextResponse(
      '🚧 Site under maintenance. Back soon.',
      { status: 503 }
    )
  }
}

