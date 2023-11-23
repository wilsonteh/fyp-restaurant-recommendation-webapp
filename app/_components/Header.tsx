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
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../_firebase/auth";
import { navbarItems } from "../_utils/constants";
import ProfileDropDown from "./ProfileDropDown";

export default function Header() {
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
        {navbarItems.map((item, i) => (
          <NavbarItem
            key={item.label}
            as={Link}
            href={item.href}
            className={`capitalize px-3 py-2 bg-transparent
              ${
                isNavActive(item.href)
                  ? "font-semibold border-b-2 border-primary-700"
                  : "hover:bg-slate-200 rounded-xl"
              }`}
            // isActive={isNavItemActive(navItem.href)}
          >
            {/* : "hover:text-foreground/90 hover:font-medium" */}
            {item.label}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* *SECTION -  MOBILE NAVBAR */}
      {isMenuOpen && (
        <NavbarMenu className="flex flex-col items-center gap-y-6 bg-gray-50 p-6">
          {navbarItems.map((item, i) => (
            <NavbarMenuItem key={item.label} className="">
              <Link
                href={item.href}
                className={`capitalize w-full px-4 py-2 bg-transparent
                ${
                  isNavActive(item.href)
                    ? "font-semibold border-b-2 border-primary-700"
                    : "hover:bg-slate-200 rounded-xl"
                }`}
              >
                {item.label}
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
    </Navbar>
  );
};
