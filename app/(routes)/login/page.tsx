"use client";
import FormErrorMessage from "@/app/_components/FormErrorMessage";
import { auth, signInWithFacebook, signInWithGoogle } from "@/app/_firebase/auth";
import { getAuthErrorMessage } from "@/app/_firebase/authErrorMapper";
import { Eye, EyeSlash, Facebook, Google } from "@/app/_icons/Index";
import { LoginFormData } from "@/app/_utils/interfaces/FormData";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useTheme } from "next-themes";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export default function LoginPage() {
  
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [ signInWithEmailAndPassword, user, signinLoading, signinError ] = useSignInWithEmailAndPassword(auth);

  const emailReg = register("email", {
    required: "Email cannot be left empty",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email address is invalid",
    },
  });

  const passwordReg = register("password", {
    required: "Password cannot be left empty",
  });

  const handleLogin: SubmitHandler<LoginFormData> = async (formData) => {
    const { email, password } = formData;
    const user = await signInWithEmailAndPassword(email, password);
    if (user) {
      toast.success("Successfully logged in", { duration: 5000 });
    }
  };

  useEffect(() => {
    // to redirect user to home page after authenticate with social login
    if (user) {
      redirect('/');
    }
  }, [user])
  
  return (
    <main className="max-w-screen-xl mx-auto">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className={twMerge(
          "max-w-[400px] mx-auto mt-4 rounded-lg border-1 p-4 flex flex-col gap-y-4 text-sm",
          theme === "dark" ? "border-slate-700" : "border-slate-200"
        )}
      >
        <h1 className="text-lg font-semibold text-center">Login</h1>

        <div className="input-fields flex flex-col gap-y-4 select-none">
          <Input
            label="Email"
            // type="email"
            variant="bordered"
            radius="sm"
            size="sm"
            isRequired
            onChange={emailReg.onChange}
            onBlur={emailReg.onBlur}
            name={emailReg.name}
            ref={emailReg.ref}
            errorMessage={errors.email?.message}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="bordered"
            radius="sm"
            size="sm"
            className=""
            isRequired
            onChange={passwordReg.onChange}
            onBlur={passwordReg.onBlur}
            name={passwordReg.name}
            ref={passwordReg.ref}
            endContent={
              <button
                type="button"
                className={twMerge(
                  "p-2 rounded-full",
                  theme === "dark" ? "hover:bg-slate-600" : "hover:bg-slate-200"
                )}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye
                    size={15}
                    className={
                      theme === "dark" ? "text-slate-300" : "text-slate-800"
                    }
                  />
                ) : (
                  <EyeSlash
                    size={15}
                    className={
                      theme === "dark" ? "text-slate-300" : "text-slate-800"
                    }
                  />
                )}
              </button>
            }
            errorMessage={errors.password?.message}
          />
        </div>

        <Button
          color="primary"
          type="submit"
          className="mt-2"
          isLoading={signinLoading}
        >
          {signinLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="social-auth flex flex-col gap-y-4">
          <div className="flex justify-between items-center gap-x-4">
            <hr className="w-full h-1" />
            <p className="w-full text-center whitespace-nowrap">
              or login with:
            </p>
            <hr className="w-full h-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              startContent={<Google size={15} />}
              className="bg-light text-dark border-2 border-dark/90"
              onClick={signInWithGoogle}
            >
              Google
            </Button>

            <Button
              startContent={<Facebook size={15} />}
              className="bg-[#4267B2] text-light"
              onClick={signInWithFacebook}
            >
              Facebook
            </Button>
          </div>

          <p className="text-center">
            <span>Don&apos;t have an account? </span>
            <Link href="/signup" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {signinError && <FormErrorMessage error={signinError} />}
      </form>
    </main>
  );
}
