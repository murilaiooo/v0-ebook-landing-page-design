import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimiter } from "./lib/security"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Adiciona cabeçalhos de segurança
  const headers = response.headers

  // Previne clickjacking
  headers.set("X-Frame-Options", "DENY")

  // Habilita proteção XSS no navegador
  headers.set("X-XSS-Protection", "1; mode=block")

  // Previne MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff")

  // Política de segurança de conteúdo (CSP)
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://postimg.cc; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://postimg.cc https://i.postimg.cc https://placeholder.svg; font-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none';",
  )

  // Política de referrer
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Desabilita cache para conteúdo dinâmico
  headers.set("Cache-Control", "no-store, max-age=0")

  // Implementa rate limiting básico
  const ip = request.ip || "127.0.0.1"
  const isAllowed = rateLimiter(ip, 100, 60000) // 100 requisições por minuto

  if (!isAllowed) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
