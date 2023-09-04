"use client";
import { Dismiss } from "flowbite";
import type { DismissOptions, DismissInterface } from "flowbite";
import { useRef } from "react";
import CrossIcon from "./icons/CrossIcon";

interface AlertProps {
  text: string;
  type: "success" | "warning" | "danger";
  bordered?: boolean;
}

const Alert = ({ text, type, bordered }: AlertProps) => {

  const alertElement = useRef(null);
  const triggerElement = useRef(null);
  const alertOptions: DismissOptions = {
    transition: 'transition-opacity',
    duration: 300,
    timing: 'ease-out',
  }
  const dismiss: DismissInterface = new Dismiss(alertElement.current, triggerElement.current, alertOptions);
  const alertStyles = {
    success: "bg-success-100 text-success-700 border-success-600",
    warning: "bg-warning-100 text-warning-700 border-warning-600",
    danger: "bg-danger-100 text-danger-700 border-danger-200",
  };
  const dismissHover = {
    success: "hover:bg-success-300",
    warning: "hover:bg-warning-200",
    danger: "hover:bg-danger-200",
  }
  const dismissFill = {
    success: "#5F9F15",
    warning: "#B79B08",
    danger: "#B71D46",
  }
  

  return (
    <div 
      id="alert-border-1" ref={alertElement} role="alert"
      className={`flex items-center p-4 mb-4 rounded-md ${alertStyles[type]} ${bordered ? "border" : ""}}`}
    >
      <div className="ml-3 text-sm font-medium">
        { text }
      </div>
      <button
        type="button"
        className={`inline-flex items-center justify-center h-8 w-8 ml-auto mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 ${dismissHover[type]} `}
        data-dismiss-target="#alert-border-1"
        aria-label="Close"
        ref={triggerElement}
      >
        <span className="sr-only">Dismiss</span>
        <CrossIcon className="w-3 h-3" fill={dismissFill[type]} />  
      </button>
    </div>
  );
};

export default Alert;
