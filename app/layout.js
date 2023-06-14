import NavbarComponent from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import './global.css'
import ProductsContextProvider from '@/components/ProductsContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Creaciones Valladolid',
  description: 'Fábrica de ropa en Valladolid',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-vh-100 vh-100 text-bg-dark`}>
        <ProductsContextProvider>
          <NavbarComponent />
          {children}
        </ProductsContextProvider>

      </body>
    </html >
  )
}
