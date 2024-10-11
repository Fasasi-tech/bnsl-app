import {Inter} from 'next/font/google'
import StoreProvider from '../redux/provider'
import { ContextProvider } from '../(admin)/context/ContextProvider'
import { Toaster } from '@/components/ui/toaster'
import ProductLayoutContent from './ui/ProductLayoutContent'

const inter= Inter({subsets:['latin']})

export const metadata ={
   
}

export default function RootLayout({children}){
    return (
        <StoreProvider>
            <html lang="en">
                <body className={`${inter.className} `}>
                    <ContextProvider>
                        <div className='flex'>
                            <ProductLayoutContent>
                                {children}
                            </ProductLayoutContent>
                            <Toaster />
                        </div>
                    </ContextProvider>
                </body>

            </html>
        </StoreProvider>
    )
}