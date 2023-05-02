import './globals.css'
import Providers from './GlobalComponents/provider'
import Navbar from './components/Navbar'
import CartMenu from './components/CartMenu'
import Footer from './components/Footer'

export const metadata = {
  title: 'E-Commerce App',
  description: 'Portfolio App by Shane Hubsch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar/>
          <CartMenu/>
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  )
}
