"use client";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function Message({
  text, type,
}: { 
  text: string | React.ReactNode, type: 'success' | 'warning' | 'danger' 
}) {
  const { theme } = useTheme();

  const color = {
    success: {
      light: {
        bg: 'bg-success-100',
        text: 'text-success-700',
      }, 
      dark: {
        bg: 'bg-success-100/20',
        text: 'text-success-300',
      },
    },
    warning: {
      light: {
        bg: 'bg-warning-100',
        text: 'text-warning-700',
      }, 
      dark: {
        bg: 'bg-warning-100/20',
        text: 'text-warning-300',
      },
    },
    danger: {
      light: {
        bg: 'bg-danger-100',
        text: 'text-danger-700',
      }, 
      dark: {
        bg: 'bg-danger-100/20',
        text: 'text-danger-300',
      },
    },
  }

  return (
    <div className={twMerge(
      'px-4 py-3 rounded-lg text-sm text-center', 
      theme === 'dark' 
      ? color[type].dark.bg + ' ' + color[type].dark.text
      : color[type].light.bg + ' ' + color[type].light.text,
    )}>
      { text }
    </div>
  );
}
 
