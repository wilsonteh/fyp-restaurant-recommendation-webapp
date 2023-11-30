import { user } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../_firebase/auth";

export default function useProtectRoute(redirectPath: string) {
  
  const [ user ] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace(redirectPath)
    }
  }, [redirectPath, router, user])

}