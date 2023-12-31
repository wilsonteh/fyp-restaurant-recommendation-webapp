import '@/styles/globals.css';
import '@smastrom/react-rating/style.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import { Providers } from './providers';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'MakanNow',
  description: 'Generated by create next app',
  icons: {
    icon: '/images/M.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className='font-poppins'>
        <Providers>
          <Header />
            <Toaster position='bottom-right' />
            <div className="min-h-screen"> { children } </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
