
import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";

export async function POST() {
 
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json(
      {
        message: 'Không tìm thấy refreshToken'
      },
      {
        status: 401
      }
    )
  }
  try {
    const { payload } = await authApiRequest.sRefreshToken({refreshToken});

   

    const decodedAccessToken = jwt.decode(payload.data.accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as { exp: number };
    cookieStore.set("accessToken", payload.data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });

    return Response.json(payload);
  } catch (error) {
    console.error("Error occurred:", error);
    
    const errorMessage =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).message || "Không có thông tin chi tiết";

    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Có lỗi xảy ra",
          details: errorMessage,
        },
        {
          status: 500,
        }
      );
    }
  }
}
