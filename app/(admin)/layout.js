import { Inter } from 'next/font/google'
import StoreProvider from '../redux/provider'
import LayoutContent from './ui/LayoutContent'
import styles from './adminLayout.module.css'
import { ContextProvider } from './context/ContextProvider'
import { Toaster } from '@/components/ui/toaster'




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
     <StoreProvider>
      <html lang="en" >
        <body className={`${inter.className} ` }>
        <ContextProvider>
            <div className='flex'> 
                <LayoutContent>
                    {children}  
                </LayoutContent>
                <Toaster />
              </div>
          </ContextProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
