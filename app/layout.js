import NavbarComponent from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Creaciones Valladolid',
  description: 'Fábrica de ropa en Valladolid',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-vh-100`}>
        <NavbarComponent />
          {children}
      </body>
    </html>
  )
}
