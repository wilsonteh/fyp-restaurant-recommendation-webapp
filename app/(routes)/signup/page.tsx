"use client";
import FormErrorMessage from "@/app/_components/FormErrorMessage";
import { auth, signInWithFacebook, signInWithGoogle } from "@/app/_firebase/auth";
import { Eye, EyeSlash, Facebook, Google } from "@/app/_icons/Index";
import { SignupFormData } from "@/app/_utils/interfaces/FormData";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useTheme } from "next-themes";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export default function SignupPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
  const [
    createUserWithEmailAndPassword, 
    newUser, 
    signUpLoading, 
    signUpError
  ] = useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: true
  });
  const [ signInWithGoogle ] = useSignInWithGoogle(auth);
  const [loggedinUser] = useAuthState(auth);

  const emailReg = register("email", {
    required: "Email cannot be left empty",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email address is invalid",
    },
  });

  const passwordReg = register("password", {
    required: "Password cannot be left empty",
    validate: {
      length: (password) =>
        password.length >= 8 || "Password should be at least 8 characters long",
      uppercase: (password) =>
        /[A-Z]/.test(password) ||
        "Password should contain at least 1 uppercase letter",
      number: (password) =>
        /\d/.test(password) || "Password should contain at least 1 number",
      symbol: (password) =>
        /\W/.test(password) || "Password should contain at least 1 symbol",
    },
  });

  const confirmPasswordReg = register("confirmPassword", {
    required: "Confirm password cannot be left empty",
    validate: {
      validateNumber: (confirmPassword, data) =>
        confirmPassword === data.password || "Passwords do not match",
    },
  });

  const handleSignup: SubmitHandler<SignupFormData> = async (formData) => {
    const { email, password, confirmPassword } = formData;
    const user = await createUserWithEmailAndPassword(email, password);
    if (user) {
      toast.success("Please verify your email to get started", { duration: 5000 });
    }
  };

  useEffect(() => {
    // to redirect user to home page after authenticate with social login
    if (loggedinUser) {
      redirect("/");
    }
  }, [loggedinUser]);

  return (
    <main className="max-w-screen-xl mx-auto">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className={twMerge(
          "max-w-[400px] mx-auto mt-4 rounded-lg border border-slate-300 p-4 flex flex-col gap-y-4 text-sm",
          theme === "dark" ? "border-slate-700" : "border-slate-200"
        )}
      >
        <h1 className="text-lg font-semibold text-center">Sign up</h1>

        <div className="input-fields flex flex-col gap-y-4 select-none">
          <Input
            label="Email"
            // type="email"
            variant="bordered"
            radius="sm"
            size="sm"
            className=""
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

          <Input
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            variant="bordered"
            radius="sm"
            size="sm"
            className=""
            classNames={{
              innerWrapper: "",
            }}
            isRequired
            onChange={confirmPasswordReg.onChange}
            onBlur={confirmPasswordReg.onBlur}
            name={confirmPasswordReg.name}
            ref={confirmPasswordReg.ref}
            endContent={
              <button
                type="button"
                className={twMerge(
                  "p-2 rounded-full",
                  theme === "dark" ? "hover:bg-slate-600" : "hover:bg-slate-200"
                )}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
            errorMessage={errors.confirmPassword?.message}
          />
        </div>

        <Button
          color="primary"
          type="submit"
          className="mt-2"
          isLoading={signUpLoading}
        >
          {signUpLoading ? "Signing up..." : "Sign up"}
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
              startContent={<Google size={17} />}
              className="bg-light text-dark border-2 border-dark/90"
              onClick={() => signInWithGoogle()}
            >
              Google
            </Button>

            {/* <Button
              startContent={<Facebook size={17} className="text-slate-100" />}
              className="bg-[#4267B2] text-light"
              onClick={() => signInWithFacebook()}
            >
              Facebook
            </Button> */}
          </div>

          <p className="text-center">
            <span>Already have an account? </span>
            <Link href="/login" className="font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>

        {signUpError && <FormErrorMessage error={signUpError} />}
      </form>
    </main>
  );
}
