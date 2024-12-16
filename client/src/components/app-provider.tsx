/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RefreshToken from '@/components/refresh-token'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  decodeToken,
  generateSocketInstance,
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage
} from '@/lib/utils'
import { RoleType } from '@/types/jwt.types'
import { Socket } from 'socket.io-client'
import socket from '@/lib/socket'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
     
    }
  }
})
const AppContext = createContext({
  isAuth: false,
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => {},
  socket: undefined as Socket | undefined,
  setSocket: (socket?: Socket | undefined) => {},
  disconnectSocket: () => {}
})
export const useAppContext = () => {
  return useContext(AppContext)
}
export default function AppProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [socket, setSocket] = useState<Socket | undefined>()
  const [role, setRoleState] = useState<RoleType | undefined>()
  const count = useRef(0)
  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken) {
      const role = decodeToken(accessToken).role
      setRoleState(role)
      setSocket(generateSocketInstance(accessToken))
    }
    count.current++
  }, [])



  
  const setRole = useCallback((role?: RoleType | undefined) => {
    setRoleState(role)
    if (!role) {
      removeTokensFromLocalStorage()
    }
  }, [])
  const isAuth = Boolean(role)
 const disconnectSocket = useCallback(() => {
  socket?.disconnect()
  setSocket(undefined)
 }, [socket, setSocket])
  return (
    <AppContext.Provider value={{ role, setRole, isAuth, socket, setSocket, disconnectSocket }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <RefreshToken />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext.Provider>
  )
}