"use client";
import AuthButton from "@/components/AuthButton";
import { signInWithGoogle } from "@/firebase/auth";

export default function LoginLayout() {

  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      Login page
      <AuthButton 
        authMethod="google"
        onPress={signInWithGoogle}
        />
    </main>
  )
}
