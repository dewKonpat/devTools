import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevTools',
  description: 'Utility tools',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/json-formatter', label: 'JSON Formatter' },
    { href: '/jwt-decoder', label: 'JWT Decoder' },
    { href: '/text-diff', label: 'Text Diff' },
  ]

  return (
    <html lang="en">
      <body className={inter.className + ' p-4'}>
        <div className="flex min-h-screen">
          <nav className="w-48 pr-4 border-r space-y-2">
            <h1 className="text-2xl font-bold mb-4">DevTools</h1>
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded hover:bg-blue-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main className="flex-1 pl-4">{children}</main>
        </div>
      </body>
    </html>
  )
}
