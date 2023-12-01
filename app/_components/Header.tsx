"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { twMerge } from "tailwind-merge";
import { auth } from "../_firebase/auth";
import { LightMode, Moon } from "../_icons/Index";
import { navbarItems } from "../_utils/constants";
import ProfileDropDown from "./ProfileDropDown";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // this state is solely being used to control the opacity transition when the mobile navbar is beign closed
  // basically has the same meaning as isMenuOpen, but i just nid another state for implementing the transition 
  const [isMenuOpenTransition, setIsMenuOpenTransition] = useState(false);
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
      onMenuOpenChange={(isOpen) => {
        setIsMenuOpen(isOpen);
        setIsMenuOpenTransition(isOpen);
      }}
      isMenuOpen={isMenuOpen}
      className=""
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />

      <NavbarBrand>
        <h1 className="font-bold text-xl md:text-base lg:text-2xl">
          <Link href="/" className="">
            MakanNow
          </Link>
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
              "capitalize px-3 py-2 bg-transparent text-sm lg:text-base",
              isNavActive(href) && theme === "light"
                ? "font-semibold border-b-2 border-primary-700"
                : "",
              isNavActive(href) && theme === "dark"
                ? "font-semibold border-b-2 border-primary-500"
                : "",
              !isNavActive(href) && theme === "light"
                ? "hover:bg-slate-200 rounded-xl"
                : "",
              !isNavActive(href) && theme === "dark"
                ? "hover:bg-slate-800 rounded-xl"
                : ""
            )}
          >
            {label}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* *SECTION -  MOBILE NAVBAR */}
      {isMenuOpen && (
        <NavbarMenu
          className={twMerge(
            "flex flex-col items-center gap-6 p-6 transition-opacity duration-500",
            isMenuOpenTransition ? "opacity-100" : "opacity-0"
          )}
        >
          {navbarItems.map(({ label, href }) => (
            <NavbarMenuItem
              key={label}
              className=""
              onClick={() => {
                setIsMenuOpenTransition(false);
                setTimeout(() => setIsMenuOpen(false), 500);
              }}
            >
              <Link
                href={href}
                className={twMerge(
                  "capitalize w-full px-4 py-2 bg-transparent",
                  isNavActive(href) && theme === "light"
                    ? "font-semibold border-b-2 border-primary-700"
                    : "",
                  isNavActive(href) && theme === "dark"
                    ? "font-semibold border-b-2 border-primary-500"
                    : "",
                  !isNavActive(href) && theme === "light"
                    ? "hover:bg-slate-200 rounded-xl"
                    : "",
                  !isNavActive(href) && theme === "dark"
                    ? "hover:bg-slate-800 rounded-xl"
                    : ""
                )}
              >
                {label}
              </Link>
            </NavbarMenuItem>
          ))}

          {!user && (
            <hr
              className={twMerge(
                "h-[2px] w-4/5",
                theme === "dark" ? "border-slate-700" : "border-slate-300"
              )}
            />
          )}

          {/* Login & Signup shows here when user not authenticated */}
          {!user && (
            <NavbarMenuItem className="flex flex-col items-center gap-6">
              <NavbarItem className="">
                <Button
                  as={Link}
                  href="/login"
                  color="primary"
                  className="px-10"
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
                  className="text-primary-700 border-primary-700 px-10"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      )}

      {/* *SECTION - RIGHT SECTION */}
      <NavbarContent justify="end" className="">
        <ThemeSwitcher />
        {!user && (
          <div className="hidden md:flex items-center gap-4">
            <NavbarItem className="">
              <Button as={Link} href="/login" color="primary" variant="solid">
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
          </div>
        )}
        {user && <ProfileDropDown user={user} />}
      </NavbarContent>
    </Navbar>
  );
};

const ThemeSwitcher = () => {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <>
      <Switch
        // defaultSelected
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <Moon size={15} className={className} />
          ) : (
            <LightMode size={15} className={className} />
          )
        }
        isSelected={theme === "dark"}
        onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
        />
    </>
  )
}