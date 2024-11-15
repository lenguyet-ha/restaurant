import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";
import { GuestLoginBodyType } from "@/schemaValidations/guest.schema";
import guestApiRequest from "@/apiRequests/guest";
export async function POST(request: Request) {
  const body = (await request.json()) as GuestLoginBodyType;
  const cookieStore = cookies();
  try {
    const { payload } = await guestApiRequest.sLogin(body);

    const { accessToken, refreshToken } = payload.data;
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };
    cookieStore.set("accessToken", accessToken, {
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
