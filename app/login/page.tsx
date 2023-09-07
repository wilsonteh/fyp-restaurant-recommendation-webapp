"use client";
import AuthButton from "@/components/AuthButton";
import LoginForm from "@/components/forms/LoginForm";
import { signInWithGoogle } from "@/firebase/auth";

export default function LoginLayout() {
  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      <LoginForm />
    </main>
  );
}
