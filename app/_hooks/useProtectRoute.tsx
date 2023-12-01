import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function useProtectRoute(user: User | null | undefined, redirectPath: string) {
  
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace(redirectPath)
    }
  }, [redirectPath, router, user])

  return user ? true : false;  

}