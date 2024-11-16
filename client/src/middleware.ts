import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from './lib/utils'
import { Role } from './constants/type'

const managePaths = ['/manage']
const guestPaths = ['/guests']
const privatePaths = [...managePaths, ...guestPaths]
const unAuthPaths = ['/login']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // pathname: /manage/dashboard
 const accessToken = request.cookies.get('accessToken')?.value
 const refreshToken = request.cookies.get('refreshToken')?.value
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
  
    const url = new URL('/login', request.url)
    url.searchParams.set('clearTokens', 'true')
    return NextResponse.redirect(url)
  }
  // Đã đăng nhập
  if(refreshToken){
    //2.1 nếu cố tình vào login thì redirect vào trang chủ
    if(unAuthPaths.some(path => pathname.startsWith(path))){
      return NextResponse.redirect(new URL('/', request.url))
    }
    //2.2 access token hết hạn
    if(privatePaths.some(path => pathname.startsWith(path)) && !accessToken){
      const url = new URL('/refresh-token', request.url)
      url.searchParams.set('refreshToken', refreshToken)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // 2.3 nếu vào không đúng role thì redirect về trang chủ
    const role = decodeToken(refreshToken).role
    
    if((role === Role.Guest) && managePaths.some((path) => pathname.startsWith(path)) || 
   (role !== Role.Guest && guestPaths.some((path) => pathname.startsWith(path)))){
       return NextResponse.redirect(new URL('/', request.url))
    }
  }
  // Đăng nhập rồi thì sẽ không cho vào login nữa
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/manage/:path*', '/guest:path*','/login']
}

// middleware là một tính năng,
// cho phép bạn thực thi một đoạn mã trên tầng server
// trước khi yêu cầu HTTP của người dùng đến được xử lý bởi route hoặc page tương ứng