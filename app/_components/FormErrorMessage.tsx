"use client";
import { AuthError } from "firebase/auth";
import { getAuthErrorMessage } from "../_firebase/authErrorMapper";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Times } from "../_icons/Index";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function FormErrorMessage({ error } : { error: AuthError }) {

  const { theme } = useTheme();
  const [show, setShow] = useState(true);
  const [transition, setTransition] = useState(false);

  return (
    <>
      {show && (
        <div 
          className={twMerge(
            "flex justify-between items-center px-4 py-2 rounded-xl text-danger-600 transition-opacity ease-in-out duration-500",
            theme === "dark" ? "bg-danger-100/80" : "bg-danger-100",
            transition ? 'opacity-0' : 'opacity-100',
          )}
        >
          <div className="">
            <p> {getAuthErrorMessage(error.code)} </p>
            <p> {error.code} </p>
          </div>

          <Button
            color="danger"
            variant="light"
            size="sm"
            isIconOnly
            onClick={() => {
              setTransition(true);
              setTimeout(() => {
                setShow(!show)
              }, 500);
            }}
          >
            <Times size={13} className="text-danger-600" />
          </Button>
        </div>
      )}
    </>
  );
};