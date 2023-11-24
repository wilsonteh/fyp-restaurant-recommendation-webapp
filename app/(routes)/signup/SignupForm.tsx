"use client";
import { auth, signInWithFacebook, signInWithGoogle, signUpWithPassword } from "@/app/_firebase/auth";
import { Eye, EyeSlash, Facebook, Google } from "@/app/_icons/Index";
import { SignupFormData } from "@/app/_utils/interfaces/FormData";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
  const router = useRouter();
  const [ user, loading, error ] = useAuthState(auth)

  const email = register("email", {
    required: "Email cannot be left empty",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email address is invalid",
    },
  });

  const password = register("password", {
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

  const confirmPassword = register("confirmPassword", {
    required: "Confirm password cannot be left empty",
    validate: {
      validateNumber: (confirmPassword, data) =>
        confirmPassword === data.password || "Passwords do not match",
    },  
  });

  const handleSignup: SubmitHandler<SignupFormData> = async (formData) => {
    const { email, password, confirmPassword } = formData;
    router.push('/')
    await signUpWithPassword(email, password);
  };

  useEffect(() => {
    // to redirect user to home page after authenticate with social login
    if (user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="max-w-[400px] mx-auto mt-4 rounded-lg border border-slate-300 p-4 flex flex-col gap-y-4 text-sm"
    >
      <h1 className="text-lg font-semibold text-center">Sign up</h1>

      <div className="flex flex-col gap-y-4 select-none">
        <Input
          type="email"
          label="Email"
          variant="bordered"
          radius="sm"
          size="sm"
          className="text-gray-700"
          isRequired
          onChange={email.onChange} onBlur={email.onBlur} name={email.name} ref={email.ref}
          errorMessage={errors.email?.message}
        />

        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="bordered"
          radius="sm"
          size="sm"
          className=""
          isRequired
          onChange={password.onChange} onBlur={password.onBlur} name={password.name} ref={password.ref}
          endContent={
            <button
              type="button"
              className="p-1 rounded-full hover:bg-slate-100"
              onClick={() => setShowPassword(!showPassword)}
            >
              { showPassword ? <Eye size={15} fill="black" /> : <EyeSlash size={15} fill="black" /> }
            </button>
          }
          errorMessage={errors.password?.message}
        />

        <Input
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm password"
          variant="bordered"
          radius="sm"
          size="sm"
          className=""
          isRequired
          onChange={confirmPassword.onChange} onBlur={confirmPassword.onBlur} name={confirmPassword.name} ref={confirmPassword.ref}
          endContent={
            <button
              type="button"
              className="p-1 rounded-full hover:bg-slate-100"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              { showConfirmPassword ? <Eye fill="black" /> : <EyeSlash fill="black" /> }
            </button>
          }
          errorMessage={errors.confirmPassword?.message}
        />
      </div>

      <Button color="primary" type="submit" className="mt-2">Submit</Button>
      
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center gap-x-4">
          <hr className="w-full h-1" />
          <p className="w-full text-center whitespace-nowrap">or login with:</p>
          <hr className="w-full h-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            startContent={<Google className="w-4 h-4" />}
            className="bg-light text-dark border-2 border-dark/90"
            onClick={signInWithGoogle}
            >
            Google
          </Button>

          <Button
            startContent={<Facebook fill="#EEF2F4" className="w-4 h-4" />}
            className="bg-[#4267B2] text-light"
            onClick={signInWithFacebook}
            >
            Facebook
          </Button>
        </div>

        <p className="text-center">
          <span>Already have an account?  </span>
          <Link href="/login" className="font-medium hover:underline">Login</Link>
        </p>
      </div>


    </form>
  );
};

export default SignupForm;