"use client";
import { auth, signInWithFacebook, signInWithGoogle, signInWithPassword } from "@/app/_firebase/auth";
import Eye from "@/app/_icons/eye";
import EyeSlash from "@/app/_icons/eye-slash";
import Facebook from "@/app/_icons/facebook";
import Google from "@/app/_icons/google";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string|null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const router = useRouter();
  const [ user, loading, error ] = useAuthState(auth);

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

  const handleLogin: SubmitHandler<LoginFormData> = async (formData) => {
    const { email, password } = formData;
    const signIn = signInWithPassword(email, password);
    const { errorCode, errorMsg } = await signIn;

    // *TODO: fix logic here
    // alert behaves weird  
    // 1. cant dismiss alert the 1st time 
    // 2. alert doesnt show up once dismissed 
    // signinToast(signIn, 'success', errorMsg)
    
    // no error - login success
    if (!errorCode) {
      router.push("/")
      setErrorText(null);
    } else {
      setErrorText(errorMsg);
    }
  };

  useEffect(() => {
    // to redirect user to home page after authenticate with social login
    if (user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="max-w-[400px] mx-auto mt-4 rounded-lg border border-slate-200 p-4 flex flex-col gap-y-4 text-sm"
    >
      <h1 className="text-lg font-semibold text-center">Login</h1>
      
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
              { showPassword ? <Eye fill="black" /> : <EyeSlash fill="black" /> }
            </button>
          }
          errorMessage={errors.password?.message}
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
          <span>Don&apos;t have an account?  </span>
          <Link href="/signup" className="font-medium hover:underline">Sign up</Link>
        </p>
      </div>

    </form>
  );
};

export default LoginForm;
