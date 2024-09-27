// import authApiRequest from "@/apiRequests/auth";
// import { LoginBodyType } from "@/schemaValidations/auth.schema";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { HttpError } from "@/lib/http";
// export async function POST(request: Request) {
//   const body = (await request.json()) as LoginBodyType;
//   const cookieStore = cookies();
//   try {
//     const { payload } = await authApiRequest.sLogin(body);
//     const { accessToken, refreshToken } = payload.data;
//     const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
//     const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };
//     cookieStore.set("accessToken", accessToken, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "lax",
//       secure: true,
//       expires: decodedAccessToken.exp * 1000,
//     });
//     cookieStore.set("refreshToken", refreshToken, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "lax",
//       secure: true,
//       expires: decodedRefreshToken.exp * 1000,
//     });
//     return Response.json(payload)
//   } catch (error){
//     if(error instanceof HttpError){
//         return Response.json(error.payload,{
//             status: error.status
//         })
//     } else{
//         return Response.json({
//             message: 'Có lỗi xảy ra',
//         }, {
//             status: 500
//         })
//     }
//   }
// }
import authApiRequest from '@/apiRequests/auth'
import { LoginBodyType } from '@/schemaValidations/auth.schema'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { HttpError } from '@/lib/http'
export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  const cookieStore = cookies()
  try {
    const { payload } = await authApiRequest.sLogin(body)
    const { accessToken, refreshToken } = payload.data
    console.log("Access Token:", accessToken);
console.log("Refresh Token:", refreshToken);

    const decodedAccessToken = jwt.decode(accessToken) as { exp: number }
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number }
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000
    })
    return Response.json(payload)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMessage = (error as any).message || "Không có thông tin chi tiết"; 


    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra',
          details: errorMessage,
        },
        {
          status: 500
        }
      )
    }
  }
}
