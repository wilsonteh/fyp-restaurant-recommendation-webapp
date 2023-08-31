"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { signUpWithEmailAndPassword } from "@/firebase/auth";
import { useRouter } from "next/navigation";

interface SignupFormProps {}

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
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
    await signUpWithEmailAndPassword(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="w-[400px] mx-auto mt-4 rounded-lg border border-slate-200 p-4 flex flex-col gap-y-4 text-sm"
    >
      <h1 className="text-lg font-semibold text-center">Sign up</h1>

      <div className="flex flex-col gap-y-4 select-none">
        {/* SECTION: Email field === */}
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

        <Input
          type={showConfirmPassword ? "password" : "text"}
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
              {<EyeIcon show={showConfirmPassword} />}
            </button>
          }
          errorMessage={errors.confirmPassword?.message}
        />
      </div>

      <Button color="primary" type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;
