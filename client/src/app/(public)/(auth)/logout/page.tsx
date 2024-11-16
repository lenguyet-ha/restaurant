
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppContext } from "@/components/app-provider";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import {  Suspense, useEffect, useRef } from "react";

function Logout(){
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const {setRole} = useAppContext() 
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  const ref = useRef<any>(null);
  useEffect(() => {
    if (
      !ref.current &&
      (refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl === getAccessTokenFromLocalStorage())
    ) {
      ref.current = mutateAsync;
      mutateAsync().then(() => {
        setTimeout(() => {
          ref.current = null;
        }, 1000);
        setRole(undefined)
        router.push("/login");
      });
    }
   else {
    router.push('/')
   }
  }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl, setRole]);
  return <div>Log out....</div>;
}
export default function LogoutPage() {
 <Suspense fallback={<div>Loading...</div>}>    
    <Logout />  
    </Suspense>
}
