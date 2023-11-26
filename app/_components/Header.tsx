"use client";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Switch,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../_firebase/auth";
import { navbarItems } from "../_utils/constants";
import ProfileDropDown from "./ProfileDropDown";
import { LightMode, Moon } from "../_icons/Index";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const isNavActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Navbar
      maxWidth="xl"
      shouldHideOnScroll
      isBordered
      isBlurred={false}
      disableAnimation={false}
      isMenuDefaultOpen={true}
      onMenuOpenChange={setIsMenuOpen}
      className=""
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />

      <NavbarBrand className="">
        <h1 className="font-bold text-xl">
          <Link href="/">MakanNow</Link>
        </h1>
      </NavbarBrand>

      {/* *SECTION nav links  */}
      <NavbarContent className="hidden md:flex" justify="center">
        {navbarItems.map(({ label, href }) => (
          <NavbarItem
            key={label}
            as={Link}
            href={href}
            className={twMerge(
              "capitalize px-3 py-2 bg-transparent", 
              isNavActive(href) && theme === "light" ? 'font-semibold border-b-2 border-primary-700' : '', 
              isNavActive(href) && theme === "dark" ? 'font-semibold border-b-2 border-primary-500' : '', 
              !isNavActive(href) && theme === "light" ? 'hover:bg-slate-200 rounded-xl' : '', 
              !isNavActive(href) && theme === "dark" ? 'hover:bg-slate-800 rounded-xl' : '', 
            )}
          >
            {label}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* *SECTION -  MOBILE NAVBAR */}
      {isMenuOpen && (
        <NavbarMenu className="flex flex-col items-center gap-y-6 p-6">
          {navbarItems.map(({ label, href }) => (
            <NavbarMenuItem key={label} className="">
              <Link
                href={href}
                className={twMerge(
                  "capitalize w-full px-4 py-2 bg-transparent", 
                  isNavActive(href) && theme === "light" ? 'font-semibold border-b-2 border-primary-700' : '', 
                  isNavActive(href) && theme === "dark" ? 'font-semibold border-b-2 border-primary-500' : '', 
                  !isNavActive(href) && theme === "light" ? 'hover:bg-slate-200 rounded-xl' : '', 
                  !isNavActive(href) && theme === "dark" ? 'hover:bg-slate-800 rounded-xl' : '', 
                )}  
              >
                {label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}

      {/* *SECTION - RIGHT SECTION */}
      <NavbarContent justify="end" className="">
        {!user ? (
          <>
            <NavbarItem className="">
              <Button
                as={Link}
                href="/login"
                color="primary"
                variant="solid"
              >
                Login
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button
                as={Link}
                href="/signup"
                color="primary"
                variant="bordered"
                className="text-primary-700 border-primary-700"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <ProfileDropDown user={user} />
        )}
      </NavbarContent>
      
      <ThemeSwitcher />
      
    </Navbar>
  );
};

const ThemeSwitcher = () => {

  const { theme, setTheme } = useTheme();
  
  return (
    <Switch
      defaultSelected
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Moon size={15} className={className} />
        ) : (
          <LightMode size={15} className={className} />
        )
      }
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      />
  )
}