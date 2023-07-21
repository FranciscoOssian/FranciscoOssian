import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Francisco Ossian',
  description: 'description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blog">blog</a></li>
            <li><a href="/projects">projects</a></li>
            <li><a href="/contact">contact</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
