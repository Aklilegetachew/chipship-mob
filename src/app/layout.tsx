import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "primereact/resources/themes/lara-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import { ToastProvider } from "@/context/ToastContext"
import { Providers } from "./providers"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ChipShip | Shipping & Delivery App",
  description:
    "ChipShip is a peer-to-peer transportation and delivery platform that connects people who need items shipped with drivers already heading that way. Save money, reduce waste, and ship smarter with ChipShip.",
  keywords: [
    "ChipShip",
    "peer-to-peer shipping",
    "delivery app",
    "transportation app",
    "send packages",
    "cheap shipping",
    "eco-friendly shipping",
    "courier app",
    "on-demand delivery",
  ],
  authors: [{ name: "ChipShip Team" }],
  openGraph: {
    title: "ChipShip | Peer-to-Peer Shipping & Delivery App",
    description:
      "Ship smarter with ChipShip — the peer-to-peer delivery app that saves you time, money, and resources.",
    url: "https://chipship.com",
    siteName: "ChipShip",
    images: [
      {
        url: "/chipship-og.png", // add your logo/OG image in public folder
        width: 1200,
        height: 630,
        alt: "ChipShip Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChipShip | Peer-to-Peer Shipping & Delivery App",
    description:
      "ChipShip connects shippers and travelers for cheaper, faster, and eco-friendly deliveries.",
    images: ["/chipship-og.png"],
    creator: "@chipship",
  },
  metadataBase: new URL("https://chipship.com"),
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
