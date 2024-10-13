import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "@/schemaValidations/auth.schema";
const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body), // gọi API từ backend
  login: (body: LoginBodyType) => // gọi route handler ở server Nextjs
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    }),
  sLogout: (
    body: LogoutBodyType & {
      accessToken: string;
    }
  ) =>
    http.post(
      "/auth/logout",
      { refreshToken: body.refreshToken},
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),
  logout: () =>
    http.post("/api/auth/logout", null, { baseUrl: "" }), //client gọi dến route handler,
  // không cần truyền AT và RT vào body vì AT và RT tự động gửi thông qua cookie rồi

  refreshToken: () => http.post<RefreshTokenResType>("/api/auth/refresh-token", null, {baseUrl: ""}),
  sRefreshToken: (body: RefreshTokenBodyType) => http.post<RefreshTokenResType>("/auth/refresh-token", body)
};
export default authApiRequest;
