import { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import ThemeProvider from '@/components/theme/Theme'
import PlayListProvider from '@/components/providers/PlayListProvider'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/header/Header'

import styles from './layout.module.scss'
import Player from '@/components/player/Player'

export const metadata : Metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_TITLE} | Ali_God`,
    template: `${process.env.NEXT_PUBLIC_TITLE} | %s | Ali_God`
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1.0 maximum-scale=1.0,minimum-scale=1.0" />
        <link href="/favicon/favicon.ico" type="image/x-icon" rel="shortcut icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/favicon/favicon-32x32.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/favicon/favicon-192x192.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/favicon/favicon-16x16.webp" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <div className={styles.main}>
            <Sidebar />
            <div className={styles.content}>
              <Header />
              {children}
              <Player />
              <PlayListProvider />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
