/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RefreshToken from './refresh-token'

import { useContext, useEffect, useState, createContext } from 'react'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    }
})

const AppContext = createContext({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => {}
  })
  export const useAppContext = () => {
    return useContext(AppContext)
  }
export default function AppProvider({children}: {children: React.ReactNode}) {
    const [isAuth, setIsAuthState] = useState(false)
    useEffect(() => {
        const accessToken = getAccessTokenFromLocalStorage()
        if(accessToken) setIsAuthState(true)
    }, [])


    return (
        <AppContext.Provider value={{ isAuth, setIsAuth: setIsAuthState }} >
            <QueryClientProvider client={queryClient}>
            {children}
            <RefreshToken />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </AppContext.Provider>  

    )
}