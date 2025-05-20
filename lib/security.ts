/**
 * Biblioteca de funções de segurança para o site
 */

// Função para sanitizar inputs de texto para prevenir XSS
export function sanitizeInput(input: string): string {
  if (!input) return ""

  // Remove tags HTML potencialmente perigosos
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/`/g, "&#96;")
}

// Função para validar emails
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar números de telefone brasileiros
export function validateBrazilianPhone(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, "")
  // Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
  return cleanPhone.length >= 10 && cleanPhone.length <= 11
}

// Função para gerar um token CSRF
export function generateCSRFToken(): string {
  return Array(32)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")
}

// Função para verificar se uma string contém código malicioso
export function containsMaliciousCode(input: string): boolean {
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+=/gi,
    /data:/gi,
    /vbscript:/gi,
    /expression\(/gi,
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(input))
}

// Função para limitar a taxa de requisições (implementação básica)
const requestCounts: Record<string, { count: number; timestamp: number }> = {}

export function rateLimiter(ip: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now()

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, timestamp: now }
    return true
  }

  const windowStart = now - windowMs

  if (requestCounts[ip].timestamp < windowStart) {
    // Reset se o tempo da janela passou
    requestCounts[ip] = { count: 1, timestamp: now }
    return true
  }

  // Incrementa contador
  requestCounts[ip].count += 1

  // Verifica se excedeu o limite
  return requestCounts[ip].count <= limit
}

// Função para limpar dados antigos do rate limiter (deve ser chamada periodicamente)
export function cleanupRateLimiter(maxAge = 3600000): void {
  const now = Date.now()
  Object.keys(requestCounts).forEach((ip) => {
    if (now - requestCounts[ip].timestamp > maxAge) {
      delete requestCounts[ip]
    }
  })
}
