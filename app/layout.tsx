import Script from 'next/script'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AntiCopy } from '@/components/anti-copy'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Guia Definitivo do Lucro Automático - 8 Fontes de Renda Passiva',
  description:
    'Descubra como pessoas comuns estão gerando R$2.500 a R$4.500 por mês com métodos simples e acessíveis, mesmo começando do zero.',
  keywords:
    'renda passiva, investimentos, liberdade financeira, FIIs, dividendos, royalties, infoprodutos',
  authors: [{ name: 'Ricardo Almeida', url: 'https://lucroautomatico.com.br' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preload de fontes críticas */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Meta tags de segurança */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://postimg.cc;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https://postimg.cc https://i.postimg.cc https://placeholder.svg;
            font-src 'self' data:;
            connect-src 'self';
            frame-src 'none';
            object-src 'none';
          `}
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        {/* GTM: snippet principal */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id=GTM-MWRM85MD'+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MWRM85MD');
          `}
        </Script>

        {/* Google Analytics: carregando a lib */}
        <Script
          id="gtag-lib"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9C8QFS0HVF"
        />

        {/* Google Analytics: inicialização */}
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9C8QFS0HVF', { send_page_view: true });
          `}
        </Script>
      </head>

      <body className={inter.className}>
        {/* GTM fallback para quem não tiver JS */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-MWRM85MD"
                height="0" width="0"
                style="display:none;visibility:hidden"
              ></iframe>
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AntiCopy>{children}</AntiCopy>
        </ThemeProvider>
      </body>
    </html>
  )
}
