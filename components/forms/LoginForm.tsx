"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { signInWithPassword } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Alert from "../Alert";

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
    const { errorCode, errorMsg } = await signInWithPassword(email, password);

    // *TODO: fix logic here
    // alert behaves weird  
    // 1. cant dismiss alert the 1st time 
    // 2. alert doesnt show up once dismissed 
    
    // no error - login success
    if (!errorCode) {
      router.push("/")
      setErrorText(null);
    } else {
      setErrorText(errorMsg);
    }

  };

  useEffect(() => {

    console.log(`Error text: ${errorText}`);

  }, [errorText])
  

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="w-[400px] mx-auto mt-4 rounded-lg border border-slate-200 p-4 flex flex-col gap-y-4 text-sm"
    >
      <h1 className="text-lg font-semibold text-center">Login</h1>
      
      { errorText && <Alert text={errorText} type="danger" bordered /> }

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
          type={showPassword ? "password" : "text"}
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
              {<EyeIcon show={showPassword} />}
            </button>
          }
          errorMessage={errors.password?.message}
        />

      </div>

      <Button color="primary" type="submit" className="mt-2">Submit</Button>
    </form>
  );
};

export default LoginForm;
