"use client";
import { auth } from "@/firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

export default function HomeLayout() {

  const [user, loading, error] = useAuthState(auth)

  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      <div> User id: {user?.uid} </div>
      Home page 
    </main>
  )
}
